import requests
import json

base_url = "https://kuarzo-backend-production.up.railway.app/api"

try:
    print("GET /api/productos...")
    r = requests.get(f"{base_url}/productos", timeout=10)
    print(f"Status: {r.status_code}")
    print("Content preview (first 500 chars):")
    print(r.text[:500])
    try:
        data = r.json()
        print(f"Parsed JSON successfully. Type: {type(data)}")
        if isinstance(data, list):
            print(f"Length of products list: {len(data)}")
            if len(data) > 0:
                print("First product keys:", data[0].keys())
                print("First product sample:", json.dumps(data[0], indent=2))
        else:
            print("Response:", json.dumps(data, indent=2))
    except Exception as e:
        print("Could not parse JSON:", e)
except Exception as e:
    print("Failed request:", e)
