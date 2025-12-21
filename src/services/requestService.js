import { apiRequest } from '../config/api';

/**
 * Servicio de peticiones de revisión
 * Gestionar peticiones enviadas por estudiantes y revisadas por docentes
 */

// Crear petición de revisión (estudiante)
export const createRequest = async (userId, categoryId, quantity, unit, evidenceImageUrl) => {
  try {
    const response = await apiRequest('/requests', {
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
      request: response.request,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en createRequest:', error);
    return {
      success: false,
      error: error.message || 'Error al crear petición',
    };
  }
};

// Obtener peticiones pendientes (docente)
export const getPendingRequests = async (limit = 20, offset = 0) => {
  try {
    const response = await apiRequest(
      `/requests/pending?limit=${limit}&offset=${offset}`
    );

    return {
      success: true,
      requests: response.requests,
      pagination: response.pagination,
    };
  } catch (error) {
    console.error('Error en getPendingRequests:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener peticiones',
      requests: [],
      pagination: { total: 0, limit, offset, hasMore: false },
    };
  }
};

// Aprobar petición (docente)
export const approveRequest = async (requestId, teacherId, points = null) => {
  try {
    const body = { teacherId };
    if (points !== null) {
      body.points = points;
    }

    const response = await apiRequest(`/requests/${requestId}/approve`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return {
      success: true,
      request: response.request,
      studentStats: response.studentStats,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en approveRequest:', error);
    return {
      success: false,
      error: error.message || 'Error al aprobar petición',
    };
  }
};

// Rechazar petición (docente)
export const rejectRequest = async (requestId, teacherId, message = null) => {
  try {
    const response = await apiRequest(`/requests/${requestId}/reject`, {
      method: 'POST',
      body: JSON.stringify({
        teacherId,
        message,
      }),
    });

    return {
      success: true,
      request: response.request,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en rejectRequest:', error);
    return {
      success: false,
      error: error.message || 'Error al rechazar petición',
    };
  }
};

