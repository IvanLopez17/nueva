# Travel Agency Sales Management System

Sistema completo de gestión de ventas para agencias de viajes con frontend en React/TypeScript y backend en Django REST.

## 🚀 Características

- **Autenticación completa**: Login, registro y gestión de usuarios
- **Dashboard ejecutivo**: Métricas visuales, gráficos y estadísticas
- **CRUD de ventas**: Gestión completa de ventas con cálculo automático de comisiones
- **API REST robusta**: Backend Django con autenticación JWT
- **Diseño responsive**: Interfaz moderna optimizada para todos los dispositivos
- **Base de datos MySQL**: Almacenamiento persistente y confiable

## 🛠️ Tecnologías

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- React Router DOM
- Recharts (gráficos)
- Axios (API calls)
- Lucide React (iconos)

### Backend
- Django 4.2
- Django REST Framework
- JWT Authentication
- MySQL Database
- CORS Headers

## 📦 Instalación

### Backend (Django)

1. **Crear entorno virtual**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate  # Windows
```

2. **Instalar dependencias**:
```bash
pip install -r requirements.txt
```

3. **Configurar base de datos**:
```bash
# Crear archivo .env basado en .env.example
cp .env.example .env

# Editar .env con tus credenciales de MySQL
# Crear base de datos MySQL
mysql -u root -p
CREATE DATABASE travel_agency;
```

4. **Ejecutar migraciones**:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Crear superusuario**:
```bash
python manage.py createsuperuser
```

6. **Ejecutar servidor**:
```bash
python manage.py runserver
```

### Frontend (React)

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
```bash
# Crear archivo .env basado en .env.example
cp .env.example .env
```

3. **Ejecutar aplicación**:
```bash
npm run dev
```

## 🌐 Despliegue en Render

### Backend

1. **Conectar repositorio en Render**
2. **Configurar servicio web**:
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn travel_agency.wsgi:application`

3. **Configurar variables de entorno**:
   - `SECRET_KEY`: Generar clave secreta
   - `DEBUG`: False
   - `DATABASE_URL`: URL de conexión MySQL
   - `ALLOWED_HOSTS`: dominio-render.com

4. **Crear base de datos MySQL en Render**

### Frontend

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Configurar variables de entorno**:
   - `VITE_API_URL`: URL del backend en Render

## 📊 Funcionalidades

### Dashboard
- Métricas de ventas totales
- Cálculo automático de comisiones (30%)
- Gráficos de ventas mensuales
- Perfil del asesor

### Gestión de Ventas
- Crear, editar y eliminar ventas
- Campos: fecha de venta, código de reserva, cliente, total
- Cálculo automático de comisión
- Búsqueda y filtrado

### Autenticación
- Registro de usuarios
- Login con JWT
- Protección de rutas
- Refresh tokens automático

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/register/` - Registro
- `POST /api/auth/login/` - Login
- `POST /api/auth/token/refresh/` - Refresh token
- `GET /api/auth/user/` - Perfil usuario

### Ventas
- `GET /api/sales/` - Listar ventas
- `POST /api/sales/` - Crear venta
- `GET /api/sales/{id}/` - Detalle venta
- `PUT /api/sales/{id}/` - Actualizar venta
- `DELETE /api/sales/{id}/` - Eliminar venta
- `GET /api/sales/dashboard-stats/` - Estadísticas

## 💼 Estructura del Proyecto

```
├── backend/
│   ├── travel_agency/          # Configuración Django
│   ├── accounts/              # Gestión de usuarios
│   ├── sales/                 # Gestión de ventas
│   ├── requirements.txt       # Dependencias Python
│   └── render.yaml           # Configuración Render
├── src/
│   ├── components/           # Componentes React
│   ├── pages/               # Páginas principales
│   ├── services/            # Servicios API
│   ├── contexts/            # Context providers
│   ├── types/               # Tipos TypeScript
│   └── utils/               # Utilidades
└── README.md
```

## 🎨 Diseño

- **Color primario**: Azul (#3B82F6)
- **Color éxito**: Verde (#10B981)
- **Color alerta**: Naranja (#F59E0B)
- **Tipografía**: Sistema de fuentes nativo
- **Espaciado**: Sistema basado en 8px
- **Responsive**: Mobile-first approach

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Seguridad

- Autenticación JWT
- Validación de datos en frontend y backend
- CORS configurado
- Sanitización de inputs
- Manejo seguro de tokens

## 🚀 Próximas Mejoras

- [ ] Reportes PDF
- [ ] Notificaciones push
- [ ] Integración con sistemas de pago
- [ ] Dashboard admin multi-asesor
- [ ] Exportación de datos
- [ ] Modo offline

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.