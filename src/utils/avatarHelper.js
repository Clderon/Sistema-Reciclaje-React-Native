/**
 * Utilidad para asignar avatares aleatorios pero consistentes
 * Basado en el ID del usuario para que siempre tenga el mismo avatar
 */

// Lista de avatares disponibles
const AVAILABLE_AVATARS = [
  require('../assets/images/elefante.webp'),
  require('../assets/images/sajino.webp'),
  require('../assets/images/serpiente.webp'),
  require('../assets/images/tucan.webp'),
  require('../assets/images/oso-perezoso.webp'),
];

/**
 * Obtiene un avatar aleatorio pero consistente basado en el ID del usuario
 * @param {number|string} userId - ID del usuario
 * @param {string|null} avatarUrl - URL del avatar del usuario (si existe, se usa en lugar del aleatorio)
 * @returns {object} - Objeto require() del avatar a usar
 */
export const getUserAvatar = (userId, avatarUrl = null) => {
  // Si el usuario tiene avatar_url, deberíamos usarlo (para implementación futura)
  // Por ahora, ignoramos avatarUrl y usamos siempre avatares aleatorios consistentes
  
  if (!userId) {
    // Si no hay ID, retornar un avatar por defecto
    return AVAILABLE_AVATARS[0];
  }

  // Usar el ID para seleccionar de forma determinística un avatar
  // Esto asegura que el mismo usuario siempre tenga el mismo avatar
  const avatarIndex = Number(userId) % AVAILABLE_AVATARS.length;
  return AVAILABLE_AVATARS[avatarIndex];
};

/**
 * Obtiene un avatar aleatorio (para casos donde no hay ID de usuario)
 * @returns {object} - Objeto require() del avatar a usar
 */
export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_AVATARS.length);
  return AVAILABLE_AVATARS[randomIndex];
};

