import os

# --- PATH CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
LOGO_PATH = os.path.join(PROJECT_ROOT, "assets", "images", "logo.png")

# --- API CONFIGURATION ---
API_BASE_URL = "https://kuarzo-backend-production.up.railway.app/api"
API_TIMEOUT = 10  # in seconds

# --- DATABASE CONFIGURATION ---
# These are local defaults. For production, the user can configure the Railway public connection details here.
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "kuarzo_db",
    "port": 3306
}

# --- DESIGN SYSTEM / THEME ---
# Coherent with tailwind.config.js
THEME_COLORS = {
    "primary": "#FED20F",       # Golden yellow
    "primary_hover": "#F4BA00", # Darker golden yellow
    "secondary": "#FF9309",     # Orange
    "secondary_hover": "#E27600",
    "dark_bg": "#111111",       # Dark slate bg
    "card_bg": "#282828",       # Dark grey card bg
    "border": "#3E3E3E",        # Border color
    "text_primary": "#FFFFFF",  # Main text
    "text_secondary": "#C2C2C2",# Muted text
    "accent_green": "#4CAF50",  # Active status/Successful payment
    "accent_red": "#F44336",    # Cancelled status/Low stock
    "accent_blue": "#2196F3"    # Processed status
}

# Fonts
FONTS = {
    "title": ("Roboto", 24, "bold"),
    "subtitle": ("Roboto", 16, "bold"),
    "header": ("Roboto", 14, "bold"),
    "body_bold": ("Open Sans", 12, "bold"),
    "body": ("Open Sans", 12, "normal"),
    "small": ("Open Sans", 10, "normal")
}
