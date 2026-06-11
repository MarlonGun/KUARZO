import requests

base_url = "https://kuarzo-backend-production.up.railway.app/api"
endpoints = ["/usuarios", "/users", "/clientes", "/customers", "/roles"]

for ep in endpoints:
    url = f"{base_url}{ep}"
    print(f"Testing GET {ep}...")
    try:
        r = requests.get(url, timeout=10)
        print(f"Status: {r.status_code}")
        print(f"Body: {r.text[:200]}\n")
    except Exception as e:
        print(f"Error: {e}\n")
