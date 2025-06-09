# 📦 Dependencias de la Aplicación Web

## 🐍 Backend (Django) - requirements.txt

### Dependencias Principales
- **Django==4.2.7** - Framework web principal
- **djangorestframework==3.14.0** - API REST framework
- **django-cors-headers==4.3.1** - Manejo de CORS para frontend
- **djangorestframework-simplejwt==5.3.0** - Autenticación JWT
- **mysqlclient==2.2.0** - Conector para base de datos MySQL
- **python-decouple==3.8** - Manejo de variables de entorno
- **Pillow==10.1.0** - Procesamiento de imágenes (perfiles de usuario)

### Dependencias de Producción
- **gunicorn==21.2.0** - Servidor WSGI para producción
- **whitenoise==6.6.0** - Servir archivos estáticos en producción

### Instalación Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

## ⚛️ Frontend (React) - package.json

### Dependencias de Producción
- **react@^18.3.1** - Biblioteca principal de React
- **react-dom@^18.3.1** - DOM renderer para React
- **react-router-dom@^6.21.0** - Enrutamiento del lado del cliente
- **axios@^1.6.2** - Cliente HTTP para llamadas a la API
- **lucide-react@^0.344.0** - Iconos modernos
- **recharts@^2.8.0** - Gráficos y visualizaciones
- **@headlessui/react@^1.7.17** - Componentes UI accesibles

### Dependencias de Desarrollo
- **@vitejs/plugin-react@^4.3.1** - Plugin de Vite para React
- **vite@^5.4.2** - Bundler y servidor de desarrollo
- **typescript@^5.5.3** - Soporte para TypeScript
- **@types/react@^18.3.5** - Tipos de TypeScript para React
- **@types/react-dom@^18.3.0** - Tipos de TypeScript para React DOM
- **tailwindcss@^3.4.1** - Framework CSS utility-first
- **autoprefixer@^10.4.18** - Autoprefijos CSS
- **postcss@^8.4.35** - Procesador CSS
- **eslint@^9.9.1** - Linter de JavaScript/TypeScript
- **typescript-eslint@^8.3.0** - Reglas ESLint para TypeScript

### Instalación Frontend
```bash
npm install
# o
yarn install
```

## 🗄️ Base de Datos

### MySQL
- **Versión recomendada**: MySQL 8.0+
- **Motor**: InnoDB
- **Codificación**: utf8mb4

### Configuración de Base de Datos
```sql
CREATE DATABASE travel_agency CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 🌐 Variables de Entorno

### Backend (.env)
```env
SECRET_KEY=tu-clave-secreta-django
DEBUG=True
DB_NAME=travel_agency
DB_USER=root
DB_PASSWORD=tu-password-mysql
DB_HOST=localhost
DB_PORT=3306
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## 🚀 Dependencias del Sistema

### Requisitos del Sistema
- **Python**: 3.8+ (recomendado 3.11)
- **Node.js**: 16+ (recomendado 18+)
- **MySQL**: 8.0+
- **npm**: 8+ o **yarn**: 1.22+

### Herramientas de Desarrollo
- **Git**: Control de versiones
- **VS Code**: Editor recomendado
- **MySQL Workbench**: Administración de base de datos (opcional)

## 📱 Dependencias de Producción (Render)

### Backend en Render
```yaml
# render.yaml
services:
  - type: web
    name: travel-agency-api
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn travel_agency.wsgi:application"
```

### Frontend en Render
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🔧 Comandos de Instalación Completa

### Instalación Rápida - Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Editar .env con tus credenciales
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Instalación Rápida - Frontend
```bash
npm install
cp .env.example .env
# Editar .env si es necesario
npm run dev
```

## 🐛 Solución de Problemas de Dependencias

### Problemas Comunes Backend
```bash
# Error mysqlclient en Windows
pip install mysqlclient==2.2.0

# Error de permisos
pip install --user -r requirements.txt

# Actualizar pip
python -m pip install --upgrade pip
```

### Problemas Comunes Frontend
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install

# Usar yarn como alternativa
yarn install
```

## 📊 Resumen de Dependencias

| Categoría | Backend | Frontend |
|-----------|---------|----------|
| **Framework Principal** | Django 4.2.7 | React 18.3.1 |
| **Base de Datos** | MySQL + mysqlclient | - |
| **Autenticación** | JWT + DRF | Axios + Context |
| **UI/Estilos** | - | Tailwind CSS |
| **Iconos** | - | Lucide React |
| **Gráficos** | - | Recharts |
| **Servidor Dev** | Django dev server | Vite |
| **Servidor Prod** | Gunicorn | Vite build |
| **Total Dependencias** | 8 principales | 15 principales |

## 🔄 Actualizaciones

Para mantener las dependencias actualizadas:

```bash
# Backend
pip list --outdated
pip install --upgrade package-name

# Frontend
npm outdated
npm update package-name
```

Esta aplicación está diseñada para ser robusta, escalable y fácil de mantener con dependencias bien establecidas y ampliamente utilizadas en la industria.