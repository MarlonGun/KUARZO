import requests
import time

base_url = "https://kuarzo-backend-production.up.railway.app/api"
email = "admin_integration_38783@kuarzo.com"
password = "SecurePassword123!"

def robust_post(url, json_data, headers=None, retries=5, delay=3):
    for i in range(retries):
        try:
            r = requests.post(url, json=json_data, headers=headers, timeout=10)
            return r
        except Exception as e:
            print(f"Post failed (attempt {i+1}/{retries}): {e}")
            if i < retries - 1:
                time.sleep(delay)
    raise ConnectionError(f"Could not POST to {url} after {retries} attempts.")

def test_payloads():
    login_url = f"{base_url}/auth/login"
    login_payload = {"correo": email, "contrasena": password}
    
    print("Logging in...")
    try:
        r = robust_post(login_url, login_payload)
    except Exception as e:
        print(f"Login failed: {e}")
        return
        
    if r.status_code != 200:
        print(f"Login failed status: {r.status_code}, text: {r.text}")
        return
    token = r.json().get("token")
    print("Token obtained successfully.")

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    url = f"{base_url}/productos"

    payloads = [
        # 1. Standard payload from desktop app
        {
            "nombre": "Anillo Test 1",
            "descripcion": "Test 1",
            "precio": 1000,
            "stock": 5,
            "categoriaNombre": "Anillos"
        },
        # 2. Payload with category name under 'categoria' key
        {
            "nombre": "Anillo Test 2",
            "descripcion": "Test 2",
            "precio": 1000,
            "stock": 5,
            "categoria": "Anillos"
        },
        # 3. Payload with category ID under 'categoriaId' key (assuming 1, 2, 3 might exist)
        {
            "nombre": "Anillo Test 3",
            "descripcion": "Test 3",
            "precio": 1000,
            "stock": 5,
            "categoriaId": 1
        },
        # 4. Minimal payload without category (to see if it accepts defaults or fails differently)
        {
            "nombre": "Anillo Test 4",
            "descripcion": "Test 4",
            "precio": 1000,
            "stock": 5
        }
    ]

    for i, payload in enumerate(payloads):
        print(f"\n--- Testing Payload {i+1} ---")
        for attempt in range(5):
            try:
                r = requests.post(url, json=payload, headers=headers, timeout=10)
                print(f"Status Code: {r.status_code}")
                print(f"Response: {r.text}")
                break
            except Exception as e:
                print(f"Attempt {attempt+1} failed: {e}")
                if attempt < 4:
                    time.sleep(3)

if __name__ == "__main__":
    test_payloads()

