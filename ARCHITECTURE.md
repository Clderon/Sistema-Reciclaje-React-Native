# Arquitectura del Sistema - Backend y Base de Datos

## Resumen de la Arquitectura

```
┌─────────────────────────────────────┐
│   React Native App (Expo)           │
│   📱 Instalada en dispositivos      │
│   - LoginScreen (registro/login)    │
│   - HomeScreen (reciclaje)          │
│   - LogrosScreen (ranking)          │
│   - PerfilScreen (perfil)           │
└──────────────┬──────────────────────┘
               │
               │ HTTPS/REST API
               │ (URL pública: https://api.tudominio.com)
               │ JWT Authentication
               │
               ▼
┌─────────────────────────────────────┐
│   Backend API (Node.js/Express)     │
│   🚀 DEPLEGADO EN SERVIDOR          │
│   (AWS EC2 / Heroku / Railway)      │
│   - /api/auth (login, register)     │
│   - /api/users (CRUD usuarios)      │
│   - /api/recycling (reciclajes)     │
│   - /api/scores (puntajes)          │
│   - /api/ranking (rankings)         │
│   - /api/upload (S3 upload)         │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌──────────────┐
│  AWS RDS    │  │   AWS S3     │
│ PostgreSQL  │  │   (Imágenes) │
│ (Datos)     │  │              │
└─────────────┘  └──────────────┘
```

## ⚠️ IMPORTANTE: Deployment del Backend

**SÍ, el backend DEBE estar desplegado en un servidor accesible desde internet** porque:

1. La app React Native corre en dispositivos móviles (iOS/Android)
2. Necesita conectarse a una URL pública (no localhost)
3. El backend actúa como intermediario entre la app y la base de datos

## Estructura de Base de Datos (RDS)

### Tabla: `users`
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'student', 'parent', 'teacher'
    email VARCHAR(255),
    password_hash VARCHAR(255), -- Para futuras implementaciones
    avatar_url VARCHAR(500), -- URL de S3
    total_points INTEGER DEFAULT 0,
    total_recyclings INTEGER DEFAULT 0,
    current_level VARCHAR(50) DEFAULT 'Hormiga',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `recycling_records`
```sql
CREATE TABLE recycling_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    category_id INTEGER NOT NULL, -- 1=Papel, 2=Plástico, etc.
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(10) NOT NULL, -- 'kg' o 'Unid.'
    points_earned INTEGER NOT NULL,
    evidence_image_url VARCHAR(500), -- URL de S3
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `badges`
```sql
CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    required_points INTEGER,
    category VARCHAR(50) -- 'Hormiga', 'Mono', 'Elefante', etc.
);
```

### Tabla: `user_badges`
```sql
CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    badge_id INTEGER REFERENCES badges(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);
```

## Endpoints del Backend API

### Autenticación
- `POST /api/auth/register` - Registro de usuario (nombre + rol)
- `POST /api/auth/login` - Login (nombre)
- `POST /api/auth/refresh` - Refresh JWT token

### Usuarios
- `GET /api/users/me` - Obtener perfil del usuario actual
- `PUT /api/users/me` - Actualizar perfil
- `GET /api/users/:id` - Obtener perfil de otro usuario

### Reciclaje
- `POST /api/recycling` - Registrar nuevo reciclaje
  ```json
  {
    "categoryId": 1,
    "quantity": 5.5,
    "unit": "kg",
    "evidenceImage": "base64_encoded_image"
  }
  ```
- `GET /api/recycling` - Obtener historial de reciclajes del usuario

### Puntajes y Ranking
- `GET /api/ranking/students` - Ranking de estudiantes
- `GET /api/ranking/teachers` - Ranking de docentes
- `GET /api/ranking/parents` - Ranking de padres
- `GET /api/scores/me` - Estadísticas del usuario actual

### Badges/Logros
- `GET /api/badges` - Listar todos los badges disponibles
- `GET /api/badges/me` - Badges obtenidos por el usuario

### Upload
- `POST /api/upload/image` - Subir imagen a S3

## Flujo de Registro/Login Simple

### Para Alumnos (y otros roles):
1. Usuario ingresa a la app
2. Selecciona rol (Alumno, Docente, Padre/Madre)
3. Si no tiene cuenta, puede:
   - Escribir su nombre
   - Click en "Registrarse" o "Crear cuenta"
   - El backend crea usuario con nombre único
4. Si ya tiene cuenta:
   - Escribe su nombre
   - Click en "Iniciar sesión"
   - El backend valida y retorna JWT

### Ejemplo de request de registro:
```json
POST /api/auth/register
{
  "username": "Juan Pérez",
  "role": "student"
}
```

### Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "Juan Pérez",
    "role": "student",
    "totalPoints": 0,
    "currentLevel": "Hormiga"
  }
}
```

## Opciones de Deployment del Backend

### Opción 1: AWS EC2 + RDS (Recomendado para producción)
- **EC2**: Servidor para el backend API
- **RDS**: Base de datos PostgreSQL/MySQL
- **S3**: Almacenamiento de imágenes
- **Ventajas**: Control total, escalable, coste-efectivo
- **Coste**: ~$20-50/mes (dependiendo del uso)

### Opción 2: AWS Elastic Beanstalk
- Deployment más simple que EC2
- Auto-scaling incluido
- Ideal si ya usas AWS

### Opción 3: Heroku
- **Ventajas**: Muy fácil de deployar, gratis para desarrollo
- **Desventajas**: Más costoso en producción, sleep mode en plan gratuito
- **Ideal para**: Prototipos y desarrollo inicial

### Opción 4: Railway / Render
- **Ventajas**: Fácil deployment, buena relación calidad/precio
- **Ideal para**: Desarrollo y producción pequeña/mediana

### Opción 5: AWS Lambda + API Gateway (Serverless)
- **Ventajas**: Escala automáticamente, solo pagas por uso
- **Desventajas**: Más complejo de configurar
- **Ideal para**: Aplicaciones con tráfico variable

## Configuración de la URL del Backend en React Native

En la app React Native, necesitarás configurar la URL base del API:

```javascript
// src/config/api.js
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'  // Desarrollo (solo en emulador)
  : 'https://api.tudominio.com/api';  // Producción

// O usando variables de entorno:
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.tudominio.com/api';
```

**Importante**: 
- En desarrollo local puedes usar `localhost` solo si pruebas en emulador
- Para dispositivos físicos, necesitas usar la IP local o un túnel (ngrok, Expo tunnel)
- En producción, siempre usar URL pública HTTPS

## Configuración AWS

### RDS (PostgreSQL)
- Engine: PostgreSQL 14+
- Instance class: db.t3.micro (para desarrollo) / db.t3.small (producción)
- Storage: 20GB mínimo
- Security groups: Solo permitir conexiones desde tu backend

### S3
- Bucket: `sistema-reciclaje-images`
- Configuración CORS para permitir uploads desde la app
- Política IAM para acceso desde backend

### Credenciales (Variables de entorno del Backend)
```env
# Backend .env (en el servidor donde esté desplegado)
DATABASE_URL=postgresql://user:pass@your-rds-endpoint:5432/sistema_reciclaje
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=sistema-reciclaje-images
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=production
```

### Variables de entorno en React Native (opcional)
```env
# .env en el proyecto React Native (opcional, solo para desarrollo)
EXPO_PUBLIC_API_URL=https://api.tudominio.com/api
```

**Nota**: Las variables `EXPO_PUBLIC_*` están disponibles en el código del cliente. 
NUNCA pongas secretos (API keys, tokens) aquí, solo URLs públicas.

## Implementación Paso a Paso

1. **Backend Básico**
   - Crear servidor Express
   - Configurar conexión a RDS
   - Crear tablas en base de datos

2. **Autenticación**
   - Implementar registro/login simple
   - JWT tokens
   - Middleware de autenticación

3. **S3 Setup**
   - Configurar bucket
   - Endpoint para upload de imágenes
   - Retornar URLs públicas

4. **Integración React Native**
   - Servicios API
   - Context para estado de usuario
   - Actualizar LoginScreen

5. **Funcionalidades**
   - Registro de reciclajes
   - Cálculo de puntos
   - Rankings
   - Badges/Logros

## Próximos Pasos Recomendados

1. ✅ Crear estructura de backend
2. ✅ Configurar RDS y crear esquema
3. ✅ Implementar autenticación simple
4. ✅ Integrar S3 para imágenes
5. ✅ Conectar React Native con backend
6. ✅ Implementar registro de reciclajes
7. ✅ Sistema de puntos y rankings

