# 🧪 Cómo Probar la Conexión Frontend-Backend

## ✅ Lo que ya tienes configurado

1. ✅ Backend funcionando y conectado a RDS
2. ✅ Tablas creadas en la base de datos
3. ✅ Servicios API creados en React Native
4. ✅ AuthContext configurado
5. ✅ LoginScreen actualizado para usar el backend

---

## 📋 Pasos para Probar

### 1. Verificar que el backend esté corriendo

```bash
# En el backend
cd Sistema-Reciclaje-Backend
npm start
```

Deberías ver:
```
✅ Conexión exitosa a PostgreSQL
🚀 Servidor corriendo en puerto 3000
```

### 2. Probar el backend directamente

Abre otra terminal y prueba el endpoint:

```bash
# Windows PowerShell
curl http://localhost:3000/health

# O desde navegador
http://localhost:3000/health
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "Sistema de Reciclaje API is running",
  "timestamp": "..."
}
```

### 3. Configurar URL del backend en React Native

Edita `src/config/api.js` y verifica la URL:

```javascript
// Si backend está local y usas emulador:
export const API_BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'  // Emulador Android
    : 'http://localhost:3000/api'  // iOS Simulator
  : 'https://tu-backend.onrender.com/api';  // Producción
```

### 4. Instalar dependencias en React Native

```bash
cd Sistema-Reciclaje-React
npm install
```

Esto instalará `@react-native-async-storage/async-storage` que agregamos.

### 5. Iniciar la app

```bash
npm start
```

O si usas Expo Go:
```bash
npx expo start
```

### 6. Probar el flujo completo

1. **Abre la app** en tu dispositivo/emulador
2. **Verás la pantalla de login** con:
   - Campo de texto para nombre
   - 3 botones de rol (Padre, Docente, Alumno)

3. **Escribe un nombre** (ej: "Juan Pérez")

4. **Selecciona un rol** (ej: "Soy Alumno")

5. **Observa la consola del backend** - Deberías ver:
   ```
   Query ejecutada { text: 'SELECT ...', duration: ..., rows: 1 }
   Query ejecutada { text: 'INSERT INTO users ...', duration: ..., rows: 1 }
   ```

6. **Observa la consola de React Native** - Deberías ver:
   ```
   Login exitoso
   User: { id: 1, username: "Juan Pérez", ... }
   ```

7. **La app debería navegar** a la pantalla principal

---

## 🔍 Verificar que los datos están en RDS

### Opción 1: Desde el código (temporal)

Agrega esto temporalmente en algún componente para ver los datos:

```javascript
import { getUserById } from '../services/userService';

// En un useEffect o función
const checkUser = async () => {
  const result = await getUserById(1); // ID del usuario
  console.log('Usuario desde backend:', result);
};
```

### Opción 2: Consultar directamente RDS

Si tienes acceso a pgAdmin o psql:

```sql
-- Ver usuarios
SELECT * FROM users;

-- Ver reciclajes
SELECT * FROM recycling_records;

-- Ver estadísticas
SELECT username, total_points, total_recyclings, current_level 
FROM users 
ORDER BY total_points DESC;
```

---

## 🐛 Troubleshooting

### Error: "Network request failed"

**Causa:** El backend no está corriendo o la URL es incorrecta

**Solución:**
1. Verifica que el backend esté corriendo en puerto 3000
2. Verifica la URL en `src/config/api.js`
3. Si usas dispositivo físico, necesitas usar túnel o backend desplegado

### Error: "Could not connect to server"

**Causa:** El backend no puede conectar a RDS

**Solución:**
1. Verifica que RDS esté "Available" en AWS
2. Verifica Security Group permite conexiones
3. Revisa logs del backend

### No se guarda el usuario

**Causa:** Error en la llamada al backend

**Solución:**
1. Revisa la consola del backend para ver errores
2. Revisa la consola de React Native
3. Verifica que el endpoint `/api/auth/login-or-register` funcione

---

## ✅ Checklist de Verificación

- [ ] Backend corriendo en puerto 3000
- [ ] Endpoint `/health` responde correctamente
- [ ] URL del backend configurada correctamente en `api.js`
- [ ] Dependencias instaladas (`npm install`)
- [ ] App iniciada sin errores
- [ ] Puedes escribir nombre en el campo
- [ ] Al seleccionar rol, aparece "Conectando..."
- [ ] Backend recibe la petición (ver logs)
- [ ] Usuario se crea en RDS
- [ ] App navega a pantalla principal
- [ ] Usuario se guarda en AsyncStorage

---

## 📊 Flujo Completo

```
Usuario escribe nombre → Selecciona rol
    ↓
React Native: signIn(username, role)
    ↓
authService.loginOrRegister()
    ↓
POST http://localhost:3000/api/auth/login-or-register
    ↓
Backend: authController.loginOrRegister()
    ↓
Query a RDS: INSERT/SELECT users
    ↓
Backend responde: { user: {...}, message: "..." }
    ↓
AuthContext: saveUser(user)
    ↓
AsyncStorage guarda usuario
    ↓
App navega a MainTabs
```

---

## 🎯 Próximos Pasos

Una vez que esto funcione:

1. ✅ Probar registrar reciclaje (HomeScreen)
2. ✅ Probar ver ranking (LogrosScreen)
3. ✅ Probar ver perfil (PerfilScreen)
4. ✅ Desplegar backend en Render
5. ✅ Actualizar URL en producción

