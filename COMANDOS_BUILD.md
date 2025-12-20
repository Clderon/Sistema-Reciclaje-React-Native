# Comandos para Generar APK

## Paso 1: Login (ya completado ✅)
```bash
npx eas-cli login
```

## Paso 2: Configurar (ya está hecho ✅)
El archivo `eas.json` ya está configurado correctamente.

## Paso 3: Generar APK
```bash
npx eas-cli build --platform android --profile preview
```

Este comando:
- ✅ Construirá tu app en la nube de Expo
- ⏱️ Tardará aproximadamente 15-20 minutos
- 📱 Generará un APK que puedes instalar directamente
- 🔗 Te dará un link para descargar el APK cuando termine

## Ver el progreso del build

Puedes ver el estado del build en:
- La terminal donde ejecutaste el comando
- O en tu navegador: https://expo.dev/accounts/[tu-usuario]/projects/sistema-reciclaje-react/builds

## Cuando termine

1. Recibirás un link para descargar el APK
2. Descarga el archivo `.apk`
3. Compártelo con quien quieras
4. Para instalar: Los usuarios deben permitir "Instalar desde fuentes desconocidas" en su Android

## Notas importantes

⚠️ **Asegúrate de que tu backend esté desplegado** en Render y accesible desde internet.

⚠️ El primer build siempre tarda más tiempo (15-20 min), los siguientes son más rápidos.

