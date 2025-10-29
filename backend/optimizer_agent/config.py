# config.py
import urllib.parse  # <-- 1. IMPORT THIS MODULE

# --- MongoDB Configuration ---
# Keep your username and password as plain strings
MONGO_USER = "jimsteven46_db_user"
MONGO_PASS = "MongoDB@6969"
MONGO_HOST = "tenebrous007.jidyfja.mongodb.net"

# 2. URL-encode the user and pass before creating the URI
MONGO_URI = (
    f"mongodb+srv://"
    f"{urllib.parse.quote_plus(MONGO_USER)}:{urllib.parse.quote_plus(MONGO_PASS)}"
    f"@{MONGO_HOST}/?retryWrites=true&w=majority"
)

# Database and collection names
DB_NAME = "hackathon"
READINGS_COLLECTION = "readings"
LEDGER_COLLECTION = "agenticAI"

# --- Agent Configuration ---
AGENT_ENTITY_ID = "854acc95" 
EMISSIONS_CAP_KG = 5000.0

# --- Agent's Private Key ---
# (See explanation below)
AGENT_PRIVATE_KEY_PEM = """-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgq82Z3VE49d0UmmSL
fa15sZfUDZCDPcOw3YJrAp6uSM+hRANCAAQ3caoEjkYKVi56uRXw1pCpaHv6hhG4
SQEk7hisZdBh4EcNpHU2acH8Kdr5K7gSmR8IKZN+m+1NoCPxplCs6gXZ
-----END PRIVATE KEY-----"""
