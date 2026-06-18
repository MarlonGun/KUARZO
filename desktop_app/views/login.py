import customtkinter as ctk
import bcrypt
from PIL import Image
import os
from database import db
from config import COLORS, FONTS, LOGO_PATH

class LoginView(ctk.CTkFrame):
    def __init__(self, master, on_login_success):
        super().__init__(master, fg_color=COLORS["background_dark"])
        self.on_login_success = on_login_success
        
        self.pack(fill="both", expand=True)
        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(0, weight=1)
        
        # Login Card
        self.card = ctk.CTkFrame(self, fg_color=COLORS["tertiary"], corner_radius=15, width=400, height=500)
        self.card.grid(row=0, column=0, padx=20, pady=20)
        self.card.grid_propagate(False)
        self.card.pack_propagate(False)
        
        # Logo
        if os.path.exists(LOGO_PATH):
            logo_img = ctk.CTkImage(light_image=Image.open(LOGO_PATH),
                                    dark_image=Image.open(LOGO_PATH),
                                    size=(200, 60))
            self.logo_label = ctk.CTkLabel(self.card, image=logo_img, text="")
            self.logo_label.pack(pady=(40, 20))
        else:
            self.logo_label = ctk.CTkLabel(self.card, text="KUARZO", font=FONTS["h1"], text_color=COLORS["primary"])
            self.logo_label.pack(pady=(40, 20))
            
        self.title_label = ctk.CTkLabel(self.card, text="Panel Administrativo", font=FONTS["h2"], text_color=COLORS["text_light"])
        self.title_label.pack(pady=(0, 30))
        
        # Email Input
        self.email_entry = ctk.CTkEntry(self.card, placeholder_text="Correo Electrónico", 
                                        width=300, height=45, font=FONTS["body"], 
                                        fg_color=COLORS["tertiary_light"], border_color=COLORS["primary"])
        self.email_entry.pack(pady=(0, 15))
        
        # Password Input
        self.password_entry = ctk.CTkEntry(self.card, placeholder_text="Contraseña", show="*",
                                           width=300, height=45, font=FONTS["body"], 
                                           fg_color=COLORS["tertiary_light"], border_color=COLORS["primary"])
        self.password_entry.pack(pady=(0, 10))
        
        # Error Label
        self.error_label = ctk.CTkLabel(self.card, text="", text_color=COLORS["danger"], font=FONTS["small"])
        self.error_label.pack(pady=(0, 10))
        
        # Login Button
        self.login_btn = ctk.CTkButton(self.card, text="INGRESAR", 
                                       width=300, height=45, font=FONTS["body_bold"],
                                       fg_color=COLORS["primary"], hover_color=COLORS["primary_hover"],
                                       text_color=COLORS["text_dark"], command=self.attempt_login)
        self.login_btn.pack(pady=(10, 30))

    def attempt_login(self):
        email = self.email_entry.get().strip()
        password = self.password_entry.get().strip()
        
        if not email or not password:
            self.error_label.configure(text="Por favor ingrese correo y contraseña.")
            return
            
        # Get user from db
        user = db.fetch_one("SELECT * FROM usuario WHERE correo = %s", (email,))
        
        if not user:
            self.error_label.configure(text="Credenciales incorrectas.")
            return
            
        # Check if ADMINISTRADOR (rolId = 2)
        if user["rolId"] != 2:
            self.error_label.configure(text="Acceso denegado. No es administrador.")
            return
            
        # Verify password using bcrypt
        try:
            if bcrypt.checkpw(password.encode('utf-8'), user["contrasena"].encode('utf-8')):
                self.error_label.configure(text="")
                self.on_login_success(user)
            else:
                self.error_label.configure(text="Credenciales incorrectas.")
        except Exception as e:
            # Fallback for plain text password comparison if bcrypt fails 
            # (just in case they have plain text passwords in their dev db)
            if user["contrasena"] == password:
                self.error_label.configure(text="")
                self.on_login_success(user)
            else:
                self.error_label.configure(text="Credenciales incorrectas.")
