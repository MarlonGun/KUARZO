import requests
import socket
import urllib3

# Disable insecure request warnings since we are bypassing DNS and connecting directly via IP
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

hostname = "kuarzo-backend-production.up.railway.app"
base_path = "/api"
email = "admin@kuarzo.com"
password = "admin"

# Resolve IP address
try:
    ip = socket.gethostbyname(hostname)
    print(f"Successfully resolved {hostname} to {ip}")
except Exception as e:
    ip = "69.46.46.54" # Fallback to known Railway edge IP
    print(f"DNS Resolution failed, using fallback IP {ip}. Error: {e}")

base_url = f"https://{ip}{base_path}"

products = [
    {
        "nombre": "Pulsera Volcánica",
        "descripcion": "Pulsera elaborada con piedras volcánicas y dijes de acero.",
        "precio": 45000.0,
        "categoriaId": 1,
        "stock": 15,
        "imagen": "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg"
    },
    {
        "nombre": "Pulsera Premium",
        "descripcion": "Elegante pulsera con acabados premium para cualquier ocasión.",
        "precio": 55000.0,
        "categoriaId": 1,
        "stock": 4,
        "imagen": "https://i.postimg.cc/Mp0VvfWq/PULSERA2.jpg"
    },
    {
        "nombre": "Cadena Oro Rosa",
        "descripcion": "Cadena hecha con oro rosa de alta calidad.",
        "precio": 120000.0,
        "categoriaId": 2,
        "stock": 8,
        "imagen": "https://i.postimg.cc/SRXcsZK7/CADENA1.jpg"
    },
    {
        "nombre": "Cadena Plata",
        "descripcion": "Cadena minimalista de plata de ley.",
        "precio": 85000.0,
        "categoriaId": 2,
        "stock": 25,
        "imagen": "https://i.postimg.cc/6q7C3HQh/CADENA2.jpg"
    },
    {
        "nombre": "Anillo Esmeralda",
        "descripcion": "Anillo exclusivo con detalle de piedra verde esmeralda.",
        "precio": 168000.0,
        "categoriaId": 3,
        "stock": 2,
        "imagen": "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg"
    },
    {
        "nombre": "Anillo Clásico",
        "descripcion": "Anillo sencillo y moderno para uso cotidiano.",
        "precio": 97000.0,
        "categoriaId": 3,
        "stock": 10,
        "imagen": "https://i.postimg.cc/y8RnnNsf/ANILLO2.jpg"
    },
    {
        "nombre": "Aretes Perla",
        "descripcion": "Aretes elegantes hechos con perlas cultivadas.",
        "precio": 78000.0,
        "categoriaId": 4,
        "stock": 12,
        "imagen": "https://i.postimg.cc/8CHRnJ3X/ARETE1.jpg"
    },
    {
        "nombre": "Aretes Cristal",
        "descripcion": "Aretes finos de cristal brillante.",
        "precio": 62000.0,
        "categoriaId": 4,
        "stock": 0,
        "imagen": "https://i.postimg.cc/d1V2MQPR/ARETE2.jpg"
    },
    {
        "nombre": "Tobillera Luna",
        "descripcion": "Tobillera con pequeños dijes de media luna.",
        "precio": 34000.0,
        "categoriaId": 5,
        "stock": 20,
        "imagen": "https://i.postimg.cc/LX51CyLy/TOBILLERA1.jpg"
    },
    {
        "nombre": "Tobillera Estrella",
        "descripcion": "Tobillera veraniega con dijes en forma de estrella.",
        "precio": 38000.0,
        "categoriaId": 5,
        "stock": 18,
        "imagen": "https://i.postimg.cc/PxJw36Y2/TOBILLERA2.jpg"
    }
]

def populate():
    print("=== POPULATING RAILWAY BACKEND (DNS BYPASS ACTIVE) ===")
    
    # 1. Login
    login_url = f"{base_url}/auth/login"
    login_payload = {"correo": email, "contrasena": password}
    headers = {
        "Host": hostname,
        "Content-Type": "application/json"
    }
    
    print("Logging in...")
    r = requests.post(login_url, json=login_payload, headers=headers, verify=False, timeout=10)
    if r.status_code != 200:
        print(f"Login failed: {r.text}")
        return
        
    token = r.json().get("token")
    headers["Authorization"] = f"Bearer {token}"
    print("Logged in successfully.")
    
    # 2. Get existing products from DB to avoid duplicates
    print("Fetching existing products...")
    r = requests.get(f"{base_url}/productos", headers=headers, verify=False, timeout=10)
    existing_names = []
    if r.status_code == 200:
        existing_prods = r.json()
        existing_names = [p.get("nombre") for p in existing_prods]
        print(f"Found {len(existing_names)} products already in DB: {existing_names}")
    else:
        print(f"Could not fetch existing products: {r.text}")
        
    # 3. Insert products
    prod_url = f"{base_url}/productos"
    for prod in products:
        if prod["nombre"] in existing_names:
            print(f"Skipping '{prod['nombre']}' (already exists).")
            continue
            
        print(f"Inserting '{prod['nombre']}'...")
        r = requests.post(prod_url, json=prod, headers=headers, verify=False, timeout=10)
        if r.status_code in [200, 201]:
            print(f"Successfully inserted '{prod['nombre']}'.")
        else:
            print(f"Failed to insert '{prod['nombre']}': {r.status_code} - {r.text}")

if __name__ == "__main__":
    populate()
