import { apiRequest } from '../config/api';

/**
 * Servicio de autenticación
 * Maneja login, registro y sesiones
 */

// Login o registro automático (recomendado)
export const loginOrRegister = async (username, role) => {
  try {
    const response = await apiRequest('/auth/login-or-register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        role, // 'student', 'parent', 'teacher'
      }),
    });

    return {
      success: true,
      user: response.user,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en loginOrRegister:', error);
    return {
      success: false,
      error: error.message || 'Error al iniciar sesión',
    };
  }
};

// Registro de nuevo usuario (con email y password)
export const register = async (username, email, password, role = 'student') => {
  try {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        role,
      }),
    });

    return {
      success: true,
      user: response.user,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en register:', error);
    return {
      success: false,
      error: error.message || 'Error al registrar usuario',
    };
  }
};

// Login de usuario existente (con email/username y password)
export const login = async (emailOrUsername, password) => {
  try {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        emailOrUsername,
        password,
      }),
    });

    return {
      success: true,
      user: response.user,
      message: response.message,
    };
  } catch (error) {
    console.error('Error en login:', error);
    return {
      success: false,
      error: error.message || 'Error al iniciar sesión',
    };
  }
};

