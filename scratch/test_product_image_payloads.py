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
    
    r = requests.request(method, url_ip, json=json_data, headers=req_headers, verify=False, timeout=10)
    return r

def test_image_payloads():
    # 1. Login
    login_payload = {"correo": "admin@kuarzo.com", "contrasena": "admin"}
    r = make_request("POST", "/auth/login", json_data=login_payload)
    if r.status_code != 200:
        print("Login failed")
        return
    token = r.json().get("token")
    headers = {"Authorization": f"Bearer {token}"}

    test_image_url = "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg"

    payloads = [
        # Option A: "imagen"
        {
            "nombre": "Test Image A",
            "descripcion": "Test A",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "imagen": test_image_url
        },
        # Option B: "urlImagen"
        {
            "nombre": "Test Image B",
            "descripcion": "Test B",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "urlImagen": test_image_url
        },
        # Option C: "imagenUrl"
        {
            "nombre": "Test Image C",
            "descripcion": "Test C",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "imagenUrl": test_image_url
        },
        # Option D: "imagenes" as list of strings
        {
            "nombre": "Test Image D",
            "descripcion": "Test D",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "imagenes": [test_image_url]
        },
        # Option E: "imagenes" as list of dicts
        {
            "nombre": "Test Image E",
            "descripcion": "Test E",
            "precio": 1000.0,
            "stock": 5,
            "categoriaId": 1,
            "imagenes": [{"urlImagen": test_image_url}]
        }
    ]

    created_ids = []

    for idx, payload in enumerate(payloads):
        print(f"\nSending payload for {payload['nombre']}...")
        r = make_request("POST", "/productos", json_data=payload, headers=headers)
        print(f"Status Code: {r.status_code}")
        if r.status_code in [200, 201]:
            data = r.json()
            prod_id = data.get("producto", {}).get("id") or data.get("id")
            if prod_id:
                print(f"Created successfully with ID: {prod_id}")
                created_ids.append(prod_id)
            else:
                print("Created successfully but no ID found in response")
        else:
            print(f"Failed: {r.text}")

    # Fetch all products and check
    print("\n--- FETCHING ALL PRODUCTS TO CHECK IMAGES ---")
    r = make_request("GET", "/productos", headers=headers)
    if r.status_code == 200:
        products = r.json()
        for p in products:
            p_id = p.get("id")
            if p_id in created_ids:
                print(f"Product ID {p_id} ({p.get('nombre')}):")
                print(f"  imagen: {p.get('imagen')}")
                print(f"  imagenes: {p.get('imagenes')}")
                # Delete it to clean up
                make_request("DELETE", f"/productos/{p_id}", headers=headers)
                print(f"  Deleted ID {p_id} to clean up.")
    else:
        print("Failed to fetch products list")

if __name__ == "__main__":
    test_image_payloads()
