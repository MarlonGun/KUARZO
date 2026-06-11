import customtkinter as ctk
from config import THEME_COLORS, FONTS
from mock_store import mock_db
from database import db_helper
from api_client import api_client
import tkinter.messagebox as messagebox

class ProductsTab(ctk.CTkFrame):
    def __init__(self, parent, connection_mode, load_data_fn):
        super().__init__(parent, fg_color="transparent")
        self.parent = parent
        self.connection_mode = connection_mode
        self.load_data = load_data_fn
        self.pack(fill="both", expand=True)

        self.create_widgets()
        self.refresh_products()

    def create_widgets(self):
        # 1. Top Control Bar (Search, Filter, Add button)
        control_bar = ctk.CTkFrame(self, fg_color="transparent")
        control_bar.pack(fill="x", pady=(0, 20))

        # Search box
        self.search_entry = ctk.CTkEntry(
            control_bar,
            placeholder_text="Buscar producto...",
            font=FONTS["body"],
            width=250,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            height=40
        )
        self.search_entry.pack(side="left", padx=(0, 10))
        self.search_entry.bind("<KeyRelease>", lambda e: self.refresh_products())

        # Category filter dropdown
        categories = ["Todos"] + self.load_data("categories")
        self.cat_filter = ctk.CTkComboBox(
            control_bar,
            values=categories,
            font=FONTS["body"],
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            button_color=THEME_COLORS["primary"],
            button_hover_color=THEME_COLORS["primary_hover"],
            dropdown_fg_color=THEME_COLORS["card_bg"],
            dropdown_hover_color=THEME_COLORS["border"],
            height=40,
            command=lambda v: self.refresh_products()
        )
        self.cat_filter.pack(side="left", padx=10)

        # Add Product Button
        add_btn = ctk.CTkButton(
            control_bar,
            text="+ Añadir Producto",
            font=FONTS["body_bold"],
            fg_color=THEME_COLORS["primary"],
            hover_color=THEME_COLORS["primary_hover"],
            text_color="#000000",
            height=40,
            corner_radius=8,
            command=self.open_add_product_dialog
        )
        add_btn.pack(side="right")

        # 2. Table Container Frame
        self.table_frame = ctk.CTkFrame(
            self,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=10
        )
        self.table_frame.pack(fill="both", expand=True)

        # Table scroll wrapper
        self.scroll_table = ctk.CTkScrollableFrame(self.table_frame, fg_color="transparent")
        self.scroll_table.pack(fill="both", expand=True, padx=10, pady=10)

    def refresh_products(self):
        # Clear existing rows
        for widget in self.scroll_table.winfo_children():
            widget.destroy()

        query = self.search_entry.get().strip()
        category = self.cat_filter.get()

        # Load from chosen connection mode
        prods = []
        if self.connection_mode == "Simulación (Demo)":
            prods = mock_db.get_products(query, category)
        elif self.connection_mode == "API de Railway":
            # API query filtering locally for now since Express endpoint returns all
            all_prods = api_client.get_products().get("data", [])
            prods = all_prods
            if category and category != "Todos":
                prods = [p for p in prods if p.get("categoriaNombre") == category or p.get("categoria", {}).get("nombre") == category]
            if query:
                q = query.lower()
                prods = [p for p in prods if q in p.get("nombre", "").lower() or q in p.get("descripcion", "").lower()]
        elif self.connection_mode == "Base de Datos Local":
            prods = db_helper.get_products(query, category)

        # Create Table Headers
        headers_frame = ctk.CTkFrame(self.scroll_table, fg_color=THEME_COLORS["dark_bg"], height=35)
        headers_frame.pack(fill="x", pady=(0, 8))
        headers_frame.pack_propagate(False)

        # Configure columns grid for headers (makes them align perfectly!)
        headers_frame.columnconfigure(0, weight=1, uniform="p")
        headers_frame.columnconfigure(1, weight=4, uniform="p")
        headers_frame.columnconfigure(2, weight=2, uniform="p")
        headers_frame.columnconfigure(3, weight=2, uniform="p")
        headers_frame.columnconfigure(4, weight=2, uniform="p")
        headers_frame.columnconfigure(5, weight=3, uniform="p")

        ctk.CTkLabel(headers_frame, text="ID", font=FONTS["body_bold"], anchor="w").grid(row=0, column=0, padx=15, sticky="w")
        ctk.CTkLabel(headers_frame, text="NOMBRE", font=FONTS["body_bold"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="CATEGORÍA", font=FONTS["body_bold"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="PRECIO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=3, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="STOCK", font=FONTS["body_bold"], anchor="w").grid(row=0, column=4, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="ACCIONES", font=FONTS["body_bold"], anchor="e").grid(row=0, column=5, padx=25, sticky="e")

        if not prods:
            lbl = ctk.CTkLabel(
                self.scroll_table, 
                text="No se encontraron productos en el catálogo.", 
                font=FONTS["body"], 
                text_color=THEME_COLORS["text_secondary"]
            )
            lbl.pack(pady=40)
            return

        # Render Rows
        for idx, p in enumerate(prods):
            # Alternating background colors
            base_bg = "#2e2e2e" if idx % 2 == 1 else "#232323"
            
            # Highlight stock alert inside the row background softly
            stock_val = int(p.get("stock", 0))
            if stock_val == 0:
                base_bg = "#3a1515" # Soft dark red for out of stock
            elif stock_val <= 5:
                base_bg = "#3a2515" # Soft dark orange/brown for low stock
                
            row = ctk.CTkFrame(
                self.scroll_table, 
                fg_color=base_bg, 
                height=52,
                corner_radius=6
            )
            row.pack(fill="x", pady=3)
            row.pack_propagate(False)

            # Configure columns grid for each row (perfect vertical alignment!)
            row.columnconfigure(0, weight=1, uniform="p")
            row.columnconfigure(1, weight=4, uniform="p")
            row.columnconfigure(2, weight=2, uniform="p")
            row.columnconfigure(3, weight=2, uniform="p")
            row.columnconfigure(4, weight=2, uniform="p")
            row.columnconfigure(5, weight=3, uniform="p")

            # ID
            ctk.CTkLabel(row, text=str(p["id"]), font=FONTS["body"], anchor="w").grid(row=0, column=0, padx=15, sticky="w")
            
            # Name
            ctk.CTkLabel(row, text=p["nombre"], font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")
            
            # Category
            cat_name = p.get("categoriaNombre") or p.get("categoria", {}).get("nombre", "General")
            ctk.CTkLabel(row, text=str(cat_name), font=FONTS["body"], text_color=THEME_COLORS["text_secondary"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")
            
            # Price
            precio_val = float(p.get("precio", 0))
            ctk.CTkLabel(row, text=f"${precio_val:,.0f} COP", font=FONTS["body"], text_color=THEME_COLORS["primary"], anchor="w").grid(row=0, column=3, padx=10, sticky="w")
            
            # Stock badge
            stock_lbl = f"{stock_val} uds"
            stock_color = THEME_COLORS["text_primary"]
            if stock_val == 0:
                stock_color = THEME_COLORS["accent_red"]
                stock_lbl = "Agotado 🚨"
            elif stock_val <= 5:
                stock_color = THEME_COLORS["secondary"]
                stock_lbl = f"{stock_val} bajo ⚠️"

            ctk.CTkLabel(row, text=stock_lbl, font=FONTS["body_bold"], text_color=stock_color, anchor="w").grid(row=0, column=4, padx=10, sticky="w")

            # Actions buttons frame
            btn_frame = ctk.CTkFrame(row, fg_color="transparent")
            btn_frame.grid(row=0, column=5, padx=15, sticky="e")

            # Edit Button
            edit_btn = ctk.CTkButton(
                btn_frame,
                text="Editar",
                font=FONTS["small"],
                width=65,
                height=28,
                fg_color=THEME_COLORS["accent_blue"],
                hover_color="#1872b8",
                text_color="#FFFFFF",
                command=lambda prod=p: self.open_edit_product_dialog(prod)
            )
            edit_btn.pack(side="left", padx=3)

            # Delete Button
            del_btn = ctk.CTkButton(
                btn_frame,
                text="Eliminar",
                font=FONTS["small"],
                width=65,
                height=28,
                fg_color=THEME_COLORS["accent_red"],
                hover_color="#c0201a",
                text_color="#FFFFFF",
                command=lambda prod=p: self.confirm_delete_product(prod)
            )
            del_btn.pack(side="left", padx=3)

    # --- DIALOG FORMS ---
    def open_add_product_dialog(self):
        self.show_product_form(title="Añadir Nuevo Producto", callback=self.save_new_product)

    def open_edit_product_dialog(self, product):
        self.show_product_form(
            title="Editar Producto", 
            product_data=product, 
            callback=lambda d: self.save_edit_product(product["id"], d)
        )

    def show_product_form(self, title, product_data=None, callback=None):
        # Open Toplevel Window
        dialog = ctk.CTkToplevel(self)
        dialog.title(title)
        dialog.geometry("450x600")
        dialog.configure(fg_color=THEME_COLORS["card_bg"])
        dialog.transient(self) # Keep on top of main window
        dialog.grab_set() # Focus lock
        
        # Center the dialog
        dialog.update_idletasks()
        width = dialog.winfo_width()
        height = dialog.winfo_height()
        x = (dialog.winfo_screenwidth() // 2) - (width // 2)
        y = (dialog.winfo_screenheight() // 2) - (height // 2)
        dialog.geometry(f"+{x}+{y}")

        # Form layout
        title_lbl = ctk.CTkLabel(dialog, text=title, font=FONTS["subtitle"], text_color=THEME_COLORS["primary"])
        title_lbl.pack(pady=20)

        fields_frame = ctk.CTkFrame(dialog, fg_color="transparent")
        fields_frame.pack(fill="both", expand=True, padx=40)

        # 1. Name
        ctk.CTkLabel(fields_frame, text="Nombre del Producto *", font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").pack(fill="x", pady=(10, 2))
        name_entry = ctk.CTkEntry(fields_frame, font=FONTS["body"], fg_color=THEME_COLORS["dark_bg"], border_color=THEME_COLORS["border"])
        name_entry.pack(fill="x")

        # 2. Category
        categories = self.load_data("categories")
        ctk.CTkLabel(fields_frame, text="Categoría *", font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").pack(fill="x", pady=(10, 2))
        cat_combo = ctk.CTkComboBox(fields_frame, values=categories, font=FONTS["body"], fg_color=THEME_COLORS["dark_bg"], border_color=THEME_COLORS["border"], button_color=THEME_COLORS["primary"])
        cat_combo.pack(fill="x")

        # 3. Price
        ctk.CTkLabel(fields_frame, text="Precio (COP) *", font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").pack(fill="x", pady=(10, 2))
        price_entry = ctk.CTkEntry(fields_frame, font=FONTS["body"], fg_color=THEME_COLORS["dark_bg"], border_color=THEME_COLORS["border"], placeholder_text="ej: 45000")
        price_entry.pack(fill="x")

        # 4. Stock
        ctk.CTkLabel(fields_frame, text="Inventario (Stock) *", font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").pack(fill="x", pady=(10, 2))
        stock_entry = ctk.CTkEntry(fields_frame, font=FONTS["body"], fg_color=THEME_COLORS["dark_bg"], border_color=THEME_COLORS["border"], placeholder_text="ej: 10")
        stock_entry.pack(fill="x")

        # 5. Image URL
        ctk.CTkLabel(fields_frame, text="URL de la Imagen (Opcional)", font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").pack(fill="x", pady=(10, 2))
        img_entry = ctk.CTkEntry(fields_frame, font=FONTS["body"], fg_color=THEME_COLORS["dark_bg"], border_color=THEME_COLORS["border"], placeholder_text="ej: https://postimg.cc/...")
        img_entry.pack(fill="x")

        # 6. Description
        ctk.CTkLabel(fields_frame, text="Descripción", font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").pack(fill="x", pady=(10, 2))
        desc_entry = ctk.CTkEntry(fields_frame, font=FONTS["body"], fg_color=THEME_COLORS["dark_bg"], border_color=THEME_COLORS["border"])
        desc_entry.pack(fill="x")

        # Prepopulate if editing
        if product_data:
            name_entry.insert(0, product_data.get("nombre", ""))
            cat_combo.set(product_data.get("categoriaNombre") or product_data.get("categoria", {}).get("nombre") or "General")
            price_entry.insert(0, str(int(float(product_data.get("precio", 0)))))
            stock_entry.insert(0, str(product_data.get("stock", 0)))
            # Resolve image URL from either flat attribute or nested imagenes list
            img_url = product_data.get("imagen") or ""
            if not img_url and product_data.get("imagenes") and len(product_data.get("imagenes")) > 0:
                first_img = product_data.get("imagenes")[0]
                if isinstance(first_img, dict):
                    img_url = first_img.get("urlImagen") or first_img.get("imagenUrl") or ""
                elif isinstance(first_img, str):
                    img_url = first_img
            img_entry.insert(0, img_url)
            desc_entry.insert(0, product_data.get("descripcion") or "")

        # Save Action
        def on_save():
            name = name_entry.get().strip()
            category = cat_combo.get()
            price = price_entry.get().strip()
            stock = stock_entry.get().strip()
            image = img_entry.get().strip() or None
            desc = desc_entry.get().strip()

            # Validation
            if not name or not price or not stock:
                messagebox.showerror("Error", "Completa todos los campos obligatorios (*).", parent=dialog)
                return
            
            try:
                price_val = float(price)
                stock_val = int(stock)
                if price_val < 0 or stock_val < 0:
                    raise ValueError
            except ValueError:
                messagebox.showerror("Error", "El precio y el stock deben ser números positivos.", parent=dialog)
                return

            # Fire callback
            success = callback({
                "nombre": name,
                "categoriaNombre": category,
                "precio": price_val,
                "stock": stock_val,
                "imagen": image,
                "descripcion": desc
            })
            
            if success:
                dialog.destroy()
                self.refresh_products()

        # Submit button
        submit_btn = ctk.CTkButton(
            dialog,
            text="GUARDAR PRODUCTO",
            font=FONTS["body_bold"],
            fg_color=THEME_COLORS["primary"],
            hover_color=THEME_COLORS["primary_hover"],
            text_color="#000000",
            height=40,
            command=on_save
        )
        submit_btn.pack(pady=30)

    # --- SAVE OPERATIONS ---
    def save_new_product(self, data):
        if self.connection_mode == "Simulación (Demo)":
            mock_db.add_product(
                data["nombre"], data["descripcion"], data["precio"], 
                data["categoriaNombre"], data["stock"], data["imagen"]
            )
            messagebox.showinfo("Éxito", "Producto añadido exitosamente.")
            return True
            
        elif self.connection_mode == "API de Railway":
            res = api_client.add_product(
                data["nombre"], data["descripcion"], data["precio"], 
                data["categoriaNombre"], data["stock"], data["imagen"]
            )
            if res.get("success"):
                messagebox.showinfo("Éxito", "Producto añadido exitosamente en Railway.")
                return True
            messagebox.showerror("Error", f"Fallo al registrar producto en API: {res.get('error')}")
            return False
            
        elif self.connection_mode == "Base de Datos Local":
            success = db_helper.add_product(
                data["nombre"], data["descripcion"], data["precio"], 
                data["categoriaNombre"], data["stock"], data["imagen"]
            )
            if success:
                messagebox.showinfo("Éxito", "Producto añadido exitosamente en base de datos local.")
                return True
            messagebox.showerror("Error", "No se pudo registrar el producto en la DB.")
            return False

    def save_edit_product(self, prod_id, data):
        if self.connection_mode == "Simulación (Demo)":
            mock_db.edit_product(
                prod_id, data["nombre"], data["descripcion"], data["precio"], 
                data["categoriaNombre"], data["stock"], data["imagen"]
            )
            messagebox.showinfo("Éxito", "Producto modificado exitosamente.")
            return True
            
        elif self.connection_mode == "API de Railway":
            res = api_client.edit_product(
                prod_id, data["nombre"], data["descripcion"], data["precio"], 
                data["categoriaNombre"], data["stock"], data["imagen"]
            )
            if res.get("success"):
                messagebox.showinfo("Éxito", "Producto actualizado en Railway.")
                return True
            messagebox.showerror("Error", f"Fallo al actualizar producto en API: {res.get('error')}")
            return False
            
        elif self.connection_mode == "Base de Datos Local":
            success = db_helper.edit_product(
                prod_id, data["nombre"], data["descripcion"], data["precio"], 
                data["categoriaNombre"], data["stock"], data["imagen"]
            )
            if success:
                messagebox.showinfo("Éxito", "Producto actualizado en base de datos local.")
                return True
            messagebox.showerror("Error", "No se pudo actualizar el producto en la DB.")
            return False

    def confirm_delete_product(self, product):
        res = messagebox.askyesno(
            "Confirmar Eliminación", 
            f"¿Estás seguro de que deseas eliminar el producto '{product['nombre']}'?"
        )
        if res:
            success = False
            prod_id = product["id"]
            
            if self.connection_mode == "Simulación (Demo)":
                success = mock_db.delete_product(prod_id)
                
            elif self.connection_mode == "API de Railway":
                res_api = api_client.delete_product(prod_id)
                success = res_api.get("success", False)
                if not success:
                    messagebox.showerror("Error", f"Error API: {res_api.get('error')}")
                    
            elif self.connection_mode == "Base de Datos Local":
                success = db_helper.delete_product(prod_id)

            if success:
                messagebox.showinfo("Eliminado", "Producto eliminado/desactivado correctamente.")
                self.refresh_products()
            else:
                messagebox.showerror("Error", "No se pudo eliminar el producto.")
