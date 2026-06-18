import bcrypt
from database import db

def init_admin_user():
    # Check if admin user exists
    user = db.fetch_one("SELECT * FROM usuario WHERE correo = 'admin@kuarzo.com'")
    if user:
        print("Admin user already exists.")
        return

    # Check if admin role exists, the id is 2 based on the sql schema
    # The sql file inserts: (1, 'COMPRADOR'), (2, 'ADMINISTRADOR')

    # Hash the password
    password = "admin".encode('utf-8')
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())

    # Insert user
    query = """
    INSERT INTO usuario (rolId, primerNombre, primerApellido, correo, contrasena, estado)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    params = (2, 'Admin', 'Kuarzo', 'admin@kuarzo.com', hashed.decode('utf-8'), 'ACTIVO')
    
    user_id = db.execute(query, params)
    if user_id:
        print(f"Admin user created successfully! Email: admin@kuarzo.com, Password: admin")
    else:
        print("Failed to create admin user.")

if __name__ == "__main__":
    init_admin_user()
