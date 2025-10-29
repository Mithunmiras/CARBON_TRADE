import pandas as pd
import random
import datetime
import uuid
import json
import os
from urllib.parse import quote_plus
from pymongo import MongoClient, errors

# ============================================================
# 1️⃣ MongoDB Configuration
# ============================================================
username = "thejeshharikumar2023_db_user"
password = quote_plus("MongoDB@6969")
cluster_url = f"mongodb+srv://{username}:{password}@tenebrous007.jidyfja.mongodb.net/"

# ============================================================
# 2️⃣ MongoDB Connection Function
# ============================================================
def connect_to_mongo():
    try:
        client = MongoClient(cluster_url, serverSelectionTimeoutMS=8000)
        client.server_info()
        print("✅ MongoDB connection established successfully.")
        return client["hackathon"]["readings"]
    except errors.ServerSelectionTimeoutError:
        print("⚠️ MongoDB cluster unreachable — switching to LOCAL MODE only.")
        return None
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return None

collection = connect_to_mongo()

# ============================================================
# 3️⃣ Local Storage Setup
# ============================================================
os.makedirs("local_data", exist_ok=True)
local_copy_path = "local_data/readings.json"

# ============================================================
# 4️⃣ Carbon Credit Budget per Segment (in tonnes CO₂/year)
# ============================================================
# Reference-based: 1 credit = 1 tonne CO₂e allowed
# Based on approximate Indian averages (CPCB 2023)
SEGMENT_BUDGET_CREDITS = {
    "small_industry": 450,     # tCO₂ per year
    "medium_industry": 2200,
    "large_industry": 7500,
    "low_income_home": 4,
    "middle_class_home": 8,
    "high_income_home": 15
}

industry_segments = ["small_industry", "medium_industry", "large_industry"]
urban_segments = ["low_income_home", "middle_class_home", "high_income_home"]

# ============================================================
# 5️⃣ Entity Registry Generator
# ============================================================
def get_entity_registry(num_industries=50, num_urban=100):
    registry = []
    locations = ["Chennai", "Mumbai", "Delhi", "Pune", "Hyderabad", "Bangalore", "Kanchipuram"]

    # --- Industry entities ---
    for _ in range(num_industries):
        segment = random.choice(industry_segments)
        registry.append({
            "entity_id": str(uuid.uuid4())[:6],
            "type": "industry",
            "segment": segment,
            "carbon_credit_budget": SEGMENT_BUDGET_CREDITS[segment],
            "location": random.choice(locations)
        })

    # --- Urban entities ---
    for _ in range(num_urban):
        segment = random.choice(urban_segments)
        registry.append({
            "entity_id": str(uuid.uuid4())[:6],
            "type": "urban",
            "segment": segment,
            "carbon_credit_budget": SEGMENT_BUDGET_CREDITS[segment],
            "location": random.choice(locations)
        })

    return registry

# ============================================================
# 6️⃣ Carbon Credit Quality Evaluation
# ============================================================
def evaluate_credit_quality(total_emission_tonnes, credit_budget):
    """
    Classify carbon credit quality based on ratio of emissions to budget.
    Lower emission = higher quality.
    """
    if credit_budget <= 0:
        return "unknown"

    usage_ratio = total_emission_tonnes / credit_budget  # how much of credit used

    if usage_ratio <= 0.5:
        return "High"   # excellent sustainability
    elif usage_ratio <= 0.8:
        return "Medium" # acceptable but could improve
    else:
        return "Low"    # poor sustainability performance

# ============================================================
# 7️⃣ Data Generation Function
# ============================================================
def generate_carbon_data(days=30):
    registry = get_entity_registry()
    data = []
    start_date = datetime.datetime.now() - datetime.timedelta(days=days)

    for day in range(days):
        date = start_date + datetime.timedelta(days=day)
        for entity in registry:
            if entity["type"] == "industry":
                electricity = round(random.uniform(4000, 25000), 2)   # kWh/day
                direct_emission = round(random.uniform(100, 900), 2)  # kg/day
                emission_from_electricity = round(electricity * 0.82, 2)
                total_emission_kg = direct_emission + emission_from_electricity
            else:
                electricity = round(random.uniform(8, 60), 2)
                emission_from_electricity = round(electricity * 0.82, 2)
                total_emission_kg = emission_from_electricity
                direct_emission = 0

            # Convert to tonnes for credit calculations
            total_emission_tonnes = round(total_emission_kg / 1000, 4)
            quality = evaluate_credit_quality(total_emission_tonnes, entity["carbon_credit_budget"] / 365)

            data.append({
                "record_id": str(uuid.uuid4())[:8],
                "entity_id": entity["entity_id"],
                "type": entity["type"],
                "segment": entity["segment"],
                "timestamp": date.strftime("%Y-%m-%d"),
                "electricity_kWh": electricity,
                "direct_emission_kg": direct_emission,
                "emission_from_electricity_kg": emission_from_electricity,
                "total_emission_kg": total_emission_kg,
                "total_emission_tonnes": total_emission_tonnes,
                "carbon_credit_budget_tonnes": round(entity["carbon_credit_budget"] / 12, 2),  # monthly credit allocation
                "carbon_credit_quality": quality,
                "location": entity["location"],
                "region": "industrial zone" if entity["type"] == "industry" else "urban zone"
            })

    return data

# ============================================================
# 8️⃣ Generate and Save Data
# ============================================================
data = generate_carbon_data(days=30)

with open(local_copy_path, "w") as f:
    json.dump(data, f, indent=2)
print(f"📁 Local copy saved: {local_copy_path}")

# ============================================================
# 9️⃣ Upload to MongoDB (if available)
# ============================================================
if collection is not None:
    try:
        collection.insert_many(data)
        print(f"✅ {len(data)} records uploaded to MongoDB collection 'readings'.")
    except Exception as e:
        print(f"⚠️ MongoDB upload failed: {e}")
else:
    print("📦 Working in OFFLINE MODE — data stored locally only.")

print("✅ Synthetic carbon data generation complete.")
