import requests
import random
import json

base_url = "https://kuarzo-backend-production.up.railway.app/api"
rand_num = random.randint(10000, 99999)
test_email = f"admin_integration_{rand_num}@kuarzo.com"
test_password = "SecurePassword123!"

def run_tests():
    print("=== STARTING FULL INTEGRATION TESTS ON RAILWAY ===")
    
    # 1. Test POST /auth/register
    register_url = f"{base_url}/auth/register"
    register_payload = {
        "primerNombre": "Admin",
        "segundoNombre": "Integration",
        "primerApellido": "Test",
        "segundoApellido": "Runner",
        "correo": test_email,
        "contrasena": test_password,
        "telefono": "3123456789",
        "rolId": 2 # ADMINISTRADOR role
    }
    
    print(f"\n1. Registering new admin: {test_email}")
    try:
        r = requests.post(register_url, json=register_payload, timeout=10)
        print(f"Status Code: {r.status_code}")
        print(f"Response: {r.text}")
        if r.status_code not in [200, 201]:
            print("Failed to register. Exiting test.")
            return
    except Exception as e:
        print(f"Connection failed: {e}")
        return

    # 2. Test POST /auth/login
    login_url = f"{base_url}/auth/login"
    login_payload = {
        "correo": test_email,
        "contrasena": test_password
    }
    
    print(f"\n2. Logging in as: {test_email}")
    token = None
    try:
        r = requests.post(login_url, json=login_payload, timeout=10)
        print(f"Status Code: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            token = data.get("token")
            print("Successfully obtained JWT Token!")
        else:
            print(f"Login failed: {r.text}")
            return
    except Exception as e:
        print(f"Connection failed: {e}")
        return

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    # 3. Test POST /productos (Create Product)
    prod_url = f"{base_url}/productos"
    prod_payload = {
        "nombre": f"Anillo de Plata Integration {rand_num}",
        "descripcion": "Anillo de plata ley 950 con acabados finos.",
        "precio": 85000.0,
        "stock": 10,
        "categoriaId": 3,
        "imagen": "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg"
    }
    
    print("\n3. Creating a new test product...")
    try:
        r = requests.post(prod_url, json=prod_payload, headers=headers, timeout=10)
        print(f"Status Code: {r.status_code}")
        print(f"Response: {r.text}")
    except Exception as e:
        print(f"Failed to create product: {e}")

    # 4. Test GET /productos (Retrieve Products List)
    print("\n4. Fetching all products...")
    try:
        r = requests.get(prod_url, headers=headers, timeout=10)
        print(f"Status Code: {r.status_code}")
        if r.status_code == 200:
            prods = r.json()
            print(f"Total products on Railway backend: {len(prods)}")
            if len(prods) > 0:
                print("Latest product:", json.dumps(prods[-1], indent=2))
        else:
            print(f"Failed to fetch products: {r.text}")
    except Exception as e:
        print(f"Error fetching products: {e}")

    # 5. Test GET /pedidos (Retrieve Orders List)
    orders_url = f"{base_url}/pedidos"
    print("\n5. Fetching all orders...")
    try:
        r = requests.get(orders_url, headers=headers, timeout=10)
        print(f"Status Code: {r.status_code}")
        if r.status_code == 200:
            orders = r.json()
            print(f"Total orders on Railway backend: {len(orders)}")
        else:
            print(f"Failed to fetch orders: {r.text}")
    except Exception as e:
        print(f"Error fetching orders: {e}")

if __name__ == "__main__":
    run_tests()
