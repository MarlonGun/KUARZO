import os
import customtkinter as ctk
from PIL import Image
from config import THEME_COLORS, FONTS, LOGO_PATH
from api_client import api_client
from database import db_helper
from mock_store import mock_db

class LoginWindow(ctk.CTkFrame):
    def __init__(self, parent, on_login_success):
        super().__init__(parent, fg_color=THEME_COLORS["dark_bg"])
        self.parent = parent
        self.on_login_success = on_login_success
        self.pack(fill="both", expand=True)

        # Main Layout
        self.create_widgets()

    def create_widgets(self):
        # Container frame to act as the "Card"
        card = ctk.CTkFrame(
            self,
            width=400,
            height=650,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=2,
            corner_radius=15
        )
        card.place(relx=0.5, rely=0.5, anchor="center")
        card.pack_propagate(False)

        # 1. Logo
        logo_frame = ctk.CTkFrame(card, fg_color="transparent")
        logo_frame.pack(pady=(40, 20), fill="x")
        
        try:
            if os.path.exists(LOGO_PATH):
                pil_img = Image.open(LOGO_PATH)
                logo_img = ctk.CTkImage(light_image=pil_img, dark_image=pil_img, size=(120, 120))
                logo_label = ctk.CTkLabel(logo_frame, image=logo_img, text="")
                logo_label.pack()
            else:
                logo_label = ctk.CTkLabel(
                    logo_frame, 
                    text="⚡ KUARZO ⚡", 
                    font=("Roboto", 28, "bold"), 
                    text_color=THEME_COLORS["primary"]
                )
                logo_label.pack()
        except Exception as e:
            print(f"Error loading logo: {e}")
            logo_label = ctk.CTkLabel(
                logo_frame, 
                text="⚡ KUARZO ⚡", 
                font=("Roboto", 28, "bold"), 
                text_color=THEME_COLORS["primary"]
            )
            logo_label.pack()

        # 2. Title
        title_label = ctk.CTkLabel(
            card,
            text="Panel Administrativo",
            font=FONTS["title"],
            text_color=THEME_COLORS["text_primary"]
        )
        title_label.pack(pady=(0, 10))

        subtitle_label = ctk.CTkLabel(
            card,
            text="Inicia sesión para controlar la tienda",
            font=FONTS["small"],
            text_color=THEME_COLORS["text_secondary"]
        )
        subtitle_label.pack(pady=(0, 25))

        # 3. Connection Mode Selector
        mode_label = ctk.CTkLabel(
            card,
            text="Modo de Conexión",
            font=FONTS["body_bold"],
            text_color=THEME_COLORS["text_secondary"],
            anchor="w"
        )
        mode_label.pack(fill="x", padx=40, pady=(0, 2))
        
        self.mode_var = ctk.StringVar(value="Simulación (Demo)")
        self.mode_selector = ctk.CTkComboBox(
            card,
            values=["Simulación (Demo)", "API de Railway", "Base de Datos Local"],
            variable=self.mode_var,
            font=FONTS["body"],
            fg_color=THEME_COLORS["dark_bg"],
            border_color=THEME_COLORS["border"],
            button_color=THEME_COLORS["primary"],
            button_hover_color=THEME_COLORS["primary_hover"],
            dropdown_fg_color=THEME_COLORS["card_bg"],
            dropdown_hover_color=THEME_COLORS["border"],
            dropdown_text_color=THEME_COLORS["text_primary"],
            height=38,
            command=self.update_helper_text
        )
        self.mode_selector.pack(fill="x", padx=40, pady=(0, 15))

        # 4. Email field
        email_label = ctk.CTkLabel(
            card,
            text="Correo electrónico",
            font=FONTS["body_bold"],
            text_color=THEME_COLORS["text_secondary"],
            anchor="w"
        )
        email_label.pack(fill="x", padx=40, pady=(0, 2))
        
        self.email_entry = ctk.CTkEntry(
            card,
            placeholder_text="ejemplo@kuarzo.com",
            font=FONTS["body"],
            fg_color=THEME_COLORS["dark_bg"],
            border_color=THEME_COLORS["border"],
            text_color=THEME_COLORS["text_primary"],
            placeholder_text_color="#666666",
            height=38
        )
        self.email_entry.pack(fill="x", padx=40, pady=(0, 15))
        # Default value for testing ease
        self.email_entry.insert(0, "admin@kuarzo.com")

        # 5. Password field
        pass_label = ctk.CTkLabel(
            card,
            text="Contraseña",
            font=FONTS["body_bold"],
            text_color=THEME_COLORS["text_secondary"],
            anchor="w"
        )
        pass_label.pack(fill="x", padx=40, pady=(0, 2))

        self.pass_entry = ctk.CTkEntry(
            card,
            placeholder_text="Ingresa tu contraseña",
            show="*",
            font=FONTS["body"],
            fg_color=THEME_COLORS["dark_bg"],
            border_color=THEME_COLORS["border"],
            text_color=THEME_COLORS["text_primary"],
            placeholder_text_color="#666666",
            height=38
        )
        self.pass_entry.pack(fill="x", padx=40, pady=(0, 5))
        self.pass_entry.insert(0, "admin")

        # Helper note label
        self.helper_lbl = ctk.CTkLabel(
            card,
            text="💡 Demo: admin@kuarzo.com / admin",
            font=FONTS["small"],
            text_color=THEME_COLORS["primary"],
            wraplength=320
        )
        self.helper_lbl.pack(pady=(5, 0))

        # 6. Error message
        self.error_label = ctk.CTkLabel(
            card,
            text="",
            font=FONTS["small"],
            text_color=THEME_COLORS["accent_red"],
            wraplength=320
        )
        self.error_label.pack(pady=2)

        # 7. Login button
        self.login_btn = ctk.CTkButton(
            card,
            text="INICIAR SESIÓN",
            font=FONTS["body_bold"],
            fg_color=THEME_COLORS["primary"],
            hover_color=THEME_COLORS["primary_hover"],
            text_color="#000000",  # Dark text on gold button
            height=45,
            corner_radius=8,
            command=self.handle_login
        )
        self.login_btn.pack(fill="x", padx=40, pady=(10, 20))

    def handle_login(self):
        email = self.email_entry.get().strip()
        password = self.pass_entry.get()
        mode = self.mode_var.get()

        if not email or not password:
            self.show_error("Por favor completa todos los campos.")
            return

        self.set_loading_state(True)
        self.error_label.configure(text="")

        # Allow UI to refresh and show loading indicator
        self.parent.after(100, lambda: self.perform_auth(email, password, mode))

    def perform_auth(self, email, password, mode):
        auth_res = None
        
        if mode == "Simulación (Demo)":
            auth_res = mock_db.authenticate(email, password)
            
        elif mode == "API de Railway":
            auth_res = api_client.login(email, password)
            
        elif mode == "Base de Datos Local":
            # Test direct connection
            if not db_helper.connect():
                self.show_error("No se pudo conectar a la Base de Datos Local MySQL en localhost:3306. Asegúrate de que XAMPP esté activo e importaste kuarzo_db.sql.")
                self.set_loading_state(False)
                return
            auth_res = db_helper.authenticate(email, password)

        if auth_res and auth_res.get("success"):
            # Fire callback on parent
            self.on_login_success(auth_res.get("user"), mode, auth_res.get("token"))
        else:
            error_msg = auth_res.get("error", "Error desconocido de autenticación.") if auth_res else "Modo de conexión no soportado."
            self.show_error(error_msg)
            self.set_loading_state(False)

    def show_error(self, message):
        self.error_label.configure(text=message)

    def update_helper_text(self, mode):
        if mode == "Simulación (Demo)":
            self.helper_lbl.configure(text="💡 Demo: admin@kuarzo.com / admin", text_color=THEME_COLORS["primary"])
            self.email_entry.delete(0, "end")
            self.email_entry.insert(0, "admin@kuarzo.com")
            self.pass_entry.delete(0, "end")
            self.pass_entry.insert(0, "admin")
        elif mode == "Base de Datos Local":
            self.helper_lbl.configure(text="💡 Local: Asegúrate de iniciar MySQL en XAMPP", text_color=THEME_COLORS["text_secondary"])
            self.email_entry.delete(0, "end")
            self.email_entry.insert(0, "admin@kuarzo.com")
            self.pass_entry.delete(0, "end")
            self.pass_entry.insert(0, "admin")
        elif mode == "API de Railway":
            self.helper_lbl.configure(text="💡 Railway: Ingresa tus credenciales del panel", text_color=THEME_COLORS["accent_blue"])
            self.email_entry.delete(0, "end")
            self.pass_entry.delete(0, "end")

    def set_loading_state(self, is_loading):
        if is_loading:
            self.login_btn.configure(state="disabled", text="CARGANDO...")
            self.email_entry.configure(state="disabled")
            self.pass_entry.configure(state="disabled")
            self.mode_selector.configure(state="disabled")
        else:
            self.login_btn.configure(state="normal", text="INICIAR SESIÓN")
            self.email_entry.configure(state="normal")
            self.pass_entry.configure(state="normal")
            self.mode_selector.configure(state="normal")
