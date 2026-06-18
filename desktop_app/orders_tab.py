import customtkinter as ctk
from config import THEME_COLORS, FONTS
from mock_store import mock_db
from database import db_helper
from api_client import api_client
import tkinter.messagebox as messagebox

class OrdersTab(ctk.CTkFrame):
    def __init__(self, parent, connection_mode, load_data_fn):
        super().__init__(parent, fg_color="transparent")
        self.parent = parent
        self.connection_mode = connection_mode
        self.load_data = load_data_fn
        self.selected_order = None
        self.pack(fill="both", expand=True)

        self.create_widgets()
        self.refresh_orders()

    def create_widgets(self):
        # Configuration of 2 columns: Column 0 (Orders Table - 60%), Column 1 (Order Details - 40%)
        self.columnconfigure(0, weight=6, uniform="equal")
        self.columnconfigure(1, weight=4, uniform="equal")
        self.rowconfigure(0, weight=1)

        # 1. Left Side: Orders Table Frame
        table_container = ctk.CTkFrame(
            self,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=10
        )
        table_container.grid(row=0, column=0, padx=(0, 10), sticky="nsew")
        
        # Scrollable table container
        self.scroll_table = ctk.CTkScrollableFrame(table_container, fg_color="transparent")
        self.scroll_table.pack(fill="both", expand=True, padx=10, pady=10)

        # 2. Right Side: Order Details Panel
        self.details_container = ctk.CTkFrame(
            self,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=10
        )
        self.details_container.grid(row=0, column=1, padx=(10, 0), sticky="nsew")
        self.details_container.pack_propagate(False)

        # Placeholder label when no order is selected
        self.placeholder_lbl = ctk.CTkLabel(
            self.details_container,
            text="Selecciona un pedido de la lista\npara ver el desglose y gestionarlo.",
            font=FONTS["body"],
            text_color=THEME_COLORS["text_secondary"]
        )
        self.placeholder_lbl.place(relx=0.5, rely=0.5, anchor="center")

    def refresh_orders(self):
        # Clear existing rows
        for widget in self.scroll_table.winfo_children():
            widget.destroy()

        # Load orders
        orders = self.load_data("orders")

        # Create Table Headers
        headers_frame = ctk.CTkFrame(self.scroll_table, fg_color=THEME_COLORS["dark_bg"], height=35)
        headers_frame.pack(fill="x", pady=(0, 8))
        headers_frame.pack_propagate(False)

        # Configure columns grid for headers (aligned dynamically)
        headers_frame.columnconfigure(0, weight=1, uniform="o")
        headers_frame.columnconfigure(1, weight=3, uniform="o")
        headers_frame.columnconfigure(2, weight=3, uniform="o")
        headers_frame.columnconfigure(3, weight=2, uniform="o")
        headers_frame.columnconfigure(4, weight=2, uniform="o")

        ctk.CTkLabel(headers_frame, text="ID", font=FONTS["body_bold"], anchor="w").grid(row=0, column=0, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="CLIENTE", font=FONTS["body_bold"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="FECHA", font=FONTS["body_bold"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="ESTADO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=3, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="TOTAL", font=FONTS["body_bold"], anchor="e").grid(row=0, column=4, padx=15, sticky="e")

        if not orders:
            lbl = ctk.CTkLabel(
                self.scroll_table, 
                text="No hay pedidos registrados.", 
                font=FONTS["body"], 
                text_color=THEME_COLORS["text_secondary"]
            )
            lbl.pack(pady=40)
            return

        # Render Rows
        for idx, o in enumerate(orders):
            # Highlight selected row or normal zebra colors
            if self.selected_order and self.selected_order["id"] == o["id"]:
                bg_color = "#4a3d12"  # Subtle dark gold for selection
            else:
                bg_color = "#2e2e2e" if idx % 2 == 1 else "#232323"
            
            row = ctk.CTkFrame(
                self.scroll_table, 
                fg_color=bg_color, 
                height=52,
                corner_radius=6
            )
            row.pack(fill="x", pady=3)
            row.pack_propagate(False)

            # Configure columns grid for each row (perfect alignment!)
            row.columnconfigure(0, weight=1, uniform="o")
            row.columnconfigure(1, weight=3, uniform="o")
            row.columnconfigure(2, weight=3, uniform="o")
            row.columnconfigure(3, weight=2, uniform="o")
            row.columnconfigure(4, weight=2, uniform="o")

            # Bind click event to select the order
            row.bind("<Button-1>", lambda event, ord=o: self.select_order(ord))

            # ID
            lbl_id = ctk.CTkLabel(row, text=str(o["id"]), font=FONTS["body"], anchor="w")
            lbl_id.grid(row=0, column=0, padx=10, sticky="w")
            lbl_id.bind("<Button-1>", lambda event, ord=o: self.select_order(ord))

            # Customer Name
            name = o.get("clienteNombre") or "Comprador Kuarzo"
            lbl_name = ctk.CTkLabel(row, text=name, font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w")
            lbl_name.grid(row=0, column=1, padx=10, sticky="w")
            lbl_name.bind("<Button-1>", lambda event, ord=o: self.select_order(ord))

            # Date
            fecha = str(o.get("fechaPedido", ""))[:16] # Format string
            lbl_date = ctk.CTkLabel(row, text=fecha, font=FONTS["body"], text_color=THEME_COLORS["text_secondary"], anchor="w")
            lbl_date.grid(row=0, column=2, padx=10, sticky="w")
            lbl_date.bind("<Button-1>", lambda event, ord=o: self.select_order(ord))

            # Status Badge
            status_text = o.get("estado", "PENDIENTE")
            status_color = THEME_COLORS["accent_red"]
            if status_text == "PENDIENTE": status_color = THEME_COLORS["secondary"]
            elif status_text in ["ACEPTADO", "ENVIADO"]: status_color = THEME_COLORS["accent_blue"]
            elif status_text == "ENTREGADO": status_color = THEME_COLORS["accent_green"]

            badge = ctk.CTkFrame(row, fg_color=status_color, corner_radius=5, width=95, height=24)
            badge.grid(row=0, column=3, padx=5, sticky="w")
            badge.pack_propagate(False)
            badge.bind("<Button-1>", lambda event, ord=o: self.select_order(ord))
            
            badge_lbl = ctk.CTkLabel(badge, text=status_text, font=("Open Sans", 9, "bold"), text_color="#000000")
            badge_lbl.pack(fill="both", expand=True)
            badge_lbl.bind("<Button-1>", lambda event, ord=o: self.select_order(ord))

            # Total
            total_val = float(o.get("total", 0))
            lbl_total = ctk.CTkLabel(row, text=f"${total_val:,.0f}", font=FONTS["body_bold"], text_color=THEME_COLORS["primary"], anchor="e")
            lbl_total.grid(row=0, column=4, padx=15, sticky="e")
            lbl_total.bind("<Button-1>", lambda event, ord=o: self.select_order(ord))

    def select_order(self, order):
        self.selected_order = order
        self.refresh_orders() # Re-render table rows to update highlights
        
        # Hide placeholder
        self.placeholder_lbl.place_forget()
        
        # Clear details frame
        for widget in self.details_container.winfo_children():
            widget.destroy()

        # Build Details panel
        scroll_details = ctk.CTkScrollableFrame(self.details_container, fg_color="transparent")
        scroll_details.pack(fill="both", expand=True, padx=15, pady=15)

        # 1. Order ID Header
        title = ctk.CTkLabel(
            scroll_details,
            text=f"Pedido #{order['id']}",
            font=FONTS["subtitle"],
            text_color=THEME_COLORS["primary"],
            anchor="w"
        )
        title.pack(fill="x", pady=(0, 10))

        # 2. Customer Section
        ctk.CTkLabel(scroll_details, text="DATOS DEL CLIENTE", font=FONTS["small"], text_color=THEME_COLORS["text_secondary"], anchor="w").pack(fill="x", pady=(10, 2))
        
        cust_frame = ctk.CTkFrame(scroll_details, fg_color=THEME_COLORS["dark_bg"], corner_radius=5)
        cust_frame.pack(fill="x", pady=5)
        
        cust_name = order.get("clienteNombre") or "Comprador Kuarzo"
        ctk.CTkLabel(cust_frame, text=f"Nombre: {cust_name}", font=FONTS["body_bold"], anchor="w").pack(fill="x", padx=15, pady=(10, 2))
        
        cust_email = order.get("clienteCorreo") or "sin_correo@kuarzo.com"
        ctk.CTkLabel(cust_frame, text=f"Correo: {cust_email}", font=FONTS["body"], text_color=THEME_COLORS["text_secondary"], anchor="w").pack(fill="x", padx=15, pady=2)
        
        address = order.get("direccion") or "Entrega a convenir"
        ctk.CTkLabel(cust_frame, text=f"Dirección:\n{address}", font=FONTS["body"], text_color=THEME_COLORS["text_secondary"], justify="left", anchor="w", wraplength=280).pack(fill="x", padx=15, pady=(2, 10))

        # 3. Order Items Table
        ctk.CTkLabel(scroll_details, text="PRODUCTOS ADQUIRIDOS", font=FONTS["small"], text_color=THEME_COLORS["text_secondary"], anchor="w").pack(fill="x", pady=(15, 2))
        
        items = order.get("items", [])
        if items:
            for item in items:
                item_row = ctk.CTkFrame(scroll_details, fg_color="transparent")
                item_row.pack(fill="x", pady=5)
                
                # Format text
                qty = item.get("cantidad", 1)
                p_name = item.get("nombre") or f"Producto ID {item.get('productoId')}"
                price = float(item.get("precioUnitario", 0))
                subt = price * qty
                
                ctk.CTkLabel(item_row, text=f"{qty}x  {p_name}", font=FONTS["body"], anchor="w", width=180).pack(side="left")
                ctk.CTkLabel(item_row, text=f"${subt:,.0f}", font=FONTS["body_bold"], text_color=THEME_COLORS["primary"], anchor="e").pack(side="right")
        else:
            ctk.CTkLabel(scroll_details, text="No hay desglose de productos para este pedido.", font=FONTS["body"], text_color=THEME_COLORS["accent_red"]).pack(pady=10)

        # Separator line
        sep = ctk.CTkFrame(scroll_details, height=2, fg_color=THEME_COLORS["border"])
        sep.pack(fill="x", pady=15)

        # Summary Total
        total_frame = ctk.CTkFrame(scroll_details, fg_color="transparent")
        total_frame.pack(fill="x")
        ctk.CTkLabel(total_frame, text="TOTAL A COBRAR", font=FONTS["body_bold"], anchor="w").pack(side="left")
        
        total_val = float(order.get("total", 0))
        ctk.CTkLabel(total_frame, text=f"${total_val:,.0f} COP", font=FONTS["subtitle"], text_color=THEME_COLORS["secondary"], anchor="e").pack(side="right")

        # 4. Status Action Section
        status_text = order.get("estado", "PENDIENTE")
        ctk.CTkLabel(scroll_details, text=f"ESTADO ACTUAL: {status_text}", font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").pack(fill="x", pady=(25, 5))

        actions_frame = ctk.CTkFrame(scroll_details, fg_color="transparent")
        actions_frame.pack(fill="x", pady=10)

        if status_text == "PENDIENTE":
            # Show buttons Accept or Cancel
            accept_btn = ctk.CTkButton(
                actions_frame,
                text="Aceptar Pedido",
                font=FONTS["body_bold"],
                fg_color=THEME_COLORS["accent_green"],
                hover_color="#3e8e41",
                text_color="#000000",
                height=38,
                command=lambda: self.update_status("ENVIADO", "Pedido aceptado y marcado como listo para envío.")
            )
            accept_btn.pack(fill="x", pady=5)

            cancel_btn = ctk.CTkButton(
                actions_frame,
                text="Cancelar Pedido",
                font=FONTS["body_bold"],
                fg_color=THEME_COLORS["accent_red"],
                hover_color="#c0201a",
                text_color="#FFFFFF",
                height=38,
                command=lambda: self.update_status("CANCELADO", "¿Estás seguro de que deseas cancelar este pedido?")
            )
            cancel_btn.pack(fill="x", pady=5)

        elif status_text == "ENVIADO":
            # Show Deliver button or Cancel
            deliver_btn = ctk.CTkButton(
                actions_frame,
                text="Marcar como Entregado",
                font=FONTS["body_bold"],
                fg_color=THEME_COLORS["accent_green"],
                hover_color="#3e8e41",
                text_color="#000000",
                height=38,
                command=lambda: self.update_status("ENTREGADO", "Confirmar entrega exitosa del pedido.")
            )
            deliver_btn.pack(fill="x", pady=5)

            cancel_btn = ctk.CTkButton(
                actions_frame,
                text="Cancelar Pedido",
                font=FONTS["body_bold"],
                fg_color=THEME_COLORS["accent_red"],
                hover_color="#c0201a",
                text_color="#FFFFFF",
                height=38,
                command=lambda: self.update_status("CANCELADO", "¿Estás seguro de que deseas cancelar este pedido?")
            )
            cancel_btn.pack(fill="x", pady=5)

        elif status_text == "ENTREGADO":
            locked_lbl = ctk.CTkLabel(
                actions_frame,
                text="✓ Pedido Finalizado y Cobrado.",
                font=FONTS["body_bold"],
                text_color=THEME_COLORS["accent_green"]
            )
            locked_lbl.pack(pady=10)

        elif status_text == "CANCELADO":
            locked_lbl = ctk.CTkLabel(
                actions_frame,
                text="✕ Este pedido ha sido Cancelado.",
                font=FONTS["body_bold"],
                text_color=THEME_COLORS["accent_red"]
            )
            locked_lbl.pack(pady=10)

    def update_status(self, next_status, message):
        confirm = messagebox.askyesno("Confirmar Acción", message)
        if not confirm:
            return

        success = False
        order_id = self.selected_order["id"]

        if self.connection_mode == "Simulación (Demo)":
            success = mock_db.update_order_status(order_id, next_status)
            
        elif self.connection_mode == "API de Railway":
            res = api_client.update_order_status(order_id, next_status)
            success = res.get("success", False)
            if not success:
                messagebox.showerror("Error", f"Error API: {res.get('error')}")
                
        elif self.connection_mode == "Base de Datos Local":
            success = db_helper.update_order_status(order_id, next_status)

        if success:
            messagebox.showinfo("Éxito", f"Estado del pedido actualizado a {next_status} correctamente.")
            # Update local selection
            self.selected_order["estado"] = next_status
            self.refresh_orders()
            self.select_order(self.selected_order)
        else:
            messagebox.showerror("Error", "No se pudo actualizar el estado del pedido.")
