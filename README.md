# Sistema Reciclaje - React Native

Aplicación móvil para el sistema de reciclaje desarrollada con React Native y Expo.

## Estructura del Proyecto

```
Sistema-Reciclaje-React/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── screens/         # Pantallas de la aplicación
│   ├── navigation/      # Configuración de navegación
│   ├── assets/          # Recursos (imágenes, fuentes, etc.)
│   │   └── images/      # Imágenes
│   ├── utils/           # Utilidades y funciones auxiliares
│   ├── services/        # Servicios y llamadas a API
│   └── context/         # Context API para estado global
├── App.js               # Componente principal
├── package.json         # Dependencias del proyecto
└── README.md           # Este archivo
```

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Exponer el puerto para poder utilizar Expo Go

```bash
npx expo start -c --tunnel
```
3. Inicia el proyecto:
```bash
npm start
```

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en navegador web

## Pantallas

- **HomeScreen**: Pantalla principal con categorías de reciclaje
- **LogrosScreen**: Pantalla de logros y trofeos
- **PerfilScreen**: Pantalla de perfil de usuario

## Próximos Pasos

1. Copiar las imágenes de `Sistema-Reciclaje/img/` a `src/assets/images/`
2. Crear los componentes reutilizables (Button, Card, Modal, etc.)
3. Implementar la lógica de negocio en cada pantalla
4. Configurar los servicios de API si es necesario

