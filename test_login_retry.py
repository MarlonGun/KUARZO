import requests
import time

base_url = "https://kuarzo-backend-production.up.railway.app/api"

def try_login_with_retries(email, password, retries=5, delay=3):
    url = f"{base_url}/auth/login"
    payload = {
        "correo": email,
        "contrasena": password
    }
    
    for i in range(retries):
        print(f"Attempt {i+1}/{retries} - Login as {email}...")
        try:
            r = requests.post(url, json=payload, timeout=10)
            print(f"Status: {r.status_code}")
            print(f"Response: {r.text}")
            if r.status_code == 200:
                print("SUCCESS!")
                return r.json().get("token")
            elif r.status_code == 401:
                print("Credentials incorrect (Unauthorized)")
                return None
            else:
                print("Unexpected error code")
        except Exception as e:
            print(f"Attempt {i+1} failed: {e}")
            if i < retries - 1:
                print(f"Waiting {delay} seconds before next attempt...")
                time.sleep(delay)
    return None

if __name__ == "__main__":
    try_login_with_retries("admin@kuarzo.com", "admin")
