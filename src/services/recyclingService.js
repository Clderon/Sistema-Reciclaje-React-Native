import { apiRequest } from '../config/api';

/**
 * Servicio de reciclaje
 * Registrar reciclajes y obtener historial
 */

// Registrar nuevo reciclaje
export const createRecycling = async (userId, categoryId, quantity, unit, evidenceImageUrl = null) => {
  try {
    const response = await apiRequest('/recycling', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        categoryId,
        quantity,
        unit,
        evidenceImageUrl,
      }),
    });

    return {
      success: true,
      recycling: response.recycling,
      userStats: response.userStats,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en createRecycling:', error);
    return {
      success: false,
      error: error.message || 'Error al registrar reciclaje',
    };
  }
};

// Obtener historial de reciclajes de un usuario
export const getUserRecyclingHistory = async (userId, limit = 50, offset = 0) => {
  try {
    const response = await apiRequest(
      `/recycling/user/${userId}?limit=${limit}&offset=${offset}`
    );

    return {
      success: true,
      recyclings: response.recyclings,
      pagination: response.pagination,
    };
  } catch (error) {
    console.error('Error en getUserRecyclingHistory:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener historial',
      recyclings: [],
      pagination: { total: 0, limit, offset },
    };
  }
};

