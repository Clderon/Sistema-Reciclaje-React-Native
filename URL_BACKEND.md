# 🔗 URL del Backend - React Native

## ✅ Backend Desplegado

Tu backend está funcionando en:
```
https://sistema-reciclaje-backend.onrender.com
```

API Base:
```
https://sistema-reciclaje-backend.onrender.com/api
```

---

## 📱 Configuración en React Native

La URL ya está configurada en `src/config/api.js` y se usa automáticamente.

### Verificación:

Abre `src/config/api.js` y verifica que tenga:
```javascript
const URL_PRODUCCION = 'https://sistema-reciclaje-backend.onrender.com/api';
```

---

## ✅ Flujo Completo

```
📱 React Native (Expo Go)
    ↓ HTTPS
🌐 Backend Render (https://sistema-reciclaje-backend.onrender.com)
    ↓
💾 RDS (PostgreSQL) - Almacena datos de usuarios, reciclajes, rankings
📦 S3 - Almacena imágenes de evidencias
```

**Todo funciona desde cualquier dispositivo con Expo Go.**

---

## 🧪 Probar Conexión

### Desde la App:

1. Inicia la app con Expo Go
2. Escribe un nombre en login
3. Selecciona un rol
4. Observa la consola del backend (Render logs) - deberías ver queries SQL

### Desde navegador (verificar backend):

```
https://sistema-reciclaje-backend.onrender.com/health
```

Deberías recibir:
```json
{
  "status": "ok",
  "message": "Sistema de Reciclaje API is running"
}
```

---

## ✅ Confirmación

- ✅ Backend desplegado y funcionando
- ✅ URL configurada en React Native
- ✅ Backend gestiona RDS (datos)
- ✅ Backend gestiona S3 (imágenes)
- ✅ Funciona desde Expo Go en dispositivo físico

**¡Todo listo para usar!**

