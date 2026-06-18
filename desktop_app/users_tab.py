import customtkinter as ctk
from config import THEME_COLORS, FONTS
from mock_store import mock_db
from database import db_helper
from api_client import api_client
import tkinter.messagebox as messagebox

class UsersTab(ctk.CTkFrame):
    def __init__(self, parent, connection_mode, load_data_fn):
        super().__init__(parent, fg_color="transparent")
        self.parent = parent
        self.connection_mode = connection_mode
        self.load_data = load_data_fn
        self.pack(fill="both", expand=True)

        self.create_widgets()
        self.refresh_users()

    def create_widgets(self):
        # 1. Search Bar
        control_bar = ctk.CTkFrame(self, fg_color="transparent")
        control_bar.pack(fill="x", pady=(0, 20))

        self.search_entry = ctk.CTkEntry(
            control_bar,
            placeholder_text="Buscar usuario por nombre o correo...",
            font=FONTS["body"],
            width=350,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            height=40
        )
        self.search_entry.pack(side="left")
        self.search_entry.bind("<KeyRelease>", lambda e: self.refresh_users())

        # Connection Mode Indicator Label
        if self.connection_mode == "API de Railway":
            lbl_info = ctk.CTkLabel(
                control_bar,
                text="ℹ️ Pestaña limitada en modo API (API pública no expone usuarios por privacidad)",
                font=FONTS["small"],
                text_color=THEME_COLORS["secondary"]
            )
            lbl_info.pack(side="right", padx=10)

        # 2. Table Container
        self.table_frame = ctk.CTkFrame(
            self,
            fg_color=THEME_COLORS["card_bg"],
            border_color=THEME_COLORS["border"],
            border_width=1,
            corner_radius=10
        )
        self.table_frame.pack(fill="both", expand=True)

        self.scroll_table = ctk.CTkScrollableFrame(self.table_frame, fg_color="transparent")
        self.scroll_table.pack(fill="both", expand=True, padx=10, pady=10)

    def refresh_users(self):
        for widget in self.scroll_table.winfo_children():
            widget.destroy()

        query = self.search_entry.get().strip().lower()

        # Load users
        users = self.load_data("users")
        
        # Apply search query filtering locally
        if query:
            users = [
                u for u in users 
                if query in u.get("primerNombre", "").lower() 
                or query in u.get("primerApellido", "").lower()
                or query in u.get("correo", "").lower()
            ]

        # Table Headers
        headers_frame = ctk.CTkFrame(self.scroll_table, fg_color=THEME_COLORS["dark_bg"], height=35)
        headers_frame.pack(fill="x", pady=(0, 8))
        headers_frame.pack_propagate(False)

        # Configure columns grid for headers (aligned dynamically)
        headers_frame.columnconfigure(0, weight=1, uniform="u")
        headers_frame.columnconfigure(1, weight=3, uniform="u")
        headers_frame.columnconfigure(2, weight=3, uniform="u")
        headers_frame.columnconfigure(3, weight=2, uniform="u")
        headers_frame.columnconfigure(4, weight=2, uniform="u")
        headers_frame.columnconfigure(5, weight=3, uniform="u")

        ctk.CTkLabel(headers_frame, text="ID", font=FONTS["body_bold"], anchor="w").grid(row=0, column=0, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="NOMBRE COMPLETO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="CORREO ELECTRÓNICO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="ROL", font=FONTS["body_bold"], anchor="w").grid(row=0, column=3, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="ESTADO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=4, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="ACCIONES", font=FONTS["body_bold"], anchor="e").grid(row=0, column=5, padx=25, sticky="e")

        if not users:
            lbl = ctk.CTkLabel(
                self.scroll_table, 
                text="No se encontraron usuarios.", 
                font=FONTS["body"], 
                text_color=THEME_COLORS["text_secondary"]
            )
            lbl.pack(pady=40)
            return

        for idx, u in enumerate(users):
            status = u.get("estado", "ACTIVO")
            
            # Alternating background colors
            if status == "INACTIVO":
                bg_color = "#3a1515"  # Soft dark red for blocked users
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
            row.columnconfigure(0, weight=1, uniform="u")
            row.columnconfigure(1, weight=3, uniform="u")
            row.columnconfigure(2, weight=3, uniform="u")
            row.columnconfigure(3, weight=2, uniform="u")
            row.columnconfigure(4, weight=2, uniform="u")
            row.columnconfigure(5, weight=3, uniform="u")

            # ID
            ctk.CTkLabel(row, text=str(u["id"]), font=FONTS["body"], anchor="w").grid(row=0, column=0, padx=10, sticky="w")

            # Full Name
            full_name = f"{u['primerNombre']} {u.get('segundoNombre') or ''} {u['primerApellido']} {u.get('segundoApellido') or ''}".replace("  ", " ").strip()
            ctk.CTkLabel(row, text=full_name, font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")

            # Email
            ctk.CTkLabel(row, text=u["correo"], font=FONTS["body"], text_color=THEME_COLORS["text_secondary"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")

            # Role Badge
            rol_text = u.get("rol", "COMPRADOR")
            badge_color = THEME_COLORS["primary"] if rol_text == "ADMINISTRADOR" else THEME_COLORS["border"]
            badge_txt_color = "#000000" if rol_text == "ADMINISTRADOR" else THEME_COLORS["text_primary"]
            
            badge = ctk.CTkFrame(row, fg_color=badge_color, corner_radius=5, width=95, height=24)
            badge.grid(row=0, column=3, padx=5, sticky="w")
            badge.pack_propagate(False)
            ctk.CTkLabel(badge, text=rol_text, font=("Open Sans", 8, "bold"), text_color=badge_txt_color).pack(fill="both", expand=True)

            # Status Indicator
            status_text = "Activo" if status == "ACTIVO" else "Bloqueado"
            status_color = THEME_COLORS["accent_green"] if status == "ACTIVO" else THEME_COLORS["accent_red"]
            
            lbl_status = ctk.CTkLabel(row, text=status_text, font=FONTS["body_bold"], text_color=status_color, anchor="w")
            lbl_status.grid(row=0, column=4, padx=10, sticky="w")

            # Action buttons
            btn_frame = ctk.CTkFrame(row, fg_color="transparent")
            btn_frame.grid(row=0, column=5, padx=15, sticky="e")

            # Don't allow self-blocking or self-demoting for safety
            is_self = (u["correo"] == "admin@kuarzo.com")

            # Toggle Status Button
            toggle_lbl = "Bloquear" if status == "ACTIVO" else "Activar"
            toggle_color = THEME_COLORS["accent_red"] if status == "ACTIVO" else THEME_COLORS["accent_green"]
            toggle_hover = "#c0201a" if status == "ACTIVO" else "#3e8e41"
            
            status_btn = ctk.CTkButton(
                btn_frame,
                text=toggle_lbl,
                font=FONTS["small"],
                width=80,
                height=28,
                fg_color=toggle_color,
                hover_color=toggle_hover,
                text_color="#FFFFFF" if status == "ACTIVO" else "#000000",
                state="disabled" if is_self or self.connection_mode == "API de Railway" else "normal",
                command=lambda user=u: self.toggle_user_status(user)
            )
            status_btn.pack(side="left", padx=3)

            # Toggle Role Button
            role_lbl = "Hacer Admin" if rol_text == "COMPRADOR" else "Quitar Admin"
            role_btn = ctk.CTkButton(
                btn_frame,
                text=role_lbl,
                font=FONTS["small"],
                width=90,
                height=28,
                fg_color=THEME_COLORS["secondary"],
                hover_color=THEME_COLORS["secondary_hover"],
                text_color="#FFFFFF",
                state="disabled" if is_self or self.connection_mode == "API de Railway" else "normal",
                command=lambda user=u: self.toggle_user_role(user)
            )
            role_btn.pack(side="left", padx=3)

    def toggle_user_status(self, user):
        next_status = "INACTIVO" if user["estado"] == "ACTIVO" else "ACTIVO"
        confirm = messagebox.askyesno(
            "Confirmar Cambio de Estado", 
            f"¿Estás seguro de que deseas {'BLOQUEAR' if next_status == 'INACTIVO' else 'ACTIVAR'} al usuario {user['primerNombre']}?"
        )
        if not confirm:
            return

        success = False
        user_id = user["id"]

        if self.connection_mode == "Simulación (Demo)":
            success = mock_db.update_user_status(user_id, next_status)
        elif self.connection_mode == "Base de Datos Local":
            success = db_helper.update_user_status(user_id, next_status)

        if success:
            messagebox.showinfo("Éxito", f"Usuario actualizado a {next_status} correctamente.")
            self.refresh_users()
        else:
            messagebox.showerror("Error", "No se pudo actualizar el estado del usuario.")

    def toggle_user_role(self, user):
        is_buyer = (user.get("rol", "COMPRADOR") == "COMPRADOR")
        next_rol_name = "ADMINISTRADOR" if is_buyer else "COMPRADOR"
        next_rol_id = 2 if is_buyer else 1
        
        confirm = messagebox.askyesno(
            "Confirmar Cambio de Rol", 
            f"¿Estás seguro de que deseas promover a {next_rol_name} al usuario {user['primerNombre']}?"
        )
        if not confirm:
            return

        success = False
        user_id = user["id"]

        if self.connection_mode == "Simulación (Demo)":
            success = mock_db.update_user_role(user_id, next_rol_name, next_rol_id)
        elif self.connection_mode == "Base de Datos Local":
            success = db_helper.update_user_role(user_id, next_rol_name, next_rol_id)

        if success:
            messagebox.showinfo("Éxito", f"Rol de usuario cambiado a {next_rol_name} correctamente.")
            self.refresh_users()
        else:
            messagebox.showerror("Error", "No se pudo cambiar el rol del usuario.")
