import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache para los sonidos cargados
const soundCache = {};
let audioModeSet = false;
const SOUND_ENABLED_KEY = '@sound_enabled';

// Estado global de sonido (por defecto activado)
let soundEnabled = true;

/**
 * Carga la preferencia de sonido desde AsyncStorage
 */
export const loadSoundPreference = async () => {
  try {
    const value = await AsyncStorage.getItem(SOUND_ENABLED_KEY);
    soundEnabled = value !== null ? value === 'true' : true; // Por defecto activado
    return soundEnabled;
  } catch (error) {
    console.warn('Error al cargar preferencia de sonido:', error);
    return true; // Por defecto activado
  }
};

/**
 * Guarda la preferencia de sonido en AsyncStorage
 */
export const saveSoundPreference = async (enabled) => {
  try {
    soundEnabled = enabled;
    await AsyncStorage.setItem(SOUND_ENABLED_KEY, enabled.toString());
  } catch (error) {
    console.warn('Error al guardar preferencia de sonido:', error);
  }
};

/**
 * Obtiene el estado actual de sonido
 */
export const isSoundEnabled = () => soundEnabled;

// Mapeo de nombres de sonidos a sus require estáticos
const soundMap = {
  'pop.mp3': require('../../assets/sounds/pop.mp3'),
  'button-click-2.wav': require('../../assets/sounds/button-click-2.wav'),
  'success-sound-bandage.mp3': require('../../assets/sounds/success-sound-bandage.mp3'),
  'calm_background_loop.wav': require('../../assets/sounds/calm_background_loop.wav'),
};

/**
 * Inicializa el modo de audio (solo se ejecuta una vez)
 */
const initializeAudio = async () => {
  if (audioModeSet) return;
  
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    audioModeSet = true;
  } catch (error) {
    console.warn('Error al inicializar modo de audio:', error);
  }
};

/**
 * Reproduce un sonido desde la carpeta assets/sounds
 * @param {string} soundName - Nombre del archivo de sonido (ej: 'pop.mp3')
 * @param {object} options - Opciones de reproducción
 * @param {number} options.volume - Volumen (0.0 a 1.0, default: 0.5)
 * @param {boolean} options.shouldPlay - Si debe reproducirse (default: true)
 */
export const playSound = async (soundName, options = {}) => {
  const { volume = 0.5, shouldPlay = true } = options;

  // Verificar si el sonido está habilitado
  if (!soundEnabled || !shouldPlay) return;

  try {
    // Inicializar modo de audio si no se ha hecho
    await initializeAudio();

    // Obtener el require estático del mapa
    const soundSource = soundMap[soundName];
    
    if (!soundSource) {
      console.warn(`Sonido ${soundName} no encontrado en el mapa`);
      return;
    }

    // Verificar si el sonido ya está en cache
    let sound = soundCache[soundName];

    if (sound) {
      // Si existe, verificar estado y resetear si es necesario
      try {
        const status = await sound.getStatusAsync();
        
        if (status.isLoaded) {
          // Si está reproduciéndose, detenerlo
          if (status.isPlaying) {
            await sound.stopAsync();
          }
          // Resetear posición y volumen
          await sound.setPositionAsync(0);
          await sound.setVolumeAsync(volume);
          await sound.playAsync();
          return;
        }
      } catch (error) {
        // Si hay error, limpiar del cache y crear uno nuevo
        delete soundCache[soundName];
        sound = null;
      }
    }

    // Crear nuevo sonido si no existe o hubo error
    if (!sound) {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        soundSource,
        { 
          shouldPlay: false,
          isLooping: false,
        }
      );
      sound = soundObject;
      soundCache[soundName] = sound;
    }

    // Configurar volumen y reproducir
    await sound.setVolumeAsync(volume);
    await sound.setPositionAsync(0);
    await sound.playAsync();
  } catch (error) {
    console.warn(`Error al reproducir sonido ${soundName}:`, error);
    // Limpiar del cache si hay error
    if (soundCache[soundName]) {
      try {
        await soundCache[soundName].unloadAsync();
      } catch (e) {}
      delete soundCache[soundName];
    }
  }
};

/**
 * Reproduce el sonido de click de botón (uso general para todo)
 * Usado en: botones, categorías, navbar, modales, etc.
 * @param {object} options - Opciones de reproducción
 */
export const playPopSound = (options = {}) => {
  return playSound('button-click-2.wav', { volume: 0.3, ...options });
};

/**
 * Reproduce sonido de logro/badge desbloqueado (sonido especial)
 * Usado solo cuando se obtiene una insignia/logro
 * @param {object} options - Opciones de reproducción
 */
export const playAchievementSound = (options = {}) => {
  return playSound('success-sound-bandage.mp3', { volume: 0.5, ...options });
};

/**
 * Limpia el cache de sonidos
 */
export const clearSoundCache = async () => {
  for (const soundName in soundCache) {
    try {
      await soundCache[soundName].unloadAsync();
    } catch (error) {
      console.warn(`Error al limpiar sonido ${soundName}:`, error);
    }
  }
  Object.keys(soundCache).forEach(key => delete soundCache[key]);
};

// ============================================
// SISTEMA DE MÚSICA DE FONDO
// ============================================

const MUSIC_ENABLED_KEY = '@music_enabled';
const MUSIC_VOLUME_KEY = '@music_volume';
let backgroundMusic = null;
let musicEnabled = true;
let musicVolume = 0.20; // Volumen por defecto (20%)
let isMusicPlaying = false; // Flag para evitar múltiples reproducciones
let musicInstanceId = 0; // ID único para rastrear la instancia actual

/**
 * Carga las preferencias de música desde AsyncStorage
 */
export const loadMusicPreferences = async () => {
  try {
    const enabled = await AsyncStorage.getItem(MUSIC_ENABLED_KEY);
    const volume = await AsyncStorage.getItem(MUSIC_VOLUME_KEY);
    musicEnabled = enabled !== null ? enabled === 'true' : true;
    musicVolume = volume !== null ? parseFloat(volume) : 0.15;
    return { enabled: musicEnabled, volume: musicVolume };
  } catch (error) {
    console.warn('Error al cargar preferencias de música:', error);
    return { enabled: true, volume: 0.15 };
  }
};

/**
 * Guarda las preferencias de música en AsyncStorage
 */
export const saveMusicPreferences = async (enabled, volume = null) => {
  try {
    musicEnabled = enabled;
    if (volume !== null) {
      musicVolume = volume;
      await AsyncStorage.setItem(MUSIC_VOLUME_KEY, volume.toString());
    }
    await AsyncStorage.setItem(MUSIC_ENABLED_KEY, enabled.toString());
    
    // Si se desactiva la música, detenerla inmediatamente
    if (!enabled) {
      await stopBackgroundMusic();
    }
    // Si se activa, NO iniciar aquí - se iniciará automáticamente desde App.js
    // o desde el componente que llama a playBackgroundMusic
  } catch (error) {
    console.warn('Error al guardar preferencias de música:', error);
  }
};

/**
 * Reproduce música de fondo
 * @param {string} musicName - Nombre del archivo de música
 * @param {object} options - Opciones de reproducción
 * @param {number} options.volume - Volumen (0.0 a 1.0, default: 0.3)
 * @param {boolean} options.loop - Si debe repetirse (default: true)
 */
export const playBackgroundMusic = async (musicName, options = {}) => {
  const { volume = musicVolume, loop = true } = options;

  // PASO 1: Verificar si la música está habilitada PRIMERO
  if (!musicEnabled) {
    // Si está deshabilitada, asegurarse de que no hay música reproduciéndose
    await stopBackgroundMusic();
    return;
  }

  // PASO 2: SIEMPRE detener cualquier música existente primero
  // Esto es crítico durante hot reload - siempre reinicia desde el principio
  await stopBackgroundMusic();
  
  // Delay para asegurar que se detuvo completamente antes de iniciar nueva
  await new Promise(resolve => setTimeout(resolve, 150));

  // PASO 3: Incrementar ID para esta nueva instancia (protección contra hot reload)
  musicInstanceId++;
  const newInstanceId = musicInstanceId;

  try {
    // Inicializar modo de audio
    await initializeAudio();

    // Obtener el require estático del mapa
    const musicSource = soundMap[musicName];
    
    if (!musicSource) {
      console.warn(`Música ${musicName} no encontrada en el mapa`);
      isMusicPlaying = false;
      return;
    }

    // Marcar que vamos a reproducir música ANTES de crear
    isMusicPlaying = true;

    // Crear y reproducir música
    const { sound } = await Audio.Sound.createAsync(
      musicSource,
      { 
        shouldPlay: true,
        isLooping: loop,
        volume: volume,
      }
    );
    
    // Verificar que esta instancia sigue siendo la válida (protección contra hot reload)
    if (newInstanceId !== musicInstanceId) {
      // Se creó otra instancia durante la creación, limpiar esta
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (e) {
        // Ignorar errores
      }
      isMusicPlaying = false;
      return;
    }
    
    // Verificar una vez más que esta instancia sigue siendo la válida
    if (newInstanceId !== musicInstanceId) {
      // Se creó otra instancia durante la creación, limpiar esta
      // console.warn('⚠️ Se creó otra instancia durante la creación, limpiando esta...');
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (e) {
        // Ignorar errores
      }
      isMusicPlaying = false;
      return;
    }
    
    // Asignar la nueva instancia
    backgroundMusic = sound;
    
    // console.log('✅ Música de fondo iniciada correctamente (ID:', newInstanceId, ')');
    
    // Verificar que realmente se está reproduciendo después de un pequeño delay
    setTimeout(async () => {
      // Verificar que esta instancia sigue siendo la válida
      if (newInstanceId !== musicInstanceId || backgroundMusic !== sound) {
        return; // Ya no es la instancia válida
      }
      
      try {
        const status = await sound.getStatusAsync();
        if (!status.isPlaying) {
          isMusicPlaying = false;
          if (backgroundMusic === sound) {
            backgroundMusic = null;
          }
        }
      } catch (error) {
        isMusicPlaying = false;
        if (backgroundMusic === sound) {
          backgroundMusic = null;
        }
      }
    }, 100);
  } catch (error) {
    isMusicPlaying = false;
    backgroundMusic = null;
    console.warn(`Error al reproducir música de fondo ${musicName}:`, error);
  }
};

/**
 * Detiene TODAS las instancias de música de fondo de forma agresiva
 * Útil durante hot reload para limpiar instancias huérfanas
 * NOTA: No incrementa musicInstanceId aquí, se hace en playBackgroundMusic
 */
const forceStopAllMusic = async () => {
  if (backgroundMusic) {
    const musicToStop = backgroundMusic; // Guardar referencia
    backgroundMusic = null; // Limpiar referencia inmediatamente para evitar race conditions
    isMusicPlaying = false;
    
    // Intentar múltiples veces para asegurar que se detiene
    for (let i = 0; i < 3; i++) {
      try {
        // Verificar estado primero
        try {
          const status = await musicToStop.getStatusAsync();
          if (status.isLoaded) {
            // Si está reproduciéndose, detener primero
            if (status.isPlaying) {
              try {
                await musicToStop.stopAsync();
              } catch (e) {
                // Ignorar si ya está detenida
              }
            }
            // Siempre intentar descargar
            try {
              await musicToStop.unloadAsync();
              break; // Si se descargó exitosamente, salir del loop
            } catch (e) {
              // Si falla, esperar un poco y reintentar
              if (i < 2) {
                await new Promise(resolve => setTimeout(resolve, 50));
              }
            }
          } else {
            // Si no está cargada, ya está detenida
            break;
          }
        } catch (e) {
          // Si falla la verificación, intentar directamente descargar
          try {
            await musicToStop.unloadAsync();
            break;
          } catch (e2) {
            // Si falla, esperar un poco y reintentar
            if (i < 2) {
              await new Promise(resolve => setTimeout(resolve, 50));
            }
          }
        }
      } catch (error) {
        // Si falla completamente, esperar y reintentar
        if (i < 2) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
  } else {
    isMusicPlaying = false;
  }
};

/**
 * Detiene la música de fondo
 */
export const stopBackgroundMusic = async () => {
  // console.log('🛑 Deteniendo música de fondo...');
  await forceStopAllMusic();
  // Asegurar que el flag esté en false
  isMusicPlaying = false;
  backgroundMusic = null;
};

/**
 * Pausa la música de fondo
 */
export const pauseBackgroundMusic = async () => {
  if (backgroundMusic) {
    try {
      await backgroundMusic.pauseAsync();
      isMusicPlaying = false;
    } catch (error) {
      console.warn('Error al pausar música de fondo:', error);
    }
  }
};

/**
 * Reanuda la música de fondo
 */
export const resumeBackgroundMusic = async () => {
  if (backgroundMusic && musicEnabled) {
    try {
      await backgroundMusic.playAsync();
      isMusicPlaying = true;
    } catch (error) {
      console.warn('Error al reanudar música de fondo:', error);
      isMusicPlaying = false;
    }
  }
};

/**
 * Obtiene el estado actual de la música
 */
export const isMusicEnabled = () => musicEnabled;
export const getMusicVolume = () => musicVolume;

