import customtkinter as ctk
from database import db
from config import COLORS, FONTS

class ProductsView(ctk.CTkFrame):
    def __init__(self, master):
        super().__init__(master, fg_color=COLORS["background_dark"])
        
        self.pack(fill="both", expand=True, padx=20, pady=20)
        
        # Header
        self.header_frame = ctk.CTkFrame(self, fg_color="transparent")
        self.header_frame.pack(fill="x", pady=(0, 20))
        
        self.title = ctk.CTkLabel(self.header_frame, text="Gestión de Productos", font=FONTS["h1"], text_color=COLORS["text_light"])
        self.title.pack(side="left")
        
        self.btn_frame = ctk.CTkFrame(self.header_frame, fg_color="transparent")
        self.btn_frame.pack(side="right")
        
        self.add_btn = ctk.CTkButton(self.btn_frame, text="+ Nuevo Producto", width=120, font=FONTS["body_bold"],
                                     fg_color=COLORS["secondary"], hover_color=COLORS["secondary_hover"],
                                     text_color=COLORS["text_light"], command=self.open_add_product_modal)
        self.add_btn.pack(side="left", padx=10)
        
        self.refresh_btn = ctk.CTkButton(self.btn_frame, text="Actualizar", width=100, font=FONTS["body_bold"],
                                         fg_color=COLORS["primary"], hover_color=COLORS["primary_hover"],
                                         text_color=COLORS["text_dark"], command=self.load_products)
        self.refresh_btn.pack(side="left")
        
        # Table Container
        self.table_container = ctk.CTkScrollableFrame(self, fg_color=COLORS["tertiary"], corner_radius=10)
        self.table_container.pack(fill="both", expand=True)
        
        self.load_products()

    def load_products(self):
        # Clear existing
        for widget in self.table_container.winfo_children():
            widget.destroy()
            
        # Table Header
        header_frame = ctk.CTkFrame(self.table_container, fg_color=COLORS["tertiary_light"])
        header_frame.pack(fill="x", pady=(0, 10))
        header_frame.grid_columnconfigure((0, 1, 2, 3, 4, 5, 6), weight=1)
        
        headers = ["ID", "Nombre", "Categoría", "Precio", "Stock", "Estado", "Acciones"]
        for i, text in enumerate(headers):
            lbl = ctk.CTkLabel(header_frame, text=text, font=FONTS["body_bold"], text_color=COLORS["text_light"])
            lbl.grid(row=0, column=i, pady=10, padx=10, sticky="w")
            
        # Fetch products
        query = """
        SELECT p.id, p.nombre, p.precio, p.stock, p.estado, c.nombre as categoria
        FROM producto p
        LEFT JOIN categoria c ON p.categoriaId = c.id
        ORDER BY p.id DESC
        """
        products = db.fetch_all(query)
        
        for idx, prod in enumerate(products):
            row_frame = ctk.CTkFrame(self.table_container, fg_color="transparent")
            row_frame.pack(fill="x", pady=5)
            row_frame.grid_columnconfigure((0, 1, 2, 3, 4, 5, 6), weight=1)
            
            cat_name = prod['categoria'] if prod['categoria'] else "N/A"
            
            ctk.CTkLabel(row_frame, text=str(prod['id']), font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=0, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=prod['nombre'], font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=1, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=cat_name, font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=2, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=f"${float(prod['precio']):,}", font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=3, padx=10, sticky="w")
            
            # Stock Color
            stock_color = COLORS["danger"] if prod['stock'] < 5 else COLORS["text_light"]
            ctk.CTkLabel(row_frame, text=str(prod['stock']), font=FONTS["body_bold"], text_color=stock_color).grid(row=0, column=4, padx=10, sticky="w")
            
            # Status Color
            status_color = COLORS["success"] if prod['estado'] == "ACTIVO" else COLORS["danger"]
            ctk.CTkLabel(row_frame, text=prod['estado'], font=FONTS["body_bold"], text_color=status_color).grid(row=0, column=5, padx=10, sticky="w")
            
            # Actions Frame
            actions_frame = ctk.CTkFrame(row_frame, fg_color="transparent")
            actions_frame.grid(row=0, column=6, padx=10, sticky="w")
            
            action_btn = ctk.CTkButton(actions_frame, text="Cambiar", width=70, height=28,
                                       fg_color=COLORS["tertiary_light"], border_width=1, border_color=COLORS["quaternary"],
                                       command=lambda p_id=prod['id'], est=prod['estado']: self.toggle_status(p_id, est))
            action_btn.pack(side="left", padx=(0, 5))
            
            delete_btn = ctk.CTkButton(actions_frame, text="Eliminar", width=70, height=28,
                                       fg_color=COLORS["danger"], text_color=COLORS["text_light"], hover_color="#b71c1c",
                                       command=lambda p_id=prod['id']: self.delete_product(p_id))
            delete_btn.pack(side="left")

    def delete_product(self, product_id):
        query = "DELETE FROM producto WHERE id = %s"
        db.execute(query, (product_id,))
        self.load_products()

    def toggle_status(self, product_id, current_status):
        new_status = "INACTIVO" if current_status == "ACTIVO" else "ACTIVO"
        query = "UPDATE producto SET estado = %s WHERE id = %s"
        db.execute(query, (new_status, product_id))
        self.load_products()

    def open_add_product_modal(self):
        modal = ctk.CTkToplevel(self)
        modal.title("Nuevo Producto")
        modal.geometry("400x500")
        modal.configure(fg_color=COLORS["background_dark"])
        modal.grab_set() # Modal behavior
        
        # Ensure categories exist, if not, create a default one
        categories = db.fetch_all("SELECT id, nombre FROM categoria")
        if not categories:
            db.execute("INSERT INTO categoria (nombre, descripcion) VALUES ('General', 'Categoría General')")
            categories = db.fetch_all("SELECT id, nombre FROM categoria")
            
        cat_options = [c["nombre"] for c in categories]
        cat_map = {c["nombre"]: c["id"] for c in categories}
        
        ctk.CTkLabel(modal, text="Agregar Producto", font=FONTS["h2"]).pack(pady=20)
        
        nombre_entry = ctk.CTkEntry(modal, placeholder_text="Nombre del Producto", width=300)
        nombre_entry.pack(pady=10)
        
        desc_entry = ctk.CTkEntry(modal, placeholder_text="Descripción", width=300)
        desc_entry.pack(pady=10)
        
        precio_entry = ctk.CTkEntry(modal, placeholder_text="Precio", width=300)
        precio_entry.pack(pady=10)
        
        stock_entry = ctk.CTkEntry(modal, placeholder_text="Stock Inicial", width=300)
        stock_entry.pack(pady=10)
        
        cat_dropdown = ctk.CTkComboBox(modal, values=cat_options, width=300)
        cat_dropdown.pack(pady=10)
        
        error_lbl = ctk.CTkLabel(modal, text="", text_color=COLORS["danger"])
        error_lbl.pack()
        
        def save_product():
            nombre = nombre_entry.get().strip()
            desc = desc_entry.get().strip()
            try:
                precio = float(precio_entry.get().strip())
                stock = int(stock_entry.get().strip())
            except ValueError:
                error_lbl.configure(text="Precio y Stock deben ser números.")
                return
                
            if not nombre:
                error_lbl.configure(text="El nombre es obligatorio.")
                return
                
            cat_id = cat_map[cat_dropdown.get()]
            
            query = """
            INSERT INTO producto (categoriaId, nombre, descripcion, precio, stock, estado)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            db.execute(query, (cat_id, nombre, desc, precio, stock, 'ACTIVO'))
            self.load_products()
            modal.destroy()
            
        save_btn = ctk.CTkButton(modal, text="Guardar Producto", fg_color=COLORS["primary"], text_color=COLORS["text_dark"], command=save_product)
        save_btn.pack(pady=20)
