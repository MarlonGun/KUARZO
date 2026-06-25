import os
import customtkinter as ctk
from PIL import Image
try:
    import matplotlib.pyplot as plt
    from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
    MATPLOTLIB_AVAILABLE = True
except ImportError:
    MATPLOTLIB_AVAILABLE = False
from config import THEME_COLORS, FONTS, LOGO_PATH
from mock_store import mock_db
from database import db_helper
from api_client import api_client

# Import tabs (to be created next)
from products_tab import ProductsTab
from orders_tab import OrdersTab
from users_tab import UsersTab
from contact_tab import ContactTab

class DashboardWindow(ctk.CTkFrame):
    def __init__(self, parent, user_info, connection_mode, on_logout):
        super().__init__(parent, fg_color=THEME_COLORS["dark_bg"])
        self.parent = parent
        self.user = user_info
        self.connection_mode = connection_mode
        self.on_logout = on_logout
        
        self.pack(fill="both", expand=True)

        # Active tab mapping
        self.tabs = {}
        self.current_tab_name = None

        self.create_layout()

    def create_layout(self):
        # 1. Sidebar Frame
        self.sidebar = ctk.CTkFrame(
            self,
            width=220,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=0
        )
        self.sidebar.pack(side="left", fill="y")
        self.sidebar.pack_propagate(False)

        # Logo & App Title in Sidebar
        logo_container = ctk.CTkFrame(self.sidebar, fg_color="transparent")
        logo_container.pack(pady=25, fill="x", padx=10)

        try:
            if os.path.exists(LOGO_PATH):
                pil_img = Image.open(LOGO_PATH)
                logo_img = ctk.CTkImage(light_image=pil_img, dark_image=pil_img, size=(45, 45))
                logo_label = ctk.CTkLabel(logo_container, image=logo_img, text="")
                logo_label.pack(side="left", padx=(10, 10))
        except Exception:
            pass

        title_label = ctk.CTkLabel(
            logo_container,
            text="KUARZO",
            font=("Roboto", 18, "bold"),
            text_color=THEME_COLORS["primary"],
            anchor="w"
        )
        title_label.pack(side="left")

        # Sidebar Buttons
        self.btn_dashboard = self.create_sidebar_button("Dashboard", "dashboard", self.show_dashboard_tab)
        self.btn_products = self.create_sidebar_button("Productos", "shopping-bag", self.show_products_tab)
        self.btn_orders = self.create_sidebar_button("Pedidos", "shopping-cart", self.show_orders_tab)
        self.btn_users = self.create_sidebar_button("Usuarios", "users", self.show_users_tab)
        self.btn_contacts = self.create_sidebar_button("Contacto", "message-circle", self.show_contacts_tab)
        
        # Logout button pinned to bottom
        logout_btn = ctk.CTkButton(
            self.sidebar,
            text="Cerrar Sesión",
            font=FONTS["body_bold"],
            fg_color="transparent",
            border_width=1,
            border_color=THEME_COLORS["accent_red"],
            text_color=THEME_COLORS["accent_red"],
            hover_color="#3a1111",
            height=40,
            command=self.handle_logout
        )
        logout_btn.pack(side="bottom", fill="x", padx=20, pady=25)

        # 2. Main Content Container
        self.content_container = ctk.CTkFrame(self, fg_color="transparent")
        self.content_container.pack(side="right", fill="both", expand=True)

        # 3. Header Frame inside Main Content
        self.header = ctk.CTkFrame(
            self.content_container,
            height=70,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=0
        )
        self.header.pack(side="top", fill="x")
        self.header.pack_propagate(False)

        # Header Details
        self.active_tab_title = ctk.CTkLabel(
            self.header,
            text="Dashboard",
            font=FONTS["title"],
            text_color=THEME_COLORS["text_primary"]
        )
        self.active_tab_title.pack(side="left", padx=25)

        # Admin Welcome & Connection Mode Badge
        badge_frame = ctk.CTkFrame(self.header, fg_color="transparent")
        badge_frame.pack(side="right", padx=25, fill="y")

        admin_name = f"{self.user.get('primerNombre', 'Admin')} {self.user.get('primerApellido', '')}".strip()
        user_label = ctk.CTkLabel(
            badge_frame,
            text=f"Hola, {admin_name}",
            font=FONTS["body_bold"],
            text_color=THEME_COLORS["text_primary"]
        )
        user_label.pack(side="top", pady=(12, 0), anchor="e")

        # Connection status color
        badge_color = THEME_COLORS["accent_green"] if self.connection_mode == "Simulación (Demo)" else (
            THEME_COLORS["accent_blue"] if self.connection_mode == "API de Railway" else THEME_COLORS["secondary"]
        )
        
        mode_badge = ctk.CTkFrame(
            badge_frame,
            fg_color=badge_color,
            height=20,
            corner_radius=10
        )
        mode_badge.pack(side="bottom", pady=(2, 10), anchor="e")
        mode_badge_lbl = ctk.CTkLabel(
            mode_badge,
            text=self.connection_mode.upper(),
            font=("Open Sans", 9, "bold"),
            text_color="#000000",
            padx=8
        )
        mode_badge_lbl.pack()

        # 4. Viewport Area (below header)
        self.viewport = ctk.CTkFrame(self.content_container, fg_color="transparent")
        self.viewport.pack(side="bottom", fill="both", expand=True, padx=25, pady=25)

        # Show default tab
        self.show_dashboard_tab()

    def create_sidebar_button(self, text, icon, command):
        btn = ctk.CTkButton(
            self.sidebar,
            text=f"  {text}",
            font=FONTS["header"],
            fg_color="transparent",
            text_color=THEME_COLORS["text_secondary"],
            hover_color=THEME_COLORS["border"],
            height=50,
            anchor="w",
            corner_radius=0,
            command=command
        )
        btn.pack(fill="x", pady=2)
        return btn

    def set_active_sidebar_button(self, active_btn):
        # Reset all
        for btn in [self.btn_dashboard, self.btn_products, self.btn_orders, self.btn_users, self.btn_contacts]:
            btn.configure(
                fg_color="transparent", 
                text_color=THEME_COLORS["text_secondary"]
            )
        # Set active
        active_btn.configure(
            fg_color=THEME_COLORS["border"], 
            text_color=THEME_COLORS["primary"]
        )

    def clear_viewport(self):
        for widget in self.viewport.winfo_children():
            widget.pack_forget()

    # --- DATA LOADER WRAPPER ---
    def load_data(self, target_type):
        """Loads data from the chosen connection mode."""
        if self.connection_mode == "Simulación (Demo)":
            if target_type == "stats": return mock_db.get_stats()
            if target_type == "products": return mock_db.get_products()
            if target_type == "orders": return mock_db.get_orders()
            if target_type == "users": return mock_db.get_users()
            if target_type == "categories": return [c["nombre"] for c in mock_db.categories]
            
        elif self.connection_mode == "API de Railway":
            if target_type == "stats":
                # API doesn't have aggregate stats, so compile from list endpoints
                prods_res = api_client.get_products()
                orders_res = api_client.get_orders()
                prods = prods_res.get("data", []) if prods_res.get("success") else []
                orders = orders_res.get("data", []) if orders_res.get("success") else []
                
                # Mock sales analytics since API doesn't compute it
                monthly_sales = {"Mayo": sum(float(o.get("total", 0)) for o in orders if o.get("estado") != "CANCELADO")}
                return {
                    "total_revenue": sum(float(o.get("total", 0)) for o in orders if o.get("estado") != "CANCELADO"),
                    "active_products": len([p for p in prods if p.get("estado") == "ACTIVO"]),
                    "total_orders": len(orders),
                    "total_users": 1, # api doesn't expose users list
                    "monthly_sales": monthly_sales,
                    "category_sales": {"Catálogo": sum(float(o.get("total", 0)) for o in orders if o.get("estado") != "CANCELADO")}
                }
            if target_type == "products":
                res = api_client.get_products()
                # Map fields if required
                return res.get("data", []) if res.get("success") else []
            if target_type == "orders":
                res = api_client.get_orders()
                return res.get("data", []) if res.get("success") else []
            if target_type == "users":
                res = api_client.get_users()
                return res.get("data", []) if res.get("success") else []
            if target_type == "categories":
                return ["Pulseras", "Cadenas", "Anillos", "Aretes", "Tobilleras"]

        elif self.connection_mode == "Base de Datos Local":
            if target_type == "stats": return db_helper.get_stats()
            if target_type == "products": return db_helper.get_products()
            if target_type == "orders": return db_helper.get_orders()
            if target_type == "users": return db_helper.get_users()
            if target_type == "categories": return [c["nombre"] for c in db_helper.get_categories()]
            
        return None

    # --- TAB NAVIGATION CONTROLLERS ---
    def show_dashboard_tab(self):
        self.active_tab_title.configure(text="Dashboard Principal")
        self.set_active_sidebar_button(self.btn_dashboard)
        self.clear_viewport()
        
        # Load Stats Data
        stats = self.load_data("stats")
        
        # Create Scrollable Frame for Dashboard Home
        scroll_frame = ctk.CTkScrollableFrame(self.viewport, fg_color="transparent")
        scroll_frame.pack(fill="both", expand=True)

        # 1. METRICS CARDS ROW
        cards_frame = ctk.CTkFrame(scroll_frame, fg_color="transparent")
        cards_frame.pack(fill="x", pady=(0, 20))
        
        # Configure columns grid
        cards_frame.columnconfigure((0, 1, 2, 3), weight=1, uniform="equal")

        # Total revenue card
        rev = stats["total_revenue"]
        self.create_metric_card(cards_frame, 0, "Ingresos Totales", f"${rev:,.0f} COP", THEME_COLORS["primary"])
        # Active products card
        self.create_metric_card(cards_frame, 1, "Productos Activos", str(stats["active_products"]), THEME_COLORS["secondary"])
        # Total orders card
        self.create_metric_card(cards_frame, 2, "Pedidos Totales", str(stats["total_orders"]), THEME_COLORS["accent_blue"])
        # Total users card
        self.create_metric_card(cards_frame, 3, "Usuarios Registrados", str(stats["total_users"]), THEME_COLORS["accent_green"])

        # 2. CHARTS AREA
        charts_frame = ctk.CTkFrame(scroll_frame, fg_color="transparent")
        charts_frame.pack(fill="x", pady=10)
        charts_frame.columnconfigure((0, 1), weight=1, uniform="equal")

        if MATPLOTLIB_AVAILABLE:
            # Matplotlib Plot configuration
            plt.style.use('dark_background')
            
            # Chart 1: Monthly Sales (Bar)
            fig_bar, ax_bar = plt.subplots(figsize=(5, 3), dpi=100)
            fig_bar.patch.set_facecolor(THEME_COLORS["card_bg"])
            ax_bar.set_facecolor(THEME_COLORS["card_bg"])
            
            months = list(stats["monthly_sales"].keys())
            sales = list(stats["monthly_sales"].values())
            
            ax_bar.bar(months, sales, color=THEME_COLORS["primary"], width=0.5)
            ax_bar.set_title("Ventas por Mes (COP)", color=THEME_COLORS["text_primary"], fontsize=10, fontweight="bold")
            ax_bar.tick_params(colors=THEME_COLORS["text_secondary"], labelsize=8)
            ax_bar.spines['top'].set_visible(False)
            ax_bar.spines['right'].set_visible(False)
            ax_bar.spines['left'].set_color(THEME_COLORS["border"])
            ax_bar.spines['bottom'].set_color(THEME_COLORS["border"])
            ax_bar.grid(axis='y', linestyle='--', alpha=0.3)
            fig_bar.tight_layout()

            card_chart1 = ctk.CTkFrame(charts_frame, fg_color=THEME_COLORS["card_bg"], border_color=THEME_COLORS["border"], border_width=1, corner_radius=10)
            card_chart1.grid(row=0, column=0, padx=10, sticky="nsew")
            canvas1 = FigureCanvasTkAgg(fig_bar, master=card_chart1)
            canvas1.draw()
            canvas1.get_tk_widget().pack(fill="both", expand=True, padx=10, pady=10)

            # Chart 2: Category distribution (Pie)
            fig_pie, ax_pie = plt.subplots(figsize=(5, 3), dpi=100)
            fig_pie.patch.set_facecolor(THEME_COLORS["card_bg"])
            ax_pie.set_facecolor(THEME_COLORS["card_bg"])
            
            cats = list(stats["category_sales"].keys())
            cat_vals = list(stats["category_sales"].values())
            
            if sum(cat_vals) > 0:
                colors = [THEME_COLORS["primary"], THEME_COLORS["secondary"], THEME_COLORS["accent_blue"], THEME_COLORS["accent_green"], "#FFCDD2"]
                ax_pie.pie(
                    cat_vals, 
                    labels=cats, 
                    autopct='%1.0f%%', 
                    colors=colors[:len(cats)], 
                    textprops={'color': THEME_COLORS["text_primary"], 'fontsize': 8},
                    startangle=90
                )
            else:
                ax_pie.text(0.5, 0.5, "Sin datos de ventas", ha="center", va="center", color=THEME_COLORS["text_secondary"])
                
            ax_pie.set_title("Ventas por Categoría", color=THEME_COLORS["text_primary"], fontsize=10, fontweight="bold")
            fig_pie.tight_layout()

            card_chart2 = ctk.CTkFrame(charts_frame, fg_color=THEME_COLORS["card_bg"], border_color=THEME_COLORS["border"], border_width=1, corner_radius=10)
            card_chart2.grid(row=0, column=1, padx=10, sticky="nsew")
            canvas2 = FigureCanvasTkAgg(fig_pie, master=card_chart2)
            canvas2.draw()
            canvas2.get_tk_widget().pack(fill="both", expand=True, padx=10, pady=10)

            # Close figures to release memory
            plt.close(fig_bar)
            plt.close(fig_pie)
        else:
            msg_frame = ctk.CTkFrame(charts_frame, fg_color=THEME_COLORS["card_bg"], border_color=THEME_COLORS["border"], border_width=1, corner_radius=10, height=200)
            msg_frame.grid(row=0, column=0, columnspan=2, padx=10, sticky="nsew")
            msg_frame.pack_propagate(False)
            ctk.CTkLabel(msg_frame, text="Las gráficas de análisis están deshabilitadas debido a restricciones de seguridad en este equipo.", font=FONTS["body"], text_color=THEME_COLORS["text_secondary"]).pack(expand=True)

        # 3. LOW INVENTORY WARNINGS
        self.create_low_inventory_table(scroll_frame)

    def create_metric_card(self, parent, col, title, value, border_color):
        card = ctk.CTkFrame(
            parent,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=10,
            height=100
        )
        card.grid(row=0, column=col, padx=10, sticky="nsew")
        card.pack_propagate(False)

        # Accent border on left
        accent = ctk.CTkFrame(card, width=5, fg_color=border_color)
        accent.pack(side="left", fill="y")

        lbl_title = ctk.CTkLabel(card, text=title, font=FONTS["small"], text_color=THEME_COLORS["text_secondary"])
        lbl_title.pack(anchor="w", padx=20, pady=(15, 5))

        lbl_val = ctk.CTkLabel(card, text=value, font=("Roboto", 22, "bold"), text_color=THEME_COLORS["text_primary"])
        lbl_val.pack(anchor="w", padx=20)

    def create_low_inventory_table(self, parent):
        frame = ctk.CTkFrame(
            parent,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=10
        )
        frame.pack(fill="x", padx=10, pady=25)

        # Alert header
        title_lbl = ctk.CTkLabel(
            frame,
            text="⚠️ ALERTA DE STOCK BAJO (Stock <= 5 unidades)",
            font=FONTS["subtitle"],
            text_color=THEME_COLORS["secondary"]
        )
        title_lbl.pack(anchor="w", padx=20, pady=(15, 10))

        # Fetch products
        prods = self.load_data("products")
        low_stock = [p for p in prods if int(p.get("stock", 0)) <= 5]

        if not low_stock:
            lbl = ctk.CTkLabel(
                frame, 
                text="Todos los productos se encuentran con inventario adecuado.",
                font=FONTS["body"],
                text_color=THEME_COLORS["text_secondary"]
            )
            lbl.pack(anchor="w", padx=20, pady=(0, 20))
            return

        # Table Header
        header = ctk.CTkFrame(frame, fg_color=THEME_COLORS["dark_bg"], height=35)
        header.pack(fill="x", padx=20, pady=5)
        header.pack_propagate(False)

        header.columnconfigure(0, weight=1, uniform="low")
        header.columnconfigure(1, weight=4, uniform="low")
        header.columnconfigure(2, weight=3, uniform="low")
        header.columnconfigure(3, weight=3, uniform="low")

        ctk.CTkLabel(header, text="PRODUCTO ID", font=FONTS["body_bold"], anchor="w").grid(row=0, column=0, padx=10, sticky="w")
        ctk.CTkLabel(header, text="NOMBRE", font=FONTS["body_bold"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")
        ctk.CTkLabel(header, text="CATEGORÍA", font=FONTS["body_bold"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")
        ctk.CTkLabel(header, text="STOCK DISPONIBLE", font=FONTS["body_bold"], anchor="e").grid(row=0, column=3, padx=20, sticky="e")

        # Table Rows
        for idx, p in enumerate(low_stock):
            base_bg = "#303030" if idx % 2 == 1 else "transparent"
            row = ctk.CTkFrame(frame, fg_color=base_bg, height=45, corner_radius=5)
            row.pack(fill="x", padx=20, pady=3)
            row.pack_propagate(False)

            row.columnconfigure(0, weight=1, uniform="low")
            row.columnconfigure(1, weight=4, uniform="low")
            row.columnconfigure(2, weight=3, uniform="low")
            row.columnconfigure(3, weight=3, uniform="low")

            ctk.CTkLabel(row, text=str(p["id"]), font=FONTS["body"], anchor="w").grid(row=0, column=0, padx=10, sticky="w")
            ctk.CTkLabel(row, text=p["nombre"], font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")
            
            cat_name = p.get("categoriaNombre") or p.get("categoria", {}).get("nombre", "General")
            ctk.CTkLabel(row, text=str(cat_name), font=FONTS["body"], text_color=THEME_COLORS["text_secondary"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")
            
            # Stock badge (red for 0, orange for <= 5)
            stock_val = int(p["stock"])
            badge_color = THEME_COLORS["accent_red"] if stock_val == 0 else THEME_COLORS["secondary"]
            badge_text = "AGOTADO 🚨" if stock_val == 0 else f"{stock_val} UDS ⚠️"
            
            badge_container = ctk.CTkFrame(row, fg_color="transparent")
            badge_container.grid(row=0, column=3, padx=20, sticky="e")
            
            badge = ctk.CTkFrame(badge_container, fg_color=badge_color, corner_radius=5)
            badge.pack(side="right")
            
            ctk.CTkLabel(badge, text=f" {badge_text} ", font=("Open Sans", 10, "bold"), text_color="#000000").pack(padx=8, pady=3)

    def show_products_tab(self):
        self.active_tab_title.configure(text="Gestión de Catálogo (Productos)")
        self.set_active_sidebar_button(self.btn_products)
        self.clear_viewport()
        
        # Load tab component dynamically
        ProductsTab(self.viewport, self.connection_mode, self.load_data)

    def show_orders_tab(self):
        self.active_tab_title.configure(text="Gestión de Pedidos")
        self.set_active_sidebar_button(self.btn_orders)
        self.clear_viewport()
        
        # Load tab component dynamically
        OrdersTab(self.viewport, self.connection_mode, self.load_data)

    def show_users_tab(self):
        self.active_tab_title.configure(text="Gestión de Usuarios y Roles")
        self.set_active_sidebar_button(self.btn_users)
        self.clear_viewport()
        
        # Load tab component dynamically
        UsersTab(self.viewport, self.connection_mode, self.load_data)

    def show_contacts_tab(self):
        self.active_tab_title.configure(text="Mensajes de Contacto")
        self.set_active_sidebar_button(self.btn_contacts)
        self.clear_viewport()
        
        # Load tab component dynamically
        ContactTab(self.viewport, self.connection_mode)

    def handle_logout(self):
        self.on_logout()
