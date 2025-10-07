# Sistema Deportivo UNDC - Cliente Frontend

![Login](https://raw.githubusercontent.com/FernandoYZ/undc-sistema-deportes/refs/heads/main/public/images/pagina_login.png)

## Descripción

Sistema web para la gestión de deportes de la Universidad Nacional del Callao (UNDC). Esta aplicación frontend desarrollada con Vue.js 3 y Vite permite la administración de torneos deportivos, inscripciones de equipos, gestión de partidos y vouchers de pago.

## Características

### 🏠 Página Principal
- Información general del sistema
- Navegación hacia las diferentes secciones

### 📋 Sistema de Inscripciones
![Inscripciones](https://raw.githubusercontent.com/FernandoYZ/undc-sistema-deportes/refs/heads/main/public/images/pagina_inscripciones.png)
- Registro de equipos deportivos
- Inscripción de jugadores
- Validación de documentos
- Gestión de vouchers de pago

### 🔐 Sistema de Autenticación
- Login seguro para administradores
- Protección de rutas administrativas
- Sesiones persistentes con cookies
- Interceptores automáticos para manejo de autenticación

### ⚙️ Panel Administrativo
- **Dashboard**: Vista general del sistema
- **Gestión de Equipos**: CRUD completo de equipos inscritos
- **Gestión de Partidos**: Programación y resultados de partidos
- **Gestión de Vouchers**: Validación y seguimiento de pagos
- **Bracket de Torneo**: Visualización de llaves de eliminación

## Stack Tecnológico

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite 7.0.6
- **Routing**: Vue Router 4
- **State Management**: Pinia 3.0.3
- **Styling**: Tailwind CSS 4.1.13
- **HTTP Client**: Axios 1.12.2
- **Node.js**: ^20.19.0 || >=22.12.0

## Arquitectura del Proyecto

```
src/
├── apis/                 # APIs específicas por módulo
│   ├── auth.api.js      # API de autenticación
│   ├── equipos.api.js   # API de equipos
│   └── posiciones.api.js # API de posiciones
├── components/          # Componentes reutilizables
│   ├── ModalResultado.vue
│   └── TorneoBracket.vue
├── composables/         # Lógica reutilizable (Composition API)
│   ├── admin-partidos.js
│   ├── admin-vouchers.js
│   ├── inscripciones-equipo.js
│   └── inscripciones-jugadores.js
├── layouts/             # Layouts de aplicación
│   ├── AdminLayout.vue
│   ├── DefaultLayout.vue
│   └── InscripcionesLayout.vue
├── router/              # Configuración de rutas
│   └── index.js
├── services/            # Servicios de la aplicación
│   ├── admin.js
│   └── api.js          # Configuración de Axios
├── stores/              # Stores de Pinia
│   ├── auth.js
│   └── counter.js
└── views/               # Páginas de la aplicación
    ├── Admin/
    ├── error/
    └── ...
```

## Configuración del Entorno

### Variables de Entorno

Crea un archivo `.env` basado en `.env.ejemplo`:

```env
# URL base de la API para entorno de desarrollo
VITE_API_BASE_URL=http://localhost:3100
```

### Configuración del Backend

Este cliente frontend funciona en conjunto con el backend del sistema. Asegúrate de que el servidor backend esté ejecutándose en `http://localhost:3100` (o la URL configurada en `VITE_API_BASE_URL`).

**Tecnologías del Backend:**
- Node.js >=22.13.1
- Express.js 5.1.0
- MySQL2 para base de datos
- JWT para autenticación
- Socket.io para tiempo real
- Multer para manejo de archivos

## Instalación y Configuración

### Prerrequisitos

- Node.js (^20.19.0 || >=22.12.0)
- pnpm (recomendado) o npm
- Backend del sistema ejecutándose

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/FernandoYZ/undc-sistema-deportes.git
cd client
```

2. **Instala las dependencias**
```bash
pnpm install
```

3. **Configura las variables de entorno**
```bash
cp .env.ejemplo .env
# Edita el archivo .env con tu configuración
```

4. **Inicia el servidor de desarrollo**
```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3305`

## Scripts Disponibles

### Desarrollo
```bash
pnpm dev
```
Inicia el servidor de desarrollo con hot-reload en el puerto 3305.

### Producción
```bash
pnpm build
```
Compila y minifica la aplicación para producción.

### Vista Previa
```bash
pnpm preview
```
Previsualiza la build de producción localmente.

## Estructura de Rutas

### Rutas Públicas
- `/` - Página principal
- `/inscripciones` - Sistema de inscripciones
- `/login` - Inicio de sesión
- `/403` - No autorizado
- `/404` - No encontrado

### Rutas Administrativas (Requieren autenticación)
- `/admin` - Dashboard administrativo
- `/admin/voucher` - Gestión de vouchers
- `/admin/equipos` - Gestión de equipos
- `/admin/partidos` - Gestión de partidos

## Características de Seguridad

- **Autenticación basada en JWT**: Tokens seguros para sesiones
- **Protección de rutas**: Guard de navegación para rutas administrativas
- **Interceptores HTTP**: Manejo automático de tokens expirados
- **Cookies seguras**: Almacenamiento seguro de credenciales
- **CORS configurado**: Comunicación segura con el backend

## Desarrollo

### Configuración del IDE

**Recomendado**: [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

**Importante**: Deshabilita Vetur si está instalado para evitar conflictos.

### Estructura de Componentes

El proyecto utiliza la Composition API de Vue 3 con `<script setup>` para una sintaxis más limpia y mejor rendimiento.

### Estado Global

Se utiliza Pinia para el manejo del estado global, especialmente para:
- Autenticación de usuarios (`useAuthStore`)
- Datos compartidos entre componentes

### Estilos

Tailwind CSS 4.1.13 para un desarrollo rápido y consistente de interfaces.

## Integración con Backend

La aplicación se comunica con el backend a través de:
- **API REST**: Para operaciones CRUD
- **Autenticación**: JWT con cookies HTTP-only
- **Interceptores**: Manejo automático de errores y reautenticación
- **CORS**: Configurado para desarrollo y producción

---

**Universidad Nacional del Callao - Sistema Deportivo**
