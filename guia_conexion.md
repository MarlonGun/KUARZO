# Guías de Conexión al Servidor Kuarzo (Railway)

Este documento contiene dos partes:
1. **[Guía para compartir con tus compañeros (Equipo Python)](#1-guía-para-el-equipo-de-python-desarrollo-de-escritorio)**: Puedes copiar y pegar esta sección para enviárselas directamente.
2. **[Guía para ti (Administrador)](#2-guía-para-ti-administrador-cómo-obtener-y-compartir-el-servidor-correctamente)**: Pasos exactos en Railway para exponer y compartir el servidor de forma segura.

---

## 1. Guía para el Equipo de Python (Desarrollo de Escritorio)
*Pega esta sección en el canal de comunicación de tu equipo.*

---

### 🚀 Guía de Integración con la API de Kuarzo en Python

Para conectar la aplicación de escritorio en Python al backend desplegado en Railway, realizaremos peticiones HTTP utilizando la biblioteca `requests`. Toda la comunicación se realiza mediante JSON y los endpoints protegidos requieren autenticación mediante un Token JWT.

#### Paso 1: Instalar dependencias necesarias
Asegúrate de tener instalada la librería `requests` en tu entorno virtual de Python:
```bash
pip install requests
```

#### Paso 2: Configurar la URL Base
En tu código o archivo de configuración (`.env` o archivo de constantes), define la dirección del servidor en Railway que te proporcionó el administrador:
```python
# Configuración global
API_BASE_URL = "https://tu-backend-en-railway.up.railway.app" # Reemplazar por la URL real
```

#### Paso 3: Flujo de Autenticación (Obtener Token JWT)
La mayoría de las operaciones del sistema requieren que estés autenticado. Primero debes iniciar sesión para obtener el Token y guardarlo en memoria o en la configuración de la aplicación de escritorio.

```python
import requests

def iniciar_sesion(email, password):
    url = f"{API_BASE_URL}/api/auth/login"  # Ajustar ruta según los endpoints del proyecto
    payload = {
        "email": email,
        "password": password
    }
    
    try:
        response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            datos = response.json()
            # El token que nos devuelve el servidor backend
            token = datos.get("token") 
            print("¡Autenticación exitosa! Token guardado.")
            return token
        else:
            print(f"Error de autenticación ({response.status_code}): {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión con el servidor: {e}")
        return None
```

#### Paso 4: Consumir Endpoints Protegidos (Enviar el Token)
Para las consultas que requieren estar logueado (como crear productos, ver el perfil, etc.), debes enviar el token en las cabeceras HTTP usando el formato `Authorization: Bearer <TOKEN>`.

```python
def obtener_productos(token):
    url = f"{API_BASE_URL}/api/productos"
    
    # Cabeceras de autenticación obligatorias
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()  # Retorna la lista de productos
        else:
            print(f"Error al obtener productos ({response.status_code}): {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {e}")
        return None
```

#### Paso 5: Buenas prácticas para el entorno de Escritorio
* **Guardado del Token:** Una vez obtenido el token, guárdalo temporalmente en una variable de sesión o de manera segura si la sesión debe persistir (por ejemplo, en un archivo de configuración cifrado o en el llavero del sistema operativo).
* **Manejo de expiración (401 Unauthorized):** Si una petición devuelve código de estado `401`, significa que el token ha expirado. La app de escritorio debe redirigir al usuario al formulario de login para obtener un nuevo token.

---

## 2. Guía para ti (Administrador): Cómo obtener y compartir el servidor correctamente
*Sigue estos pasos en tu cuenta de Railway para conseguir los datos necesarios.*

### Paso A: Obtener la URL Pública del Backend en Railway
1. Inicia sesión en [Railway.app](https://railway.app) y abre tu proyecto **Kuarzo**.
2. Haz clic sobre el servicio correspondiente al **Backend** (el servidor Express).
3. Dirígete a la pestaña **Settings** (Configuraciones) en la barra superior derecha.
4. Baja hasta la sección **Domains** (Dominios).
   * Si ya tienes un dominio generado, verás una URL del tipo `https://kuarzo-backend-production.up.railway.app`. **Esa es la URL que debes copiar.**
   * Si no tienes ningún dominio listado, haz clic en el botón **Generate Domain** (Generar Dominio). Railway te asignará una dirección web gratuita con SSL (`https://...`).
5. **Compártela:** Pásale esta URL a tus compañeros del equipo de Python para que la configuren como su `API_BASE_URL`.

### Paso B: Validar la configuración CORS en tu Backend Express
Dado que la aplicación web (React Native/Web en `KuarzoApp`) y la app de escritorio consumirán el servidor desde diferentes orígenes, debes asegurarte de que tu servidor Express tenga habilitado **CORS** para que no bloquee las peticiones externas.

En tu código de Express (comúnmente en `src/app.ts` o `src/index.ts`), asegúrate de tener:
```typescript
import cors from 'cors';

// Permitir peticiones desde cualquier origen durante el desarrollo
app.use(cors());
```
*Nota: Si necesitas restringir el acceso más adelante por seguridad, puedes configurar CORS para que solo acepte dominios específicos.*

### Paso C: Compartir la Base de Datos directamente (Solo si lo requieren)
Si los desarrolladores de Python necesitan hacer consultas directas a la base de datos SQL (por ejemplo, para scripts de analítica o cargas masivas):
1. En Railway, haz clic sobre el servicio de tu **Base de Datos MySQL/MariaDB**.
2. Ve a la pestaña **Connect** (Conectar).
3. Busca la variable **Public Connection URL** (la que empieza por `mysql://...` y tiene un host externo, no local).
4. Pásales esa URL o los campos individuales:
   * **Host:** `xxx.railway.app` (el dominio público que te da Railway)
   * **Port:** El puerto mapeado externamente (no necesariamente el 3306 interno)
   * **Username / Password / Database Name**
