# Guía para Generar APK Instalable

## Opciones para Compartir/Probar tu App

### 📱 Opción 1: Compartir con Expo Go (Rápido - Para Pruebas)

**Ventajas:**
- ✅ Gratis y rápido
- ✅ No requiere configuración adicional
- ✅ Ideal para pruebas iniciales

**Desventajas:**
- ❌ Requiere que el usuario instale Expo Go
- ❌ No es un APK "real"
- ❌ Limitado a funcionalidades de Expo

**Pasos:**
1. Asegúrate de que tu servidor Expo esté corriendo:
   ```bash
   npm start
   ```

2. Presiona `s` para compartir, o usa:
   ```bash
   npx expo start --tunnel
   ```

3. Comparte el código QR con quien quieras que pruebe la app
4. Los usuarios deben:
   - Instalar "Expo Go" desde Google Play Store
   - Escanear el código QR
   - La app se abrirá en Expo Go

---

### 📦 Opción 2: EAS Build - APK Instalable (Recomendado)

**Ventajas:**
- ✅ APK real e instalable
- ✅ No requiere Expo Go
- ✅ Puedes publicar en Play Store
- ✅ Build en la nube (gratis con límite)

**Desventajas:**
- ⚠️ Requiere cuenta de Expo (gratis)
- ⚠️ Primer build tarda ~15-20 minutos

#### Pasos para generar APK:

1. **Instalar EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Iniciar sesión en Expo:**
   ```bash
   eas login
   ```
   (Si no tienes cuenta, créala en https://expo.dev)

3. **Configurar el proyecto:**
   ```bash
   eas build:configure
   ```
   Esto creará un archivo `eas.json` con la configuración.

4. **Construir APK para Android:**
   ```bash
   eas build --platform android --profile preview
   ```
   
   O para generar APK directamente (más rápido para pruebas):
   ```bash
   eas build --platform android --profile preview --local
   ```
   (Requiere Android SDK instalado localmente)

5. **Descargar el APK:**
   - El build se ejecutará en la nube
   - Recibirás un link para descargar el APK cuando termine
   - Tarda aproximadamente 15-20 minutos la primera vez

6. **Compartir el APK:**
   - Descarga el archivo `.apk`
   - Compártelo por WhatsApp, email, Drive, etc.
   - Los usuarios deben permitir "Instalar desde fuentes desconocidas" en su Android

#### Configuración de `eas.json` (se crea automáticamente):

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

---

### 🔧 Opción 3: Development Build (Avanzado)

Para testing con plugins nativos personalizados.

---

## Recomendación

Para **pruebas rápidas iniciales**: Usa **Expo Go** (Opción 1)

Para **distribución real/Play Store**: Usa **EAS Build** (Opción 2)

---

## Notas Importantes

1. **Backend debe estar desplegado**: Asegúrate de que tu backend en Render esté activo y accesible desde internet.

2. **Variables de entorno**: Si usas variables de entorno, configúralas en `app.json` o en EAS Build secrets.

3. **Icono y Splash**: Ya están configurados en `app.json`.

4. **Versión**: Actualiza `"version"` en `app.json` cada vez que generes un nuevo build.

---

## Comandos Rápidos

```bash
# Desarrollo con Expo Go
npm start

# Build APK (requiere configuración previa)
eas build --platform android --profile preview

# Ver builds anteriores
eas build:list

# Ver estado del build actual
eas build:view
```

---

## Links Útiles

- [Expo Build Docs](https://docs.expo.dev/build/introduction/)
- [EAS Build Dashboard](https://expo.dev/accounts/[tu-usuario]/projects/sistema-reciclaje-react/builds)
- [Crear cuenta Expo](https://expo.dev/signup)

