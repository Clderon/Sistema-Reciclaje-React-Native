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

  // PRIORIDAD 2: Desarrollo local (detectar automáticamente)
  if (__DEV__) {
    console.log('🔧 Modo desarrollo detectado');
    console.log('📱 Plataforma:', Platform.OS);
    
    // Emulador Android - usar IP local de la máquina
    // IMPORTANTE: Asegúrate de que el emulador esté en la misma red
    if (Platform.OS === 'android') {
      // Usar la IP local de la máquina (misma que para dispositivo físico)
      const localUrl = 'http://192.168.100.209:3000/api';
      console.log('🌐 Usando API URL local (Android):', localUrl);
      console.log('💡 Asegúrate de que:');
      console.log('   1. El backend esté corriendo: npm run dev (en Sistema-Reciclaje-Backend)');
      console.log('   2. El firewall de Windows permita conexiones en el puerto 3000');
      console.log('   3. Si cambias de red, actualiza la IP en src/config/api.js línea 35');
      return localUrl;
    }
    // iOS Simulator o Web
    if (Platform.OS === 'ios' || Platform.OS === 'web') {
      const localUrl = 'http://localhost:3000/api';
      console.log('🌐 Usando API URL local (iOS/Web):', localUrl);
      return localUrl;
    }
    // Dispositivo físico - usar IP local
    // IMPORTANTE: Asegúrate de que tu dispositivo móvil esté en la misma red WiFi
    const localUrl = 'http://192.168.100.209:3000/api';
    console.log('🌐 Usando API URL local (dispositivo físico):', localUrl);
    console.log('💡 Asegúrate de que:');
    console.log('   1. El backend esté corriendo: npm run dev (en Sistema-Reciclaje-Backend)');
    console.log('   2. Tu dispositivo móvil esté en la misma red WiFi');
    console.log('   3. El firewall de Windows permita conexiones en el puerto 3000');
    console.log('   4. Si no funciona, actualiza la IP en src/config/api.js línea 45');
    return localUrl;
  }

  // PRIORIDAD 3: Producción (backend desplegado en Render)
  console.log('🌐 Usando API URL de producción (Render):', URL_PRODUCCION);
  return URL_PRODUCCION;
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

  // Log para debugging
  if (__DEV__) {
    console.log(`📡 API Request: ${options.method || 'GET'} ${url}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: config,
    });

    // Verificar si la respuesta es JSON antes de parsear
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      // Intentar parsear como JSON
      try {
        data = await response.json();
      } catch (jsonError) {
        // Si falla el parseo JSON, leer como texto para debug
        const textResponse = await response.text();
        console.error('Error parseando JSON. Respuesta del servidor:', textResponse.substring(0, 200));
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }
    } else {
      // Si no es JSON, leer como texto
      const textResponse = await response.text();
      console.error('Respuesta no es JSON. Respuesta del servidor:', textResponse.substring(0, 200));
      throw new Error(`El servidor devolvió una respuesta no válida: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `Error en la petición: ${response.status} ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('❌ API Request Error:', error);
    console.error('📡 URL intentada:', url);
    
    // Mensajes de error más específicos
    if (error.message.includes('Network request failed') || error.message.includes('Failed to fetch')) {
      const errorMsg = `No se pudo conectar al backend en ${url}\n\n` +
        `Verifica:\n` +
        `1. El backend está corriendo: npm run dev (en Sistema-Reciclaje-Backend)\n` +
        `2. La IP es correcta: ${url.replace('/api', '')}\n` +
        `3. Tu dispositivo está en la misma red WiFi\n` +
        `4. El firewall permite conexiones en puerto 3000`;
      throw new Error(errorMsg);
    }
    
    if (error.message.includes('JSON Parse error') || error.message.includes('Unexpected character')) {
      throw new Error('El servidor no respondió correctamente. Verifica que el backend esté funcionando.');
    }
    throw error;
  }
};

