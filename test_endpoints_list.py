import requests
import json

base_url = "https://kuarzo-backend-production.up.railway.app/api"

endpoints = [
    "/usuarios", "/users", 
    "/productos", "/products",
    "/categorias", "/categories",
    "/pedidos", "/orders",
    "/ventas", "/sales",
    "/roles", "/roles/list",
    "/auth/users", "/auth/usuarios",
    "/auth/me", "/auth/profile"
]

for endpoint in endpoints:
    url = f"{base_url}{endpoint}"
    print(f"GET {endpoint}...", end=" ")
    try:
        r = requests.get(url, timeout=5)
        print(f"Status: {r.status_code}", end="")
        if r.status_code == 200:
            print(f" | Response type: {type(r.json())} | Preview: {str(r.json())[:100]}")
        else:
            print(f" | Body: {r.text[:50]}")
    except Exception as e:
        print(f"Error: {e}")
