import datetime

class MockStore:
    def __init__(self):
        # Sample categories matching mockData.ts
        self.categories = [
            {"id": 1, "nombre": "Pulseras", "descripcion": "Pulseras hechas a mano"},
            {"id": 2, "nombre": "Cadenas", "descripcion": "Cadenas finas"},
            {"id": 3, "nombre": "Anillos", "descripcion": "Anillos elegantes"},
            {"id": 4, "nombre": "Aretes", "descripcion": "Aretes y pendientes"},
            {"id": 5, "nombre": "Tobilleras", "descripcion": "Tobilleras para verano"}
        ]

        # Sample products matching mockData.ts
        self.products = [
            {
                "id": 1,
                "nombre": "Pulsera Volcánica",
                "descripcion": "Pulsera elaborada con piedras volcánicas y dijes de acero.",
                "precio": 45000.0,
                "categoriaId": 1,
                "categoriaNombre": "Pulseras",
                "stock": 15,
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg"
            },
            {
                "id": 2,
                "nombre": "Pulsera Premium",
                "descripcion": "Elegante pulsera con acabados premium para cualquier ocasión.",
                "precio": 55000.0,
                "categoriaId": 1,
                "categoriaNombre": "Pulseras",
                "stock": 4,  # Stock bajo para probar alertas
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/Mp0VvfWq/PULSERA2.jpg"
            },
            {
                "id": 3,
                "nombre": "Cadena Oro Rosa",
                "descripcion": "Cadena hecha con oro rosa de alta calidad.",
                "precio": 120000.0,
                "categoriaId": 2,
                "categoriaNombre": "Cadenas",
                "stock": 8,
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/SRXcsZK7/CADENA1.jpg"
            },
            {
                "id": 4,
                "nombre": "Cadena Plata",
                "descripcion": "Cadena minimalista de plata de ley.",
                "precio": 85000.0,
                "categoriaId": 2,
                "categoriaNombre": "Cadenas",
                "stock": 25,
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/6q7C3HQh/CADENA2.jpg"
            },
            {
                "id": 5,
                "nombre": "Anillo Esmeralda",
                "descripcion": "Anillo exclusivo con detalle de piedra verde esmeralda.",
                "precio": 168000.0,
                "categoriaId": 3,
                "categoriaNombre": "Anillos",
                "stock": 2,  # Stock bajo
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg"
            },
            {
                "id": 6,
                "nombre": "Anillo Clásico",
                "descripcion": "Anillo sencillo y moderno para uso cotidiano.",
                "precio": 97000.0,
                "categoriaId": 3,
                "categoriaNombre": "Anillos",
                "stock": 10,
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/y8RnnNsf/ANILLO2.jpg"
            },
            {
                "id": 7,
                "nombre": "Aretes Perla",
                "descripcion": "Aretes elegantes hechos con perlas cultivadas.",
                "precio": 78000.0,
                "categoriaId": 4,
                "categoriaNombre": "Aretes",
                "stock": 12,
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/8CHRnJ3X/ARETE1.jpg"
            },
            {
                "id": 8,
                "nombre": "Aretes Cristal",
                "descripcion": "Aretes finos de cristal brillante.",
                "precio": 62000.0,
                "categoriaId": 4,
                "categoriaNombre": "Aretes",
                "stock": 0,  # Sin stock
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/d1V2MQPR/ARETE2.jpg"
            },
            {
                "id": 9,
                "nombre": "Tobillera Luna",
                "descripcion": "Tobillera con pequeños dijes de media luna.",
                "precio": 34000.0,
                "categoriaId": 5,
                "categoriaNombre": "Tobilleras",
                "stock": 20,
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/LX51CyLy/TOBILLERA1.jpg"
            },
            {
                "id": 10,
                "nombre": "Tobillera Estrella",
                "descripcion": "Tobillera veraniega con dijes en forma de estrella.",
                "precio": 38000.0,
                "categoriaId": 5,
                "categoriaNombre": "Tobilleras",
                "stock": 18,
                "estado": "ACTIVO",
                "imagen": "https://i.postimg.cc/PxJw36Y2/TOBILLERA2.jpg"
            }
        ]

        # Sample users (including admin)
        self.users = [
            {
                "id": 1,
                "primerNombre": "Administrador",
                "segundoNombre": "General",
                "primerApellido": "Kuarzo",
                "segundoApellido": "",
                "correo": "admin@kuarzo.com",
                "contrasena": "admin",  # plaintext for simplicity in mock
                "telefono": "3123456789",
                "rol": "ADMINISTRADOR",
                "rolId": 2,
                "estado": "ACTIVO",
                "fechaRegistro": "2026-04-12 10:00:00"
            },
            {
                "id": 2,
                "primerNombre": "Marlon",
                "segundoNombre": "Antonio",
                "primerApellido": "Gun",
                "segundoApellido": "Soto",
                "correo": "marlon@kuarzo.com",
                "contrasena": "comprador",
                "telefono": "3007654321",
                "rol": "COMPRADOR",
                "rolId": 1,
                "estado": "ACTIVO",
                "fechaRegistro": "2026-05-01 15:30:00"
            },
            {
                "id": 3,
                "primerNombre": "Nicolas",
                "segundoNombre": "",
                "primerApellido": "Gomez",
                "segundoApellido": "",
                "correo": "nicolas@kuarzo.com",
                "contrasena": "comprador",
                "telefono": "3014567890",
                "rol": "COMPRADOR",
                "rolId": 1,
                "estado": "ACTIVO",
                "fechaRegistro": "2026-05-15 08:45:00"
            },
            {
                "id": 4,
                "primerNombre": "Cliente",
                "segundoNombre": "Bloqueado",
                "primerApellido": "Perez",
                "segundoApellido": "",
                "correo": "bloqueado@kuarzo.com",
                "contrasena": "12345",
                "telefono": "3200000000",
                "rol": "COMPRADOR",
                "rolId": 1,
                "estado": "INACTIVO",
                "fechaRegistro": "2026-05-20 18:20:00"
            }
        ]

        # Sample orders
        self.orders = [
            {
                "id": 1,
                "usuarioId": 2,
                "clienteNombre": "Marlon Gun",
                "clienteCorreo": "marlon@kuarzo.com",
                "direccion": "Calle 45 #12-34, Barrio El Poblado, Medellin",
                "fechaPedido": "2026-05-28 14:32:00",
                "estado": "ENTREGADO",
                "total": 145000.0,  # (45000 * 2) + 55000
                "items": [
                    {"productoId": 1, "nombre": "Pulsera Volcánica", "cantidad": 2, "precioUnitario": 45000.0},
                    {"productoId": 2, "nombre": "Pulsera Premium", "cantidad": 1, "precioUnitario": 55000.0}
                ]
            },
            {
                "id": 2,
                "usuarioId": 3,
                "clienteNombre": "Nicolas Gomez",
                "clienteCorreo": "nicolas@kuarzo.com",
                "direccion": "Avenida Siempre Viva 742, Bogota",
                "fechaPedido": "2026-06-01 09:15:00",
                "estado": "ENVIADO",
                "total": 120000.0,
                "items": [
                    {"productoId": 3, "nombre": "Cadena Oro Rosa", "cantidad": 1, "precioUnitario": 120000.0}
                ]
            },
            {
                "id": 3,
                "usuarioId": 2,
                "clienteNombre": "Marlon Gun",
                "clienteCorreo": "marlon@kuarzo.com",
                "direccion": "Calle 45 #12-34, Barrio El Poblado, Medellin",
                "fechaPedido": "2026-06-02 02:40:00",
                "estado": "PENDIENTE",
                "total": 246000.0,  # 168000 + 78000
                "items": [
                    {"productoId": 5, "nombre": "Anillo Esmeralda", "cantidad": 1, "precioUnitario": 168000.0},
                    {"productoId": 7, "nombre": "Aretes Perla", "cantidad": 1, "precioUnitario": 78000.0}
                ]
            }
        ]

        self.contacts = [
            {
                "id": 1,
                "nombre": "Juan",
                "apellido": "Perez",
                "correo": "juan@example.com",
                "telefono": "3001234567",
                "leido": False,
                "createdAt": "2026-06-22T10:00:00.000Z"
            },
            {
                "id": 2,
                "nombre": "Ana",
                "apellido": "Gomez",
                "correo": "ana@example.com",
                "telefono": "3109876543",
                "leido": True,
                "createdAt": "2026-06-21T15:30:00.000Z"
            }
        ]

    # --- AUTHENTICATION ---
    def authenticate(self, email, password):
        for user in self.users:
            if user["correo"] == email and user["contrasena"] == password:
                if user["rol"] != "ADMINISTRADOR":
                    return {"success": False, "error": "Acceso restringido. Solo administradores."}
                if user["estado"] != "ACTIVO":
                    return {"success": False, "error": "Este usuario administrador está inactivo."}
                return {
                    "success": True,
                    "token": "mock-jwt-token-xyz-12345",
                    "user": {
                        "id": user["id"],
                        "primerNombre": user["primerNombre"],
                        "primerApellido": user["primerApellido"],
                        "correo": user["correo"],
                        "rol": user["rol"]
                    }
                }
        return {"success": False, "error": "Credenciales incorrectas"}

    # --- STATISTICS ---
    def get_stats(self):
        revenue = sum(order["total"] for order in self.orders if order["estado"] != "CANCELADO")
        active_products = len([p for p in self.products if p["estado"] == "ACTIVO"])
        total_orders = len(self.orders)
        total_users = len(self.users)
        
        # Monthly sales data for graph
        monthly_sales = {
            "Enero": 1200000,
            "Febrero": 1800000,
            "Marzo": 1500000,
            "Abril": 2400000,
            "Mayo": 3100000,
            "Junio": 511000  # Current month sales
        }
        
        # Sales per category for graph
        category_sales = {}
        for order in self.orders:
            if order["estado"] == "CANCELADO":
                continue
            for item in order["items"]:
                prod = next((p for p in self.products if p["id"] == item["productoId"]), None)
                cat_name = prod["categoriaNombre"] if prod else "Otros"
                category_sales[cat_name] = category_sales.get(cat_name, 0) + (item["precioUnitario"] * item["cantidad"])

        return {
            "total_revenue": revenue,
            "active_products": active_products,
            "total_orders": total_orders,
            "total_users": total_users,
            "monthly_sales": monthly_sales,
            "category_sales": category_sales
        }

    # --- PRODUCTS CRUD ---
    def get_products(self, query=None, category=None):
        result = self.products
        if category and category != "Todos":
            result = [p for p in result if p["categoriaNombre"] == category]
        if query:
            q = query.lower()
            result = [p for p in result if q in p["nombre"].lower() or q in p["descripcion"].lower()]
        return result

    def get_product(self, prod_id):
        return next((p for p in self.products if p["id"] == int(prod_id)), None)

    def add_product(self, name, description, price, category_name, stock, image_url=None, destacado=False, imagen2=None, imagen3=None):
        cat = next((c for c in self.categories if c["nombre"] == category_name), None)
        cat_id = cat["id"] if cat else 1
        
        new_id = max(p["id"] for p in self.products) + 1 if self.products else 1
        new_prod = {
            "id": new_id,
            "nombre": name,
            "descripcion": description,
            "precio": float(price),
            "categoriaId": cat_id,
            "categoriaNombre": category_name,
            "stock": int(stock),
            "estado": "ACTIVO",
            "destacado": destacado,
            "imagen": image_url or "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg"
        }
        imagenes = []
        if image_url: imagenes.append({"urlImagen": image_url})
        if imagen2: imagenes.append({"urlImagen": imagen2})
        if imagen3: imagenes.append({"urlImagen": imagen3})
        new_prod["imagenes"] = imagenes
        
        self.products.append(new_prod)
        return new_prod

    def edit_product(self, prod_id, name, description, price, category_name, stock, image_url=None, destacado=False, imagen2=None, imagen3=None):
        prod = self.get_product(prod_id)
        if prod:
            cat = next((c for c in self.categories if c["nombre"] == category_name), None)
            cat_id = cat["id"] if cat else 1
            
            prod["nombre"] = name
            prod["descripcion"] = description
            prod["precio"] = float(price)
            prod["categoriaId"] = cat_id
            prod["categoriaNombre"] = category_name
            prod["stock"] = int(stock)
            prod["destacado"] = destacado
            if image_url:
                prod["imagen"] = image_url
            
            imagenes = []
            if image_url: imagenes.append({"urlImagen": image_url})
            if imagen2: imagenes.append({"urlImagen": imagen2})
            if imagen3: imagenes.append({"urlImagen": imagen3})
            prod["imagenes"] = imagenes
            
            return prod
        return None

    def delete_product(self, prod_id):
        prod = self.get_product(prod_id)
        if prod:
            prod["estado"] = "INACTIVO"
            return True
        return False

    # --- ORDERS MANAGEMENT ---
    def get_orders(self):
        return self.orders

    def update_order_status(self, order_id, status):
        for order in self.orders:
            if order["id"] == int(order_id):
                order["estado"] = status
                return True
        return False

    # --- USERS MANAGEMENT ---
    def get_users(self):
        return self.users

    def update_user_status(self, user_id, status):
        for user in self.users:
            if user["id"] == int(user_id):
                user["estado"] = status
                return True
        return False

    def update_user_role(self, user_id, role_name, role_id):
        for user in self.users:
            if user["id"] == int(user_id):
                user["rol"] = role_name
                user["rolId"] = int(role_id)
                return True
        return False

    # --- CONTACTS MANAGEMENT ---
    def get_contacts(self):
        return self.contacts

    def mark_contact_read(self, contact_id):
        for c in self.contacts:
            if c["id"] == int(contact_id):
                c["leido"] = True
                return True
        return False

    def delete_contact(self, contact_id):
        initial_len = len(self.contacts)
        self.contacts = [c for c in self.contacts if c["id"] != int(contact_id)]
        return len(self.contacts) < initial_len

# Global single instance of MockStore
mock_db = MockStore()
