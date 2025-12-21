# Configuración para Emulador Android

Si estás usando un emulador Android y tienes problemas de conexión con el backend local, sigue estos pasos:

## 🔧 Solución 1: Usar adb reverse (Recomendado)

Esta es la forma más confiable de conectar el emulador Android con tu backend local.

### Pasos:

1. **Asegúrate de que Android SDK Platform Tools esté instalado**
   - Si usas Android Studio, ya debería estar instalado
   - Ruta típica: `C:\Users\TU_USUARIO\AppData\Local\Android\Sdk\platform-tools`

2. **Abre PowerShell o CMD y ejecuta:**
   ```powershell
   # Agregar adb al PATH (solo una vez, o agregar permanentemente)
   $env:Path += ";C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools"
   
   # Verificar que adb funciona
   adb version
   
   # Configurar el reverse port forwarding
   adb reverse tcp:3000 tcp:3000
   ```

3. **Crear archivo `.env` en la raíz del proyecto React** (Sistema-Reciclaje-React):
   ```env
   EXPO_PUBLIC_USE_LOCALHOST=true
   ```

4. **Reiniciar el servidor de Expo:**
   ```bash
   # Detener el servidor actual (Ctrl+C)
   # Luego reiniciar
   npm start
   ```

5. **Verificar que funciona:**
   - El emulador ahora usará `http://localhost:3000/api` en lugar de `10.0.2.2:3000`
   - Deberías ver en los logs: "🌐 Usando API URL local (Android con adb reverse)"

### ⚠️ Nota importante:
- Debes ejecutar `adb reverse tcp:3000 tcp:3000` cada vez que reinicies el emulador
- Puedes crear un script para automatizarlo (ver abajo)

## 🔧 Solución 2: Script automático para adb reverse

Crea un archivo `setup-android.ps1` en la raíz del proyecto React:

```powershell
# setup-android.ps1
Write-Host "🔧 Configurando adb reverse para Android..." -ForegroundColor Yellow

# Agregar adb al PATH si no está
$adbPath = "$env:LOCALAPPDATA\Android\Sdk\platform-tools"
if (Test-Path $adbPath) {
    $env:Path += ";$adbPath"
} else {
    Write-Host "❌ No se encontró Android SDK Platform Tools" -ForegroundColor Red
    Write-Host "💡 Instala Android Studio o agrega la ruta manualmente" -ForegroundColor Yellow
    exit 1
}

# Verificar que adb funciona
$adbVersion = adb version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error ejecutando adb" -ForegroundColor Red
    exit 1
}

# Configurar reverse port forwarding
Write-Host "📡 Configurando adb reverse tcp:3000 tcp:3000..." -ForegroundColor Cyan
adb reverse tcp:3000 tcp:3000

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ adb reverse configurado correctamente" -ForegroundColor Green
    Write-Host "💡 Ahora crea un archivo .env con: EXPO_PUBLIC_USE_LOCALHOST=true" -ForegroundColor Yellow
} else {
    Write-Host "❌ Error configurando adb reverse" -ForegroundColor Red
    Write-Host "💡 Asegúrate de que el emulador esté corriendo" -ForegroundColor Yellow
}
```

Ejecutar:
```powershell
PowerShell -ExecutionPolicy Bypass -File .\setup-android.ps1
```

## 🔧 Solución 3: Usar la IP de tu máquina (Alternativa)

Si `adb reverse` no funciona, puedes usar la IP local de tu máquina:

1. **Obtener tu IP local:**
   ```powershell
   ipconfig | findstr /i "IPv4"
   ```

2. **Actualizar `src/config/api.js`:**
   - Cambiar la línea 35 de `http://10.0.2.2:3000/api` a `http://TU_IP_LOCAL:3000/api`
   - Ejemplo: `http://192.168.100.209:3000/api`

3. **Asegurarte de que el firewall permita conexiones en el puerto 3000**
   - Ver instrucciones en `Sistema-Reciclaje-Backend/README.md` sección Troubleshooting

## ✅ Verificación

Para verificar que todo funciona:

1. **Backend corriendo:**
   ```bash
   cd Sistema-Reciclaje-Backend
   npm run dev
   ```

2. **Probar desde el emulador:**
   - Abre el navegador en el emulador
   - Ve a: `http://localhost:3000/health` (si usas adb reverse)
   - O: `http://10.0.2.2:3000/health` (si no usas adb reverse)
   - Debe mostrar: `{"status":"ok","message":"Sistema de Reciclaje API is running",...}`

3. **Ver logs en el frontend:**
   - Deberías ver en la consola de Expo: "🌐 Usando API URL local..."

## 🐛 Troubleshooting

### Error: "adb no se reconoce como comando"
- Instala Android Studio o agrega la ruta de platform-tools al PATH
- Ruta típica: `C:\Users\TU_USUARIO\AppData\Local\Android\Sdk\platform-tools`

### Error: "No devices/emulators found"
- Asegúrate de que el emulador esté corriendo
- Ejecuta: `adb devices` para verificar

### Error: "Network request failed" después de configurar adb reverse
- Verifica que el backend esté corriendo
- Verifica que el archivo `.env` tenga `EXPO_PUBLIC_USE_LOCALHOST=true`
- Reinicia el servidor de Expo después de crear/modificar `.env`

### El emulador sigue usando 10.0.2.2
- Verifica que el archivo `.env` esté en la raíz de `Sistema-Reciclaje-React`
- Reinicia completamente el servidor de Expo (no solo recargar)
- Verifica que `.env` tenga exactamente: `EXPO_PUBLIC_USE_LOCALHOST=true` (sin espacios)

