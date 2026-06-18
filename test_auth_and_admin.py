import requests
import json

base_url = "https://kuarzo-backend-production.up.railway.app/api"

def try_register(email, role_id):
    url = f"{base_url}/auth/register"
    payload = {
        "primerNombre": "Admin",
        "primerApellido": "Test",
        "correo": email,
        "contrasena": "Admin1234!",
        "rolId": role_id
    }
    print(f"\nTrying to register {email} with rolId {role_id}...")
    try:
        r = requests.post(url, json=payload, timeout=10)
        print(f"Status: {r.status_code}")
        print(f"Response: {r.text}")
        return r.status_code in [200, 201]
    except Exception as e:
        print(f"Error: {e}")
        return False

def try_login(email):
    url = f"{base_url}/auth/login"
    payload = {
        "correo": email,
        "contrasena": "Admin1234!"
    }
    print(f"\nTrying to login as {email}...")
    try:
        r = requests.post(url, json=payload, timeout=10)
        print(f"Status: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            print("Login success! User info:")
            print(json.dumps(data.get("usuario"), indent=2))
            return data.get("token")
        else:
            print(f"Login failed: {r.text}")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def test_protected(token):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    endpoints = ["/productos", "/usuarios", "/users", "/pedidos", "/roles"]
    for ep in endpoints:
        url = f"{base_url}{ep}"
        print(f"\nGET {ep} (Authorized)...")
        try:
            r = requests.get(url, headers=headers, timeout=10)
            print(f"Status: {r.status_code}")
            if r.status_code == 200:
                print(f"Body: {str(r.json())[:200]}")
            else:
                print(f"Body: {r.text[:200]}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    email = "admin_test_1@kuarzo.com"
    # Register buyer (rolId 1) and admin (rolId 2) to test
    try_register(email, 2) # let's try rolId 2 first
    token = try_login(email)
    if token:
        test_protected(token)
    else:
        # try registering as rolId 1 and then test
        email_buyer = "buyer_test_1@kuarzo.com"
        try_register(email_buyer, 1)
        token = try_login(email_buyer)
        if token:
            test_protected(token)
