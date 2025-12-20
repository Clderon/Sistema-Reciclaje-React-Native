# Guía de Deployment - Sistema de Reciclaje

## 🎯 Resumen: ¿Por qué necesitas deployment?

**SÍ, el backend DEBE estar desplegado** porque:

1. ✅ La app React Native corre en **dispositivos móviles reales** (iOS/Android)
2. ✅ Necesita una **URL pública HTTPS** para conectarse desde cualquier lugar
3. ✅ No puede usar `localhost` desde un dispositivo físico
4. ✅ El backend actúa como **puente seguro** entre la app y RDS/S3

## 📱 Flujo Real de la App

```
Usuario abre app en su móvil
    ↓
App hace request a: https://api.tudominio.com/api/auth/login
    ↓
Backend (desplegado en servidor) procesa la petición
    ↓
Backend se conecta a RDS (base de datos)
    ↓
Backend retorna respuesta JSON
    ↓
App muestra datos al usuario
```

## 🚀 Opciones de Deployment Recomendadas

### 1. Railway (⭐ RECOMENDADO para empezar)

**Ventajas:**
- ✅ Gratis para empezar ($5 crédito/mes)
- ✅ Deployment super fácil (conectas GitHub y listo)
- ✅ Base de datos PostgreSQL incluida
- ✅ SSL automático (HTTPS)
- ✅ Ideal para desarrollo y producción pequeña

**Pasos:**
1. Crear cuenta en [railway.app](https://railway.app)
2. Conectar repositorio GitHub
3. Railway detecta Node.js automáticamente
4. Agregar PostgreSQL como servicio
5. Configurar variables de entorno
6. ¡Listo! Obtienes URL: `https://tu-app.railway.app`

**Coste:** $5-20/mes

---

### 2. Render

**Ventajas:**
- ✅ Plan gratuito disponible (con limitaciones)
- ✅ Fácil deployment desde GitHub
- ✅ PostgreSQL gratuito incluido
- ✅ SSL automático

**Pasos similares a Railway**

**Coste:** Gratis (con sleep mode) / $7+/mes

---

### 3. AWS EC2 + RDS (Para producción seria)

**Ventajas:**
- ✅ Control total
- ✅ Escalable
- ✅ Coste-efectivo a largo plazo
- ✅ Integración nativa con S3

**Configuración:**
1. Crear instancia EC2 (t2.micro para empezar - gratis 12 meses)
2. Configurar RDS PostgreSQL
3. Configurar Security Groups
4. Instalar Node.js en EC2
5. Configurar PM2 para mantener servidor corriendo
6. Configurar Nginx como reverse proxy
7. Configurar SSL con Let's Encrypt

**Coste:** ~$15-30/mes

---

### 4. Heroku

**Ventajas:**
- ✅ Muy fácil de usar
- ✅ Gran documentación
- ✅ Add-ons disponibles

**Desventajas:**
- ❌ Más caro que otras opciones
- ❌ Plan gratuito eliminado (ahora solo pago)

**Coste:** $7+/mes

---

## 🔧 Configuración Mínima Necesaria

### En el Servidor (Backend):
```bash
# Ejemplo con Railway/Render
1. Subir código del backend
2. Configurar variables de entorno:
   - DATABASE_URL (proveedor por Railway/Render o tu RDS)
   - JWT_SECRET
   - AWS credentials (si usas S3)
   - PORT (generalmente se asigna automáticamente)
3. El servicio ejecuta: npm start
4. Obtienes URL pública: https://tu-backend.railway.app
```

### En React Native (App):
```javascript
// src/config/api.js
const API_BASE_URL = 'https://tu-backend.railway.app/api';

// O usar variable de entorno
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://tu-backend.railway.app/api';
```

## 📋 Checklist de Deployment

### Backend:
- [ ] Código del backend creado y probado localmente
- [ ] Base de datos configurada (RDS o PostgreSQL del servicio)
- [ ] Variables de entorno configuradas en el servicio
- [ ] Backend desplegado y accesible vía HTTPS
- [ ] Endpoints probados con Postman/curl
- [ ] CORS configurado para permitir requests desde la app

### React Native:
- [ ] URL del API configurada en el código
- [ ] Servicios API creados para conectar con backend
- [ ] Manejo de errores de red implementado
- [ ] Autenticación JWT funcionando
- [ ] Probado en dispositivo real (no solo emulador)

### AWS S3 (si usas):
- [ ] Bucket creado
- [ ] CORS configurado
- [ ] Política IAM para acceso desde backend
- [ ] Credenciales AWS configuradas en backend

## 🔒 Seguridad Importante

1. **NUNCA** expongas credenciales de RDS en el código de React Native
2. **Siempre** usa HTTPS (no HTTP)
3. **Valida** todos los inputs en el backend
4. **Usa** JWT tokens para autenticación
5. **Configura** CORS correctamente
6. **Limita** rate limiting en el backend

## 🧪 Testing Antes de Deployment

### Localmente:
```bash
# Backend
cd backend
npm install
npm run dev  # http://localhost:3000

# Probar endpoints
curl http://localhost:3000/api/health
```

### En Dispositivo Físico:
Para probar con tu móvil antes de deployment:
1. Usar túnel (ngrok): `ngrok http 3000`
2. O usar IP local: `http://192.168.1.X:3000`
3. Configurar en la app temporalmente

## 📱 Ejemplo de Flujo Completo

1. **Desarrollo Local:**
   - Backend: `localhost:3000`
   - React Native: Conecta a `localhost` (solo emulador)

2. **Desarrollo con Dispositivo:**
   - Backend: `ngrok` o IP local
   - React Native: URL del túnel

3. **Producción:**
   - Backend: `https://api.tudominio.com`
   - React Native: Compilado con URL de producción

## 💡 Recomendación Final

**Para empezar rápido:**
1. Usa **Railway** o **Render** (fácil y barato)
2. PostgreSQL incluido en el servicio
3. S3 para imágenes (configura después)
4. Una vez funcionando, migra a AWS si necesitas más control

**Para producción seria:**
- AWS EC2 + RDS desde el inicio
- Más configuración, pero mejor escalabilidad

