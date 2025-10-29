import json
import os
import hashlib
import datetime
import uuid
from urllib.parse import quote_plus
from pymongo import MongoClient, errors
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec

# ============================================================
# 1️⃣ MongoDB Setup
# ============================================================
username = "thejeshharikumar2023_db_user"
password = quote_plus("MongoDB@6969")
cluster_url = f"mongodb+srv://{username}:{password}@tenebrous007.jidyfja.mongodb.net/"

def connect_to_mongo():
    try:
        client = MongoClient(cluster_url, serverSelectionTimeoutMS=8000)
        client.server_info()
        print("✅ MongoDB connection established successfully.")
        return client["hackathon"]["ledger"]
    except errors.ServerSelectionTimeoutError:
        print("⚠️ MongoDB cluster unreachable — switching to LOCAL MODE only.")
        return None
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return None

collection = connect_to_mongo()

# ============================================================
# 2️⃣ Load Local IoT Data
# ============================================================
data_path = "local_data/readings.json"
if not os.path.exists(data_path):
    raise FileNotFoundError("❌ IoT readings not found. Run gen_readings.py first.")

with open(data_path, "r") as f:
    readings = json.load(f)
print(f"📥 Loaded {len(readings)} IoT readings for ledger creation.")

# ============================================================
# 3️⃣ ECDSA Key Generation (device identity)
# ============================================================
if not os.path.exists("device_private.pem"):
    print("🔑 Generating new ECDSA key pair...")
    private_key = ec.generate_private_key(ec.SECP256R1())
    public_key = private_key.public_key()

    with open("device_private.pem", "wb") as f:
        f.write(private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        ))

    with open("device_public.pem", "wb") as f:
        f.write(public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ))

    print("✅ Device key pair generated and saved.")
else:
    with open("device_private.pem", "rb") as f:
        private_key = serialization.load_pem_private_key(f.read(), password=None)
    print("🔑 Loaded existing device private key.")

# ============================================================
# 4️⃣ Helper — Compute Hash
# ============================================================
def compute_hash(data_str, prev_hash):
    return hashlib.sha256((data_str + prev_hash).encode("utf-8")).hexdigest()

# ============================================================
# 5️⃣ Create Ledger
# ============================================================
ledger = []
prev_hash = "0" * 64  # Genesis block
index = 0

for record in readings:
    index += 1
    block_data = {
        "record": record,
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "block_id": str(uuid.uuid4())[:8],
    }

    data_str = json.dumps(block_data, sort_keys=True)
    current_hash = compute_hash(data_str, prev_hash)

    # Digital signature (ECDSA)
    signature = private_key.sign(current_hash.encode(), ec.ECDSA(hashes.SHA256()))

    block = {
        "index": index,
        "record": record,
        "timestamp": block_data["timestamp"],
        "current_hash": current_hash,
        "prev_hash": prev_hash,
        "signature": signature.hex()
    }

    ledger.append(block)
    prev_hash = current_hash

print(f"📚 Ledger created with {len(ledger)} blocks.")

# ============================================================
# 6️⃣ Save Locally
# ============================================================
os.makedirs("local_data", exist_ok=True)
local_ledger_path = "local_data/local_ledger.json"
with open(local_ledger_path, "w") as f:
    json.dump(ledger, f, indent=2)
print(f"💾 Local ledger saved: {local_ledger_path}")

# ============================================================
# 7️⃣ Upload to MongoDB (if available)
# ============================================================
if collection is not None:
    try:
        collection.insert_many(ledger)
        print(f"✅ Ledger uploaded to MongoDB collection 'ledger' ({len(ledger)} blocks).")
    except Exception as e:
        print(f"⚠️ MongoDB upload failed: {e}")
else:
    print("📦 Working in OFFLINE MODE — ledger stored locally only.")

print("✅ Hash-chained ledger creation complete.")
