import requests
from config import API_BASE_URL, API_TIMEOUT


class ApiClient:
    def __init__(self):
        self.base_url = API_BASE_URL
        self.token = None
        self.user_info = None

    def _request(self, method, endpoint, json=None, headers=None):
        """Performs a network request to the Railway backend using the configured base URL."""
        url = f"{self.base_url}{endpoint}"

        req_headers = {
            "Content-Type": "application/json"
        }
        if self.token:
            req_headers["Authorization"] = f"Bearer {self.token}"
        if headers:
            req_headers.update(headers)

        return requests.request(method, url, json=json, headers=req_headers, timeout=API_TIMEOUT)

    def is_alive(self):
        """Checks if the API is reachable."""
        try:
            # La raiz devuelve 200 con el mensaje de bienvenida
            url = self.base_url.replace("/api", "")
            r = requests.get(url, timeout=API_TIMEOUT)
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

    def add_product(self, name, description, price, category_name, stock, image_url=None, destacado=False, imagen2=None, imagen3=None):
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
            "categoriaId": category_id,
            "destacado": bool(destacado)
        }
        if image_url:
            payload["imagen"] = image_url
        if imagen2:
            payload["imagen2"] = imagen2
        if imagen3:
            payload["imagen3"] = imagen3
            
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

    def edit_product(self, prod_id, name, description, price, category_name, stock, image_url=None, destacado=False, imagen2=None, imagen3=None):
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
            "categoriaId": category_id,
            "destacado": bool(destacado)
        }
        if image_url:
            payload["imagen"] = image_url
        if imagen2:
            payload["imagen2"] = imagen2
        if imagen3:
            payload["imagen3"] = imagen3

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

    # --- CONTACTS MANAGEMENT ---
    def get_contacts(self):
        """Endpoint: GET /api/contacto"""
        try:
            r = self._request("GET", "/contacto")
            if r.status_code == 200:
                return {"success": True, "data": r.json()}
            return {"success": False, "error": r.text}
        except requests.RequestException:
            return {"success": False, "error": "Error de conexión."}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def mark_contact_read(self, contact_id):
        """Endpoint: PUT /api/contacto/:id/leido"""
        try:
            r = self._request("PUT", f"/contacto/{contact_id}/leido")
            if r.status_code in [200, 204]:
                return {"success": True}
            return {"success": False, "error": r.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def delete_contact(self, contact_id):
        """Endpoint: DELETE /api/contacto/:id"""
        try:
            r = self._request("DELETE", f"/contacto/{contact_id}")
            if r.status_code in [200, 204]:
                return {"success": True}
            return {"success": False, "error": r.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

    # --- USERS MANAGEMENT ---
    def get_users(self):
        """Endpoint: GET /api/usuarios"""
        try:
            r = self._request("GET", "/usuarios")
            if r.status_code == 200:
                return {"success": True, "data": r.json()}
            return {"success": False, "error": r.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def update_user_status(self, user_id, status):
        """Endpoint: PUT /api/usuarios/:id/estado"""
        try:
            r = self._request("PUT", f"/usuarios/{user_id}/estado", json={"estado": status})
            if r.status_code in [200, 204]:
                return {"success": True}
            return {"success": False, "error": r.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def update_user_role(self, user_id, role_id):
        """Endpoint: PUT /api/usuarios/:id/rol"""
        try:
            r = self._request("PUT", f"/usuarios/{user_id}/rol", json={"rolId": role_id})
            if r.status_code in [200, 204]:
                return {"success": True}
            return {"success": False, "error": r.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

# Global API Client instance
api_client = ApiClient()
