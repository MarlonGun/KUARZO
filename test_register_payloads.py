import requests
import json
import random

base_url = "https://kuarzo-backend-production.up.railway.app/api"
rand_num = random.randint(1000, 9999)
email = f"test_user_{rand_num}@kuarzo.com"

payloads = [
    # 1. All fields as strings
    {
        "primerNombre": "Marlon",
        "segundoNombre": "Antonio",
        "primerApellido": "Gun",
        "segundoApellido": "Soto",
        "correo": email,
        "contrasena": "Marlon12345",
        "telefono": "3007654321",
        "rolId": 1
    },
    # 2. Minimum fields but including optional as empty strings
    {
        "primerNombre": "Marlon",
        "segundoNombre": "",
        "primerApellido": "Gun",
        "segundoApellido": "",
        "correo": f"test_user_alt_{rand_num}@kuarzo.com",
        "contrasena": "Marlon12345",
        "telefono": "",
        "rolId": 1
    },
    # 3. Minimum fields including optional as null
    {
        "primerNombre": "Marlon",
        "segundoNombre": None,
        "primerApellido": "Gun",
        "segundoApellido": None,
        "correo": f"test_user_null_{rand_num}@kuarzo.com",
        "contrasena": "Marlon12345",
        "telefono": None,
        "rolId": 1
    }
]

for i, payload in enumerate(payloads):
    print(f"\nPayload {i+1}:")
    print(json.dumps(payload, indent=2))
    try:
        r = requests.post(f"{base_url}/auth/register", json=payload, timeout=10)
        print(f"Status: {r.status_code}")
        print(f"Response: {r.text}")
    except Exception as e:
        print(f"Error: {e}")
