// Configuración de la API Backend
import { Platform } from 'react-native';

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN DE URL DEL BACKEND
// ═══════════════════════════════════════════════════════════
// 
// Backend desplegado en Render:
// URL: https://sistema-reciclaje-backend.onrender.com
//
// Para cambiar la URL:
// 1. Crear archivo .env en la raíz con: EXPO_PUBLIC_API_URL=https://...
// 2. O cambiar directamente URL_PRODUCCION abajo
//
// ═══════════════════════════════════════════════════════════

// URL de producción (backend desplegado en Render)
const URL_PRODUCCION = 'https://sistema-reciclaje-backend.onrender.com/api';

// URL del backend
const getApiBaseUrl = () => {
  // PRIORIDAD 1: Variable de entorno (más flexible)
  if (process.env.EXPO_PUBLIC_API_URL) {
    console.log('🌐 Usando API URL desde variable de entorno:', process.env.EXPO_PUBLIC_API_URL);
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // PRIORIDAD 2: Producción (backend desplegado en Render)
  // Por defecto usamos el backend desplegado para que funcione con Expo Go
  console.log('🌐 Usando API URL de producción (Render):', URL_PRODUCCION);
  return URL_PRODUCCION;

  // NOTA: Si necesitas usar un backend local durante desarrollo:
  // 1. Crea un archivo .env con: EXPO_PUBLIC_API_URL=http://localhost:3000/api
  // 2. O descomenta las líneas de abajo para desarrollo local
  /*
  // Desarrollo local (solo para emuladores/simuladores)
  if (__DEV__) {
    // Emulador Android
    if (Platform.OS === 'android') {
      const localUrl = 'http://10.0.2.2:3000/api';
      console.log('🌐 Usando API URL local (Android emulator):', localUrl);
      return localUrl;
    }
    // iOS Simulator
    if (Platform.OS === 'ios') {
      const localUrl = 'http://localhost:3000/api';
      console.log('🌐 Usando API URL local (iOS simulator):', localUrl);
      return localUrl;
    }
  }
  */
};

export const API_BASE_URL = getApiBaseUrl();

// Configuración de requests
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Función helper para hacer requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...API_CONFIG.headers,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: config,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

