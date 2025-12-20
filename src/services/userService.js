import { apiRequest } from '../config/api';

/**
 * Servicio de usuarios
 * Obtener y actualizar información de usuarios
 */

// Obtener usuario por ID
export const getUserById = async (userId) => {
  try {
    const response = await apiRequest(`/users/${userId}`);
    return {
      success: true,
      user: response.user,
    };
  } catch (error) {
    console.error('Error en getUserById:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener usuario',
    };
  }
};

// Actualizar perfil de usuario
export const updateUser = async (userId, updates) => {
  try {
    const response = await apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    return {
      success: true,
      user: response.user,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en updateUser:', error);
    return {
      success: false,
      error: error.message || 'Error al actualizar usuario',
    };
  }
};

