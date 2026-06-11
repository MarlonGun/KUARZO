import requests

base_url = "https://kuarzo-backend-production.up.railway.app"

for path in ["/", "/api", "/api-docs", "/docs", "/swagger"]:
    url = f"{base_url}{path}"
    print(f"\nGET {url}...")
    try:
        r = requests.get(url, timeout=5)
        print(f"Status: {r.status_code}")
        print(f"Content Type: {r.headers.get('Content-Type')}")
        print(f"Body (first 200 chars): {r.text[:200]}")
    except Exception as e:
        print(f"Error: {e}")
