# ecc_utils.py
import json
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization

def generate_ecc_keys():
    """Generates a new ECC private/public key pair and prints them."""
    private_key = ec.generate_private_key(ec.SECP256R1())
    public_key = private_key.public_key()
    
    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ).decode('utf-8')
    
    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode('utf-8')
    
    return private_pem, public_pem

def sign_data(private_key_pem: str, data: dict) -> str:
    """Signs a dictionary (the 'record' field) and returns a hex signature."""
    private_key = serialization.load_pem_private_key(private_key_pem.encode('utf-8'), password=None)
    canonical_data = json.dumps(data, sort_keys=True, separators=(',', ':')).encode('utf-8')
    signature = private_key.sign(canonical_data, ec.ECDSA(hashes.SHA256()))
    return signature.hex()

def verify_signature(public_key_pem: str, signature_hex: str, data: dict) -> bool:
    """Verifies a signature against the data ('record') and a public key."""
    public_key = serialization.load_pem_public_key(public_key_pem.encode('utf-8'))
    canonical_data = json.dumps(data, sort_keys=True, separators=(',', ':')).encode('utf-8')
    
    try:
        signature = bytes.fromhex(signature_hex)
        public_key.verify(signature, canonical_data, ec.ECDSA(hashes.SHA256()))
        return True
    except Exception:
        return False

# To generate keys for your agent, run this file directly: python ecc_utils.py
if __name__ == '__main__':
    priv_key, pub_key = generate_ecc_keys()
    print("--- Generated Agent Private Key (Copy to config.py) ---")
    print(priv_key)
    print("\n--- Generated Agent Public Key (Share this for verification) ---")
    print(pub_key)
