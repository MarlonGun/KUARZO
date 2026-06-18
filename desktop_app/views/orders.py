import customtkinter as ctk
from database import db
from config import COLORS, FONTS

class OrdersView(ctk.CTkFrame):
    def __init__(self, master):
        super().__init__(master, fg_color=COLORS["background_dark"])
        
        self.pack(fill="both", expand=True, padx=20, pady=20)
        
        # Header
        self.header_frame = ctk.CTkFrame(self, fg_color="transparent")
        self.header_frame.pack(fill="x", pady=(0, 20))
        
        self.title = ctk.CTkLabel(self.header_frame, text="Gestión de Pedidos", font=FONTS["h1"], text_color=COLORS["text_light"])
        self.title.pack(side="left")
        
        self.refresh_btn = ctk.CTkButton(self.header_frame, text="Actualizar", width=100, font=FONTS["body_bold"],
                                         fg_color=COLORS["primary"], hover_color=COLORS["primary_hover"],
                                         text_color=COLORS["text_dark"], command=self.load_orders)
        self.refresh_btn.pack(side="right")
        
        # Table Container
        self.table_container = ctk.CTkScrollableFrame(self, fg_color=COLORS["tertiary"], corner_radius=10)
        self.table_container.pack(fill="both", expand=True)
        
        self.load_orders()

    def load_orders(self):
        # Clear existing
        for widget in self.table_container.winfo_children():
            widget.destroy()
            
        # Table Header
        header_frame = ctk.CTkFrame(self.table_container, fg_color=COLORS["tertiary_light"])
        header_frame.pack(fill="x", pady=(0, 10))
        header_frame.grid_columnconfigure((0, 1, 2, 3, 4, 5, 6), weight=1)
        
        headers = ["ID Pedido", "Cliente", "Fecha", "Total", "Estado", "Avanzar Estado", "Acciones"]
        for i, text in enumerate(headers):
            lbl = ctk.CTkLabel(header_frame, text=text, font=FONTS["body_bold"], text_color=COLORS["text_light"])
            lbl.grid(row=0, column=i, pady=10, padx=10, sticky="w")
            
        # Fetch orders
        query = """
        SELECT p.id, p.fechaPedido, p.total, p.estado, u.primerNombre, u.primerApellido
        FROM pedido p
        JOIN usuario u ON p.usuarioId = u.id
        ORDER BY p.id DESC
        """
        orders = db.fetch_all(query)
        
        for idx, order in enumerate(orders):
            row_frame = ctk.CTkFrame(self.table_container, fg_color="transparent")
            row_frame.pack(fill="x", pady=5)
            row_frame.grid_columnconfigure((0, 1, 2, 3, 4, 5, 6), weight=1)
            
            ctk.CTkLabel(row_frame, text=f"#{order['id']}", font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=0, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=f"{order['primerNombre']} {order['primerApellido']}", font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=1, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=str(order['fechaPedido']).split()[0], font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=2, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=f"${float(order['total']):,}", font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=3, padx=10, sticky="w")
            
            # Status colors
            status_color = COLORS["text_light"]
            if order["estado"] == "PENDIENTE": status_color = COLORS["primary"]
            elif order["estado"] == "ENVIADO": status_color = COLORS["secondary"]
            elif order["estado"] == "ENTREGADO": status_color = COLORS["success"]
            elif order["estado"] == "CANCELADO": status_color = COLORS["danger"]
            
            ctk.CTkLabel(row_frame, text=order['estado'], font=FONTS["body_bold"], text_color=status_color).grid(row=0, column=4, padx=10, sticky="w")
            
            # Action: Advance Status
            if order['estado'] == "PENDIENTE":
                btn_text = "Marcar Enviado"
                next_state = "ENVIADO"
            elif order['estado'] == "ENVIADO":
                btn_text = "Marcar Entregado"
                next_state = "ENTREGADO"
            else:
                btn_text = ""
                next_state = None
                
            if next_state:
                advance_btn = ctk.CTkButton(row_frame, text=btn_text, width=120, height=28,
                                           fg_color=COLORS["primary"], text_color=COLORS["text_dark"],
                                           command=lambda o_id=order['id'], ns=next_state: self.change_status(o_id, ns))
                advance_btn.grid(row=0, column=5, padx=10, sticky="w")
            
            # Actions: Cancel and Delete Frame
            actions_frame = ctk.CTkFrame(row_frame, fg_color="transparent")
            actions_frame.grid(row=0, column=6, padx=10, sticky="w")

            if order['estado'] in ["PENDIENTE", "ENVIADO"]:
                cancel_btn = ctk.CTkButton(actions_frame, text="Cancelar", width=70, height=28,
                                           fg_color=COLORS["secondary"], text_color=COLORS["text_light"],
                                           command=lambda o_id=order['id']: self.change_status(o_id, "CANCELADO"))
                cancel_btn.pack(side="left", padx=(0, 5))
                
            delete_btn = ctk.CTkButton(actions_frame, text="Eliminar", width=70, height=28,
                                       fg_color=COLORS["danger"], text_color=COLORS["text_light"], hover_color="#b71c1c",
                                       command=lambda o_id=order['id']: self.delete_order(o_id))
            delete_btn.pack(side="left")

    def delete_order(self, order_id):
        query = "DELETE FROM pedido WHERE id = %s"
        db.execute(query, (order_id,))
        self.load_orders()

    def change_status(self, order_id, new_status):
        query = "UPDATE pedido SET estado = %s WHERE id = %s"
        db.execute(query, (new_status, order_id))
        self.load_orders()
