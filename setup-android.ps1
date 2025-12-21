# Script para configurar adb reverse en Android
# Ejecutar: PowerShell -ExecutionPolicy Bypass -File .\setup-android.ps1

Write-Host "🔧 Configurando adb reverse para Android..." -ForegroundColor Yellow

# Agregar adb al PATH si no está
$adbPath = "$env:LOCALAPPDATA\Android\Sdk\platform-tools"
if (Test-Path $adbPath) {
    $env:Path += ";$adbPath"
    Write-Host "✅ Android SDK Platform Tools encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ No se encontró Android SDK Platform Tools en: $adbPath" -ForegroundColor Red
    Write-Host "💡 Instala Android Studio o agrega la ruta manualmente" -ForegroundColor Yellow
    Write-Host "💡 Ruta alternativa: C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools" -ForegroundColor Yellow
    exit 1
}

# Verificar que adb funciona
Write-Host "🔍 Verificando adb..." -ForegroundColor Cyan
$adbVersion = adb version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error ejecutando adb" -ForegroundColor Red
    exit 1
}
Write-Host "✅ adb funciona correctamente" -ForegroundColor Green

# Verificar que hay dispositivos conectados
Write-Host "📱 Verificando dispositivos conectados..." -ForegroundColor Cyan
$devices = adb devices
if ($devices -notmatch "device$") {
    Write-Host "⚠️  No se encontraron dispositivos/emuladores conectados" -ForegroundColor Yellow
    Write-Host "💡 Asegúrate de que el emulador Android esté corriendo" -ForegroundColor Yellow
    Write-Host "💡 Ejecuta 'adb devices' para verificar" -ForegroundColor Yellow
} else {
    Write-Host "✅ Dispositivo encontrado" -ForegroundColor Green
}

# Configurar reverse port forwarding
Write-Host "📡 Configurando adb reverse tcp:3000 tcp:3000..." -ForegroundColor Cyan
adb reverse tcp:3000 tcp:3000

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ adb reverse configurado correctamente" -ForegroundColor Green
    Write-Host "" -ForegroundColor White
    Write-Host "📝 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "   1. Crea un archivo .env en la raíz de Sistema-Reciclaje-React" -ForegroundColor White
    Write-Host "   2. Agrega: EXPO_PUBLIC_USE_LOCALHOST=true" -ForegroundColor White
    Write-Host "   3. Reinicia el servidor de Expo (Ctrl+C y luego npm start)" -ForegroundColor White
    Write-Host "" -ForegroundColor White
    Write-Host "💡 Nota: Debes ejecutar este script cada vez que reinicies el emulador" -ForegroundColor Cyan
} else {
    Write-Host "❌ Error configurando adb reverse" -ForegroundColor Red
    Write-Host "💡 Asegúrate de que el emulador esté corriendo" -ForegroundColor Yellow
    exit 1
}

