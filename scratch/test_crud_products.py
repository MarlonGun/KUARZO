import requests
import json
import urllib3

# Disable insecure request warning since we might connect via IP
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

hostname = "kuarzo-backend-production.up.railway.app"
direct_ip = "69.46.46.54"

def make_request(method, path, json_data=None, headers=None):
    """
    Sends request to Railway. First tries via domain.
    If NameResolutionError or similar occurs, falls back to direct IP workaround.
    """
    url_domain = f"https://{hostname}/api{path}"
    url_ip = f"https://{direct_ip}/api{path}"
    
    req_headers = {
        "Content-Type": "application/json"
    }
    if headers:
        req_headers.update(headers)
        
    # Attempt 1: Standard domain name request
    try:
        r = requests.request(method, url_domain, json=json_data, headers=req_headers, timeout=10)
        return r
    except requests.exceptions.RequestException as e:
        # Check if it looks like a NameResolutionError/DNS error
        if "NameResolutionError" in str(e) or "getaddrinfo failed" in str(e):
            print(f"  [DNS Fallback] DNS resolution failed for domain. Retrying request via direct IP {direct_ip}...")
            # Set the Host header so the edge router knows where to route the request
            ip_headers = req_headers.copy()
            ip_headers["Host"] = hostname
            r = requests.request(method, url_ip, json=json_data, headers=ip_headers, verify=False, timeout=10)
            return r
        else:
            raise e

def test_crud():
    print("=== INICIANDO PRUEBAS DE CRUD DE PRODUCTOS EN RAILWAY (ROBUSTO) ===")
    
    # 1. Login
    login_payload = {
        "correo": "admin@kuarzo.com",
        "contrasena": "admin"
    }
    
    print("\n1. Iniciando sesión como administrador...")
    try:
        r = make_request("POST", "/auth/login", json_data=login_payload)
        print(f"Status Code: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            token = data.get("token")
            print("¡Inicio de sesión exitoso! Token obtenido.")
        else:
            print(f"Error en login: {r.text}")
            return
    except Exception as e:
        print(f"Error de conexión en login: {e}")
        return

    headers = {
        "Authorization": f"Bearer {token}"
    }

    # 2. Crear producto (POST)
    create_payload = {
        "nombre": "Producto Prueba CRUD",
        "descripcion": "Esta es una prueba de ciclo de vida del producto.",
        "precio": 99999.0,
        "stock": 15,
        "categoriaId": 1,
        "imagen": "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg"
    }
    
    print("\n2. Creando nuevo producto (POST /productos)...")
    prod_id = None
    try:
        r = make_request("POST", "/productos", json_data=create_payload, headers=headers)
        print(f"Status Code: {r.status_code}")
        print(f"Response: {r.text}")
        if r.status_code in [200, 201]:
            prod_data = r.json()
            prod_id = prod_data.get("producto", {}).get("id") or prod_data.get("id")
            print(f"¡Producto creado exitosamente! ID: {prod_id}")
        else:
            print("Error al crear producto.")
            return
    except Exception as e:
        print(f"Error de conexión al crear producto: {e}")
        return

    if not prod_id:
        print("No se pudo obtener el ID del producto creado.")
        return

    # 3. Editar producto (PUT)
    edit_payload = {
        "nombre": "Producto Prueba CRUD Modificado",
        "descripcion": "Descripción modificada.",
        "precio": 88888.0,
        "stock": 5,
        "categoriaId": 1,
        "imagen": "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg"
    }
    
    print(f"\n3. Modificando producto (PUT /productos/{prod_id})...")
    try:
        r = make_request("PUT", f"/productos/{prod_id}", json_data=edit_payload, headers=headers)
        print(f"Status Code: {r.status_code}")
        print(f"Response: {r.text}")
        if r.status_code in [200, 204]:
            print("¡Producto modificado exitosamente!")
        else:
            print("Error al modificar producto.")
    except Exception as e:
        print(f"Error de conexión al modificar producto: {e}")

    # 4. Validar cambios (GET /productos)
    print("\n4. Validando cambios (GET /productos)...")
    try:
        r = make_request("GET", "/productos", headers=headers)
        if r.status_code == 200:
            products = r.json()
            updated_prod = next((p for p in products if str(p.get("id")) == str(prod_id)), None)
            if updated_prod:
                print("Producto encontrado en la lista con los valores actualizados:")
                print(json.dumps(updated_prod, indent=2))
            else:
                print("¡Advertencia: El producto creado no se encontró en la lista!")
        else:
            print(f"Error al obtener productos: {r.text}")
    except Exception as e:
        print(f"Error de conexión al obtener productos: {e}")

    # 5. Eliminar producto (DELETE)
    print(f"\n5. Eliminando producto (DELETE /productos/{prod_id})...")
    try:
        r = make_request("DELETE", f"/productos/{prod_id}", headers=headers)
        print(f"Status Code: {r.status_code}")
        print(f"Response: {r.text}")
        if r.status_code in [200, 204]:
            print("¡Producto eliminado exitosamente!")
        else:
            print("Error al eliminar producto.")
    except Exception as e:
        print(f"Error de conexión al eliminar producto: {e}")

    # 6. Validar eliminación
    print("\n6. Validando eliminación (GET /productos)...")
    try:
        r = make_request("GET", "/productos", headers=headers)
        if r.status_code == 200:
            products = r.json()
            deleted_prod = next((p for p in products if str(p.get("id")) == str(prod_id)), None)
            if not deleted_prod or deleted_prod.get("estado") == "INACTIVO":
                print("¡Verificación exitosa! El producto ya no está activo (su estado es INACTIVO o no aparece).")
            else:
                print(f"¡Advertencia: El producto con ID {prod_id} sigue activo/visible en la lista!")
                print(json.dumps(deleted_prod, indent=2))
        else:
            print(f"Error al obtener productos para verificar eliminación: {r.text}")
    except Exception as e:
        print(f"Error de conexión al verificar eliminación: {e}")

if __name__ == "__main__":
    test_crud()
