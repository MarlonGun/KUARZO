import customtkinter as ctk
from config import THEME_COLORS, FONTS
from mock_store import mock_db
from api_client import api_client
from database import db_helper
import tkinter.messagebox as messagebox
from datetime import datetime

class ContactTab(ctk.CTkFrame):
    def __init__(self, parent, connection_mode):
        super().__init__(parent, fg_color="transparent")
        self.parent = parent
        self.connection_mode = connection_mode
        self.pack(fill="both", expand=True)

        self.create_widgets()
        self.refresh_contacts()

    def create_widgets(self):
        # 1. Title Bar
        control_bar = ctk.CTkFrame(self, fg_color="transparent")
        control_bar.pack(fill="x", pady=(0, 20))

        title = ctk.CTkLabel(
            control_bar,
            text="Mensajes de Contacto",
            font=FONTS["title"],
            text_color=THEME_COLORS["text_primary"]
        )
        title.pack(side="left")

        # Refresh Button
        btn_refresh = ctk.CTkButton(
            control_bar,
            text="Actualizar",
            font=FONTS["body_bold"],
            width=100,
            fg_color=THEME_COLORS["primary"],
            text_color="#000000",
            hover_color=THEME_COLORS["primary_hover"],
            command=self.refresh_contacts
        )
        btn_refresh.pack(side="right")

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

    def load_contacts(self):
        if self.connection_mode == "API de Railway":
            res = api_client.get_contacts()
            return res.get("data", []) if res.get("success") else []
        elif self.connection_mode == "Simulación (Demo)":
            return mock_db.get_contacts()
        elif self.connection_mode == "Base de Datos Local":
            # For brevity in local db, if it's not implemented just return []
            return []
        return []

    def refresh_contacts(self):
        for widget in self.scroll_table.winfo_children():
            widget.destroy()

        contacts = self.load_contacts()

        # Table Headers
        headers_frame = ctk.CTkFrame(self.scroll_table, fg_color=THEME_COLORS["dark_bg"], height=35)
        headers_frame.pack(fill="x", pady=(0, 8))
        headers_frame.pack_propagate(False)

        headers_frame.columnconfigure(0, weight=2, uniform="c")
        headers_frame.columnconfigure(1, weight=2, uniform="c")
        headers_frame.columnconfigure(2, weight=2, uniform="c")
        headers_frame.columnconfigure(3, weight=2, uniform="c")
        headers_frame.columnconfigure(4, weight=1, uniform="c")
        headers_frame.columnconfigure(5, weight=2, uniform="c")

        ctk.CTkLabel(headers_frame, text="FECHA", font=FONTS["body_bold"], anchor="w").grid(row=0, column=0, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="NOMBRE COMPLETO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="CORREO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="TELÉFONO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=3, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="ESTADO", font=FONTS["body_bold"], anchor="w").grid(row=0, column=4, padx=10, sticky="w")
        ctk.CTkLabel(headers_frame, text="ACCIONES", font=FONTS["body_bold"], anchor="e").grid(row=0, column=5, padx=25, sticky="e")

        if not contacts:
            lbl = ctk.CTkLabel(
                self.scroll_table, 
                text="No hay mensajes de contacto.", 
                font=FONTS["body"], 
                text_color=THEME_COLORS["text_secondary"]
            )
            lbl.pack(pady=40)
            return

        for idx, c in enumerate(contacts):
            bg_color = "#2e2e2e" if idx % 2 == 1 else "#232323"
            
            row = ctk.CTkFrame(
                self.scroll_table, 
                fg_color=bg_color, 
                height=52,
                corner_radius=6
            )
            row.pack(fill="x", pady=3)
            row.pack_propagate(False)

            row.columnconfigure(0, weight=2, uniform="c")
            row.columnconfigure(1, weight=2, uniform="c")
            row.columnconfigure(2, weight=2, uniform="c")
            row.columnconfigure(3, weight=2, uniform="c")
            row.columnconfigure(4, weight=1, uniform="c")
            row.columnconfigure(5, weight=2, uniform="c")

            # Date
            raw_date = c.get("createdAt", "")
            try:
                date_obj = datetime.strptime(raw_date[:19], "%Y-%m-%dT%H:%M:%S")
                date_str = date_obj.strftime("%d %b %Y, %H:%M")
            except:
                date_str = str(raw_date)[:10]
            ctk.CTkLabel(row, text=date_str, font=FONTS["body"], anchor="w").grid(row=0, column=0, padx=10, sticky="w")

            # Name
            full_name = f"{c.get('nombre','')} {c.get('apellido','')}".strip()
            ctk.CTkLabel(row, text=full_name, font=FONTS["body_bold"], text_color=THEME_COLORS["text_primary"], anchor="w").grid(row=0, column=1, padx=10, sticky="w")

            # Email
            ctk.CTkLabel(row, text=c.get("correo",""), font=FONTS["body"], text_color=THEME_COLORS["text_secondary"], anchor="w").grid(row=0, column=2, padx=10, sticky="w")

            # Phone
            ctk.CTkLabel(row, text=c.get("telefono",""), font=FONTS["body"], anchor="w").grid(row=0, column=3, padx=10, sticky="w")

            # Status
            leido = c.get("leido", False)
            status_text = "Leído" if leido else "Nuevo"
            status_color = THEME_COLORS["accent_green"] if leido else THEME_COLORS["primary"]
            
            lbl_status = ctk.CTkLabel(row, text=status_text, font=FONTS["body_bold"], text_color=status_color, anchor="w")
            lbl_status.grid(row=0, column=4, padx=10, sticky="w")

            # Actions
            btn_frame = ctk.CTkFrame(row, fg_color="transparent")
            btn_frame.grid(row=0, column=5, padx=15, sticky="e")

            if not leido:
                read_btn = ctk.CTkButton(
                    btn_frame,
                    text="Marcar Leído",
                    font=FONTS["small"],
                    width=90,
                    height=28,
                    fg_color=THEME_COLORS["secondary"],
                    hover_color=THEME_COLORS["secondary_hover"],
                    text_color="#FFFFFF",
                    command=lambda cid=c["id"]: self.mark_read(cid)
                )
                read_btn.pack(side="left", padx=3)

            del_btn = ctk.CTkButton(
                btn_frame,
                text="Eliminar",
                font=FONTS["small"],
                width=80,
                height=28,
                fg_color=THEME_COLORS["accent_red"],
                hover_color="#c0201a",
                text_color="#FFFFFF",
                command=lambda cid=c["id"]: self.delete_contact(cid)
            )
            del_btn.pack(side="left", padx=3)

    def mark_read(self, cid):
        success = False
        if self.connection_mode == "Simulación (Demo)":
            success = mock_db.mark_contact_read(cid)
        elif self.connection_mode == "API de Railway":
            res = api_client.mark_contact_read(cid)
            success = res.get("success")

        if success:
            self.refresh_contacts()
        else:
            messagebox.showerror("Error", "No se pudo marcar como leído.")

    def delete_contact(self, cid):
        confirm = messagebox.askyesno("Confirmar Eliminación", "¿Seguro que desea eliminar este mensaje de contacto?")
        if not confirm: return

        success = False
        if self.connection_mode == "Simulación (Demo)":
            success = mock_db.delete_contact(cid)
        elif self.connection_mode == "API de Railway":
            res = api_client.delete_contact(cid)
            success = res.get("success")

        if success:
            self.refresh_contacts()
        else:
            messagebox.showerror("Error", "No se pudo eliminar.")
