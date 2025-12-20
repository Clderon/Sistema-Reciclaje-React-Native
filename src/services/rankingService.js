import { apiRequest } from '../config/api';

/**
 * Servicio de rankings
 * Obtener rankings por rol
 */

// Obtener ranking de estudiantes
export const getStudentsRanking = async (limit = 10) => {
  try {
    const response = await apiRequest(`/ranking/students?limit=${limit}`);
    return {
      success: true,
      rankings: response.rankings,
    };
  } catch (error) {
    console.error('Error en getStudentsRanking:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener ranking',
      rankings: [],
    };
  }
};

// Obtener ranking de docentes
export const getTeachersRanking = async (limit = 10) => {
  try {
    const response = await apiRequest(`/ranking/teachers?limit=${limit}`);
    return {
      success: true,
      rankings: response.rankings,
    };
  } catch (error) {
    console.error('Error en getTeachersRanking:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener ranking',
      rankings: [],
    };
  }
};

// Obtener ranking de padres
export const getParentsRanking = async (limit = 10) => {
  try {
    const response = await apiRequest(`/ranking/parents?limit=${limit}`);
    return {
      success: true,
      rankings: response.rankings,
    };
  } catch (error) {
    console.error('Error en getParentsRanking:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener ranking',
      rankings: [],
    };
  }
};

