import requests
import json
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

hostname = "kuarzo-backend-production.up.railway.app"
direct_ip = "69.46.46.54"

def make_request(method, path, json_data=None, headers=None):
    url_ip = f"https://{direct_ip}/api{path}"
    req_headers = {
        "Content-Type": "application/json",
        "Host": hostname
    }
    if headers:
        req_headers.update(headers)
    return requests.request(method, url_ip, json=json_data, headers=req_headers, verify=False, timeout=10)

def test_nested():
    # Login
    login_payload = {"correo": "admin@kuarzo.com", "contrasena": "admin"}
    r = make_request("POST", "/auth/login", json_data=login_payload)
    if r.status_code != 200:
        print("Login failed")
        return
    token = r.json().get("token")
    headers = {"Authorization": f"Bearer {token}"}

    test_image_url = "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg"

    payloads = [
        # 1. Prisma nested create array
        {
            "nombre": "Test Prisma Nest A",
            "descripcion": "Nest A",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "imagenes": {
                "create": [
                    {"urlImagen": test_image_url}
                ]
            }
        },
        # 2. Prisma nested create object
        {
            "nombre": "Test Prisma Nest B",
            "descripcion": "Nest B",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "imagenes": {
                "create": {"urlImagen": test_image_url}
            }
        },
        # 3. Prisma nested create array (imagenproducto relation name)
        {
            "nombre": "Test Prisma Nest C",
            "descripcion": "Nest C",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "imagenproducto": {
                "create": [
                    {"urlImagen": test_image_url}
                ]
            }
        }
    ]

    created_ids = []
    for idx, payload in enumerate(payloads):
        print(f"\nSending payload for {payload['nombre']}...")
        r = make_request("POST", "/productos", json_data=payload, headers=headers)
        print(f"Status Code: {r.status_code}")
        print(f"Response: {r.text}")
        if r.status_code in [200, 201]:
            data = r.json()
            prod_id = data.get("producto", {}).get("id") or data.get("id")
            if prod_id:
                print(f"Created successfully with ID: {prod_id}")
                created_ids.append(prod_id)

    # Fetch and check
    print("\n--- FETCHING ALL PRODUCTS ---")
    r = make_request("GET", "/productos", headers=headers)
    if r.status_code == 200:
        products = r.json()
        for p in products:
            p_id = p.get("id")
            if p_id in created_ids:
                print(f"Product ID {p_id} ({p.get('nombre')}):")
                print(f"  imagenes: {p.get('imagenes')}")
                # Clean up
                make_request("DELETE", f"/productos/{p_id}", headers=headers)
                print(f"  Deleted ID {p_id}")
    else:
        print("Failed to fetch products")

if __name__ == "__main__":
    test_nested()
