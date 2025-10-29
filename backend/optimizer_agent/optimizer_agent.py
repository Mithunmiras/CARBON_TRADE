# optimizer_agent_v2.py
import urllib.parse
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timezone
import json
import hashlib

# --- Re-using your existing config and crypto utils ---
import config
import ecc_utils

class OptimizationAgentV2:
    def __init__(self):
        """Initializes the agent and connects to the database."""
        self.client = MongoClient(config.MONGO_URI)
        self.db = self.client[config.DB_NAME]
        self.readings_collection = self.db[config.READINGS_COLLECTION]
        self.ledger_collection = self.db[config.LEDGER_COLLECTION]
        print(f"✅ Optimizer Agent V2 connected to DB: {config.DB_NAME}")

    def get_all_industry_balances(self) -> list:
        """
        Calculates the net carbon balance for every industry using the new data format.
        """
        print("🔍 Calculating balances for all industries...")
        emissions_pipeline = [
            {
                "$group": {
                    "_id": "$entity_id",
                    "total_emissions_kg": {"$sum": "$total_emission_kg"},
                    "budget_tonnes": {"$first": "$carbon_credit_budget_tonnes"}
                }
            }
        ]
        all_emissions_and_budgets = {item['_id']: item for item in self.readings_collection.aggregate(emissions_pipeline)}

        credits_pipeline = [
            {"$match": {"record.type": "credit_purchase"}},
            {"$group": {"_id": "$record.entity_id", "total_credits_kg": {"$sum": "$record.amount_kg"}}}
        ]
        all_credits_purchased = {item['_id']: item['total_credits_kg'] for item in self.ledger_collection.aggregate(credits_pipeline)}

        balances = []
        all_industry_ids = set(all_emissions_and_budgets.keys()) | set(all_credits_purchased.keys())
        
        for industry_id in all_industry_ids:
            industry_data = all_emissions_and_budgets.get(industry_id, {})
            emissions = industry_data.get('total_emissions_kg', 0.0)
            budget_tonnes = industry_data.get('budget_tonnes', 0.0)
            budget_kg = float(budget_tonnes) * 1000.0 if budget_tonnes else 0.0
            credits_purchased = all_credits_purchased.get(industry_id, 0.0)
            balance = (budget_kg + credits_purchased) - emissions
            balances.append({"industry_id": industry_id, "balance": balance})
            
        print(f"Found {len(balances)} industries.")
        return balances

    def find_optimal_solution(self, amount_needed: float, surpluses: list) -> list:
        """Finds the optimal combination of transfers using a greedy approach."""
        surpluses.sort(key=lambda x: x['balance'], reverse=True)
        
        allocations = []
        remaining_needed = amount_needed
        
        for supplier in surpluses:
            if remaining_needed <= 0:
                break
            amount_to_take = min(supplier['balance'], remaining_needed)
            allocations.append({
                "from_entity_id": supplier['industry_id'],
                "amount_kg": round(amount_to_take, 2)
            })
            remaining_needed -= amount_to_take
            
        if remaining_needed > 0:
            print(f"⚠️ Warning: Could not fully cover the deficit. {remaining_needed:,.2f} kg still needed.")
            
        return allocations

    def execute_settlement(self, deficit_industry_id: str, deficit_amount: float, allocations: list):
        """
        Creates and records a more descriptive settlement transaction on the ledger.
        """
        print("✍️  Executing and recording settlement transaction...")
        # *** MODIFIED PART: Create a more descriptive transaction record ***
        transaction_record = {
            'type': 'automated_settlement',
            'details': {
                'deficit_entity': {
                    'entity_id': deficit_industry_id,
                    'amount_kg': round(deficit_amount, 2)
                },
                'source_contributions': allocations
            }
        }
        
        signature = ecc_utils.sign_data(config.AGENT_PRIVATE_KEY_PEM, transaction_record)
        latest_entry = self.ledger_collection.find_one(sort=[("index", DESCENDING)])
        prev_hash = latest_entry['current_hash'] if latest_entry else '0' * 64
        new_index = latest_entry['index'] + 1 if latest_entry else 0
        
        hash_data = {
            'index': new_index,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'record': transaction_record,
            'prev_hash': prev_hash
        }
        
        canonical_string = json.dumps(hash_data, sort_keys=True, separators=(',', ':')).encode('utf-8')
        current_hash = hashlib.sha256(canonical_string).hexdigest()
        
        new_ledger_entry = {**hash_data, 'current_hash': current_hash, 'signature': signature}
        self.ledger_collection.insert_one(new_ledger_entry)
        print(f"✅ Settlement transaction (Index: {new_index}) successfully recorded.")

    def run_optimization_cycle(self):
        """Runs a full cycle to find and settle all deficits."""
        all_balances = self.get_all_industry_balances()
        
        surpluses = [b for b in all_balances if b['balance'] > 0]
        deficits = [b for b in all_balances if b['balance'] < 0]
        
        if not deficits:
            print("\n🎉 No industries are in deficit. No action needed.")
            return

        print(f"\nFound {len(deficits)} industries in deficit.")
        for industry in deficits:
            industry_id = industry['industry_id']
            amount_needed = abs(industry['balance'])
            
            print(f"\nProcessing deficit for '{industry_id}': {amount_needed:,.2f} kg")
            allocations = self.find_optimal_solution(amount_needed, surpluses)
            
            if allocations:
                # *** MODIFIED PART: More descriptive printout ***
                print(f"💡 Optimal solution found to cover deficit for '{industry_id}':")
                for alloc in allocations:
                    print(f"   - Transfer {alloc['amount_kg']:,.2f} kg from industry '{alloc['from_entity_id']}'")
                
                self.execute_settlement(industry_id, amount_needed, allocations)
                # In a real system, you would update the balances of the suppliers here
            else:
                print(f"❌ Could not find any surplus credits to resolve deficit for '{industry_id}'.")

    def close(self):
        self.client.close()
        print("\n🔌 MongoDB connection closed.")

# --- Main execution block ---
if __name__ == "__main__":
    agent = OptimizationAgentV2()
    agent.run_optimization_cycle()
    agent.close()
