import customtkinter as ctk
from database import db
from config import COLORS, FONTS

class DashboardView(ctk.CTkFrame):
    def __init__(self, master):
        super().__init__(master, fg_color=COLORS["background_dark"])
        
        self.pack(fill="both", expand=True, padx=20, pady=20)
        
        # Title
        self.title = ctk.CTkLabel(self, text="Dashboard General", font=FONTS["h1"], text_color=COLORS["text_light"])
        self.title.pack(anchor="w", pady=(0, 20))
        
        # Cards Frame
        self.cards_frame = ctk.CTkFrame(self, fg_color="transparent")
        self.cards_frame.pack(fill="x", pady=10)
        self.cards_frame.grid_columnconfigure((0, 1, 2, 3), weight=1)
        
        # Fetch stats
        stats = self.get_stats()
        
        # Create Cards
        self.create_stat_card(self.cards_frame, "Usuarios Totales", stats["users"], 0, COLORS["primary"])
        self.create_stat_card(self.cards_frame, "Productos Activos", stats["products"], 1, COLORS["secondary"])
        self.create_stat_card(self.cards_frame, "Pedidos Recibidos", stats["orders"], 2, "#4CAF50") # Custom green
        self.create_stat_card(self.cards_frame, "Ingresos Totales", f"${stats['revenue']:,}", 3, "#2196F3") # Custom blue
        
        # Recent Orders Frame
        self.recent_orders_frame = ctk.CTkFrame(self, fg_color=COLORS["tertiary"], corner_radius=10)
        self.recent_orders_frame.pack(fill="both", expand=True, pady=20)
        
        self.recent_title = ctk.CTkLabel(self.recent_orders_frame, text="Pedidos Recientes", font=FONTS["h2"], text_color=COLORS["text_light"])
        self.recent_title.pack(anchor="w", padx=20, pady=20)
        
        self.setup_recent_orders_table()

    def get_stats(self):
        stats = {"users": 0, "products": 0, "orders": 0, "revenue": 0.0}
        
        users_count = db.fetch_one("SELECT COUNT(*) as count FROM usuario WHERE estado = 'ACTIVO'")
        if users_count: stats["users"] = users_count["count"]
        
        products_count = db.fetch_one("SELECT COUNT(*) as count FROM producto WHERE estado = 'ACTIVO'")
        if products_count: stats["products"] = products_count["count"]
        
        orders_count = db.fetch_one("SELECT COUNT(*) as count FROM pedido")
        if orders_count: stats["orders"] = orders_count["count"]
        
        revenue_sum = db.fetch_one("SELECT SUM(total) as total FROM pedido WHERE estado = 'ENTREGADO' OR estado = 'ENVIADO'")
        if revenue_sum and revenue_sum["total"]: stats["revenue"] = float(revenue_sum["total"])
        
        return stats

    def create_stat_card(self, parent, title, value, col, accent_color):
        card = ctk.CTkFrame(parent, fg_color=COLORS["tertiary"], corner_radius=10)
        card.grid(row=0, column=col, padx=10, sticky="ew")
        
        accent_bar = ctk.CTkFrame(card, fg_color=accent_color, height=5)
        accent_bar.pack(fill="x", side="top")
        
        content = ctk.CTkFrame(card, fg_color="transparent")
        content.pack(fill="both", expand=True, padx=20, pady=20)
        
        title_label = ctk.CTkLabel(content, text=title, font=FONTS["body"], text_color=COLORS["quaternary"])
        title_label.pack(anchor="w")
        
        value_label = ctk.CTkLabel(content, text=str(value), font=FONTS["h1"], text_color=COLORS["text_light"])
        value_label.pack(anchor="w", pady=(5, 0))

    def setup_recent_orders_table(self):
        # Table Header
        header_frame = ctk.CTkFrame(self.recent_orders_frame, fg_color=COLORS["tertiary_light"])
        header_frame.pack(fill="x", padx=20, pady=(0, 10))
        header_frame.grid_columnconfigure((0, 1, 2, 3), weight=1)
        
        headers = ["ID Pedido", "Usuario ID", "Estado", "Total"]
        for i, text in enumerate(headers):
            lbl = ctk.CTkLabel(header_frame, text=text, font=FONTS["body_bold"], text_color=COLORS["text_light"])
            lbl.grid(row=0, column=i, pady=10, padx=10, sticky="w")
            
        # Fetch 5 recent orders
        orders = db.fetch_all("SELECT id, usuarioId, estado, total FROM pedido ORDER BY fechaPedido DESC LIMIT 5")
        
        for idx, order in enumerate(orders):
            row_frame = ctk.CTkFrame(self.recent_orders_frame, fg_color="transparent")
            row_frame.pack(fill="x", padx=20, pady=5)
            row_frame.grid_columnconfigure((0, 1, 2, 3), weight=1)
            
            ctk.CTkLabel(row_frame, text=f"#{order['id']}", font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=0, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=str(order['usuarioId']), font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=1, padx=10, sticky="w")
            
            # Status colors
            status_color = COLORS["text_light"]
            if order["estado"] == "PENDIENTE": status_color = COLORS["primary"]
            elif order["estado"] == "ENVIADO": status_color = COLORS["secondary"]
            elif order["estado"] == "ENTREGADO": status_color = COLORS["success"]
            
            ctk.CTkLabel(row_frame, text=order['estado'], font=FONTS["body_bold"], text_color=status_color).grid(row=0, column=2, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=f"${float(order['total']):,}", font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=3, padx=10, sticky="w")
