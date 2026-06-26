import customtkinter as ctk
from database import db
from config import COLORS, FONTS

class UsersView(ctk.CTkFrame):
    def __init__(self, master):
        super().__init__(master, fg_color=COLORS["background_dark"])
        
        self.pack(fill="both", expand=True, padx=20, pady=20)
        
        # Header
        self.header_frame = ctk.CTkFrame(self, fg_color="transparent")
        self.header_frame.pack(fill="x", pady=(0, 20))
        
        self.title = ctk.CTkLabel(self.header_frame, text="Gestión de Usuarios", font=FONTS["h1"], text_color=COLORS["text_light"])
        self.title.pack(side="left")
        
        self.refresh_btn = ctk.CTkButton(self.header_frame, text="Actualizar", width=100, font=FONTS["body_bold"],
                                         fg_color=COLORS["primary"], hover_color=COLORS["primary_hover"],
                                         text_color=COLORS["text_dark"], command=self.load_users)
        self.refresh_btn.pack(side="right")
        
        # Table Container
        self.table_container = ctk.CTkScrollableFrame(self, fg_color=COLORS["tertiary"], corner_radius=10)
        self.table_container.pack(fill="both", expand=True)
        
        self.load_users()

    def load_users(self):
        # Clear existing
        for widget in self.table_container.winfo_children():
            widget.destroy()
            
        # Table Header
        header_frame = ctk.CTkFrame(self.table_container, fg_color=COLORS["tertiary_light"])
        header_frame.pack(fill="x", pady=(0, 10))
        header_frame.grid_columnconfigure((0, 1, 2, 3, 4, 5), weight=1)
        
        headers = ["ID", "Nombre", "Correo", "Rol", "Estado", "Acciones"]
        for i, text in enumerate(headers):
            lbl = ctk.CTkLabel(header_frame, text=text, font=FONTS["body_bold"], text_color=COLORS["text_light"])
            lbl.grid(row=0, column=i, pady=10, padx=10, sticky="w")
            
        # Fetch users
        query = """
        SELECT u.id, u.primerNombre, u.primerApellido, u.correo, u.estado, COALESCE(r.nombre, 'SIN ROL') as rol
        FROM usuario u
        LEFT JOIN rol r ON u.rolId = r.id
        ORDER BY u.id DESC
        """
        users = db.fetch_all(query)
        
        for idx, user in enumerate(users):
            row_frame = ctk.CTkFrame(self.table_container, fg_color="transparent")
            row_frame.pack(fill="x", pady=5)
            row_frame.grid_columnconfigure((0, 1, 2, 3, 4, 5), weight=1)
            
            ctk.CTkLabel(row_frame, text=str(user['id']), font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=0, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=f"{user['primerNombre']} {user['primerApellido']}", font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=1, padx=10, sticky="w")
            ctk.CTkLabel(row_frame, text=user['correo'], font=FONTS["body"], text_color=COLORS["text_light"]).grid(row=0, column=2, padx=10, sticky="w")
            
            # Role color
            role_color = COLORS["primary"] if user['rol'] == "ADMINISTRADOR" else COLORS["text_light"]
            ctk.CTkLabel(row_frame, text=user['rol'], font=FONTS["body_bold"], text_color=role_color).grid(row=0, column=3, padx=10, sticky="w")
            
            # Status color
            status_color = COLORS["success"] if user['estado'] == "ACTIVO" else COLORS["danger"]
            ctk.CTkLabel(row_frame, text=user['estado'], font=FONTS["body_bold"], text_color=status_color).grid(row=0, column=4, padx=10, sticky="w")
            
            # Actions Frame
            actions_frame = ctk.CTkFrame(row_frame, fg_color="transparent")
            actions_frame.grid(row=0, column=5, padx=10, sticky="w")
            
            action_btn = ctk.CTkButton(actions_frame, text="Cambiar", width=70, height=28,
                                       fg_color=COLORS["tertiary_light"], border_width=1, border_color=COLORS["quaternary"],
                                       command=lambda u_id=user['id'], est=user['estado']: self.toggle_status(u_id, est))
            action_btn.pack(side="left", padx=(0, 5))
            
            delete_btn = ctk.CTkButton(actions_frame, text="Eliminar", width=70, height=28,
                                       fg_color=COLORS["danger"], text_color=COLORS["text_light"], hover_color="#b71c1c",
                                       command=lambda u_id=user['id']: self.delete_user(u_id))
            delete_btn.pack(side="left")
            
    def delete_user(self, user_id):
        query = "DELETE FROM usuario WHERE id = %s"
        db.execute(query, (user_id,))
        self.load_users()
            
    def toggle_status(self, user_id, current_status):
        new_status = "INACTIVO" if current_status == "ACTIVO" else "ACTIVO"
        query = "UPDATE usuario SET estado = %s WHERE id = %s"
        db.execute(query, (new_status, user_id))
        self.load_users()
