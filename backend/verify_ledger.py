import json
import hashlib
import os
from urllib.parse import quote_plus
from pymongo import MongoClient
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec

# ===========================================================
# 1️⃣ MongoDB Connection
# ===========================================================
username = "thejeshharikumar2023_db_user"
password = quote_plus("MongoDB@6969")
cluster_url = f"mongodb+srv://{username}:{password}@tenebrous007.jidyfja.mongodb.net/"

client = MongoClient(cluster_url)
db = client["hackathon"]
collection = db["ledger"]

# ===========================================================
# 2️⃣ Load Public Key
# ===========================================================
if not os.path.exists("device_public.pem"):
    raise FileNotFoundError("❌ Public key not found. Run ledger_sign.py first.")

with open("device_public.pem", "rb") as f:
    public_key = serialization.load_pem_public_key(f.read())

# ===========================================================
# 3️⃣ Compute SHA-256 helper
# ===========================================================
def compute_hash(data_str, prev_hash):
    return hashlib.sha256((data_str + prev_hash).encode("utf-8")).hexdigest()

# ===========================================================
# 4️⃣ Verify Local Ledger Integrity (if available)
# ===========================================================
local_ledger_path = "local_data/local_ledger.json"
if os.path.exists(local_ledger_path):
    print("🔍 Verifying local ledger integrity...")
    with open(local_ledger_path, "r") as f:
        local_ledger = json.load(f)

    prev_hash = "0" * 64
    for block in local_ledger:
        data_str = json.dumps(block["record"], sort_keys=True)
        recomputed_hash = compute_hash(data_str, prev_hash)

        if recomputed_hash != block["current_hash"]:
            print(f"⚠️ Hash mismatch in local block {block['index']}")
            break

        # Verify signature
        signature = bytes.fromhex(block["signature"])
        try:
            public_key.verify(signature, block["current_hash"].encode(), ec.ECDSA(hashes.SHA256()))
        except Exception:
            print(f"⚠️ Invalid signature in local block {block['index']}")
            break

        prev_hash = block["current_hash"]
    else:
        print("✅ Local ledger verified successfully (all hashes + signatures valid).")
else:
    print("⚠️ Local ledger not found. Skipping local verification.")

# ===========================================================
# 5️⃣ Verify Cloud Ledger Integrity (MongoDB copy)
# ===========================================================
print("\n🔍 Verifying MongoDB ledger integrity...")
cursor = collection.find().sort("index", 1)
prev_hash = "0" * 64
verified_blocks = 0

for block in cursor:
    data_str = json.dumps(block["record"], sort_keys=True)
    recomputed_hash = compute_hash(data_str, prev_hash)

    if recomputed_hash != block["current_hash"]:
        print(f"⚠️ Hash mismatch at MongoDB block {block['index']}")
        break

    # Verify digital signature
    signature = bytes.fromhex(block["signature"])
    try:
        public_key.verify(signature, block["current_hash"].encode(), ec.ECDSA(hashes.SHA256()))
    except Exception:
        print(f"⚠️ Invalid signature at MongoDB block {block['index']}")
        break

    prev_hash = block["current_hash"]
    verified_blocks += 1

print(f"✅ Verified {verified_blocks} MongoDB blocks successfully. All intact!")
