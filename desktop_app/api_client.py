import requests
import socket
import urllib3
from config import API_BASE_URL, API_TIMEOUT

# Disable insecure request warning since we connect via IP and bypass SSL hostname verification
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class ApiClient:
    def __init__(self):
        self.base_url = API_BASE_URL
        self.token = None
        self.user_info = None
        self.hostname = "kuarzo-backend-production.up.railway.app"
        self.ip = None
        self.resolve_ip()

    def resolve_ip(self):
        """Resolves the Railway hostname to IP dynamically, or falls back to a known edge IP."""
        try:
            self.ip = socket.gethostbyname(self.hostname)
        except Exception:
            self.ip = "69.46.46.54"

    def _request(self, method, endpoint, json=None, headers=None):
        """Performs a network request directly to the IP address using the Host header."""
        if not self.ip:
            self.resolve_ip()
            
        url = f"https://{self.ip}/api{endpoint}"
        
        req_headers = {
            "Host": self.hostname,
            "Content-Type": "application/json"
        }
        if self.token:
            req_headers["Authorization"] = f"Bearer {self.token}"
        if headers:
            req_headers.update(headers)
            
        # We perform the request with verify=False since the SSL certificate is for the hostname, not the IP.
        return requests.request(method, url, json=json, headers=req_headers, verify=False, timeout=API_TIMEOUT)

    def is_alive(self):
        """Checks if the API is reachable."""
        try:
            r = self._request("GET", "")
            return r.status_code == 200
        except Exception:
            return False

    def login(self, email, password):
        """
        Performs login request and saves JWT token.
        Endpoint: POST /api/auth/login
        """
        payload = {
            "correo": email,
            "contrasena": password
        }
        try:
            r = self._request("POST", "/auth/login", json=payload)
            if r.status_code == 200:
                data = r.json()
                self.token = data.get("token")
                self.user_info = data.get("usuario")
                
                # Check admin privileges
                if self.user_info and self.user_info.get("rol") != "ADMINISTRADOR":
                    self.token = None
                    self.user_info = None
                    return {"success": False, "error": "Acceso denegado. Se requieren permisos de ADMINISTRADOR."}
                
                return {"success": True, "token": self.token, "user": self.user_info}
            else:
                try:
                    error_msg = r.json().get("error", "Credenciales incorrectas")
                except Exception:
                    error_msg = f"Error del servidor ({r.status_code})"
                return {"success": False, "error": error_msg}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión: No se pudo contactar al servidor de Railway. Verifique su conexión de red."}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def logout(self):
        self.token = None
        self.user_info = None

    def get_products(self):
        """Endpoint: GET /api/productos"""
        try:
            r = self._request("GET", "/productos")
            if r.status_code == 200:
                return {"success": True, "data": r.json()}
            return {"success": False, "error": f"Fallo al obtener productos: {r.text[:100]}"}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión: No se pudo contactar al servidor de Railway. Verifique su conexión de red."}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def add_product(self, name, description, price, category_name, stock, image_url=None):
        """Endpoint: POST /api/productos"""
        category_id = {
            "Pulseras": 1,
            "Cadenas": 2,
            "Anillos": 3,
            "Aretes": 4,
            "Tobilleras": 5
        }.get(category_name, 1)
        payload = {
            "nombre": name,
            "descripcion": description,
            "precio": float(price),
            "stock": int(stock),
            "categoriaId": category_id
        }
        if image_url:
            payload["imagen"] = image_url
            
        try:
            r = self._request("POST", "/productos", json=payload)
            if r.status_code in [200, 201]:
                return {"success": True, "data": r.json()}
            try:
                error_msg = r.json().get("error", r.text)
            except Exception:
                error_msg = f"Error {r.status_code}: {r.text[:100]}"
            return {"success": False, "error": error_msg}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión: No se pudo contactar al servidor de Railway. Verifique su conexión de red."}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def edit_product(self, prod_id, name, description, price, category_name, stock, image_url=None):
        """Endpoint: PUT /api/productos/:id"""
        category_id = {
            "Pulseras": 1,
            "Cadenas": 2,
            "Anillos": 3,
            "Aretes": 4,
            "Tobilleras": 5
        }.get(category_name, 1)
        payload = {
            "nombre": name,
            "descripcion": description,
            "precio": float(price),
            "stock": int(stock),
            "categoriaId": category_id
        }
        if image_url:
            payload["imagen"] = image_url

        try:
            r = self._request("PUT", f"/productos/{prod_id}", json=payload)
            if r.status_code in [200, 204]:
                return {"success": True}
            try:
                error_msg = r.json().get("error", r.text)
            except Exception:
                error_msg = f"Error {r.status_code}: {r.text[:100]}"
            return {"success": False, "error": error_msg}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión: No se pudo contactar al servidor de Railway. Verifique su conexión de red."}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def delete_product(self, prod_id):
        """Endpoint: DELETE /api/productos/:id"""
        try:
            r = self._request("DELETE", f"/productos/{prod_id}")
            if r.status_code in [200, 204]:
                return {"success": True}
            return {"success": False, "error": r.text}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión: No se pudo contactar al servidor de Railway. Verifique su conexión de red."}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def get_orders(self):
        """Endpoint: GET /api/pedidos"""
        try:
            r = self._request("GET", "/pedidos")
            if r.status_code == 200:
                return {"success": True, "data": r.json()}
            return {"success": False, "error": r.text}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión: No se pudo contactar al servidor de Railway. Verifique su conexión de red."}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def update_order_status(self, order_id, status):
        """Endpoint: PUT /api/pedidos/:id"""
        payload = {"estado": status}
        try:
            r = self._request("PUT", f"/pedidos/{order_id}", json=payload)
            if r.status_code in [200, 204]:
                return {"success": True}
            return {"success": False, "error": r.text}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión: No se pudo contactar al servidor de Railway. Verifique su conexión de red."}
        except Exception as e:
            return {"success": False, "error": str(e)}


# Global API Client instance
api_client = ApiClient()
