import requests
import json

base_url = "https://kuarzo-backend-production.up.railway.app/api"

def try_login(email, password):
    url = f"{base_url}/auth/login"
    payload = {
        "correo": email,
        "contrasena": password
    }
    print(f"Trying to login as {email} with '{password}'...")
    try:
        r = requests.post(url, json=payload, timeout=10)
        print(f"Status: {r.status_code}")
        print(f"Response text: {r.text}")
        if r.status_code == 200:
            data = r.json()
            print("Login success! JWT Token obtained.")
            return data.get("token")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    try_login("admin@kuarzo.com", "admin")
