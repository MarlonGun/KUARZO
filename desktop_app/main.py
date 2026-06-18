import customtkinter as ctk
import os
from config import THEME_COLORS, LOGO_PATH
from auth import LoginWindow
from dashboard import DashboardWindow

class KuarzoAdminApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        # Window Metadata
        self.title("KUARZO - Panel de Administración General")
        self.geometry("1200x750")
        self.configure(fg_color=THEME_COLORS["dark_bg"])
        
        # Center the window on screen
        self.center_window(1200, 750)

        # Set taskbar icon if possible
        try:
            if os.path.exists(LOGO_PATH):
                self.iconbitmap(default="") # reset default icon
                # On Windows, CTk can use iconbitmap or iconphoto.
                # CTk handles window icon using standard tk methods
                self.iconbitmap(LOGO_PATH)
        except Exception as e:
            print(f"Could not load window icon: {e}")

        # Current session state
        self.user = None
        self.connection_mode = None
        self.token = None

        # Active view container frame
        self.active_frame = None

        # Start with login screen
        self.show_login_screen()

    def center_window(self, width, height):
        self.update_idletasks()
        x = (self.winfo_screenwidth() // 2) - (width // 2)
        y = (self.winfo_screenheight() // 2) - (height // 2)
        self.geometry(f"{width}x{height}+{x}+{y}")

    def show_login_screen(self):
        if self.active_frame:
            self.active_frame.destroy()
            
        self.title("KUARZO - Iniciar Sesión")
        self.geometry("1200x750")
        self.center_window(1200, 750)
        
        self.active_frame = LoginWindow(self, on_login_success=self.on_login_success)

    def on_login_success(self, user, mode, token=None):
        self.user = user
        self.connection_mode = mode
        self.token = token
        
        # Open Dashboard view
        self.show_dashboard_screen()

    def show_dashboard_screen(self):
        if self.active_frame:
            self.active_frame.destroy()
            
        self.title("KUARZO - Panel Administrativo General")
        # Allow expanding the window size for a spacious dashboard
        self.minsize(1100, 700)
        
        self.active_frame = DashboardWindow(
            self,
            user_info=self.user,
            connection_mode=self.connection_mode,
            on_logout=self.logout
        )

    def logout(self):
        self.user = None
        self.connection_mode = None
        self.token = None
        self.show_login_screen()


if __name__ == "__main__":
    # Set global customtkinter aesthetics
    ctk.set_appearance_mode("dark")
    ctk.set_default_color_theme("blue")
    
    app = KuarzoAdminApp()
    app.mainloop()
