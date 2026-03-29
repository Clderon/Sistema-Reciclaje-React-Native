import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginOrRegister, register, login as loginService } from '../services/authService';
import { setToken, clearToken, onTokenExpired } from '../config/tokenStore';

const AuthContext = createContext(null);

const USER_STORAGE_KEY  = '@sistema_reciclaje:user';
const TOKEN_STORAGE_KEY = '@sistema_reciclaje:token';

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión guardada al iniciar la app
  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const [userData, tokenData] = await Promise.all([
        AsyncStorage.getItem(USER_STORAGE_KEY),
        AsyncStorage.getItem(TOKEN_STORAGE_KEY),
      ]);

      if (userData && tokenData) {
        setToken(tokenData);          // disponible para api.js de forma síncrona
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error cargando sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guarda usuario + token en estado y en AsyncStorage
  const saveSession = async (userData, token) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData)),
        AsyncStorage.setItem(TOKEN_STORAGE_KEY, token),
      ]);
      setToken(token);
      setUser(userData);
    } catch (error) {
      console.error('Error guardando sesión:', error);
    }
  };

  // Registrar el logout como callback para cuando el token expire (401)
  // Se registra una vez al montar el provider
  useEffect(() => {
    onTokenExpired(() => {
      // Token expirado en el backend → limpiar sesión local
      AsyncStorage.multiRemove([USER_STORAGE_KEY, TOKEN_STORAGE_KEY]);
      setUser(null);
    });
  }, []);

  // ─── Métodos de autenticación ────────────────────────────────────

  // Login/registro rápido (padres y docentes)
  const signIn = async (username, role) => {
    try {
      const result = await loginOrRegister(username, role);
      if (result.success) {
        await saveSession(result.user, result.token);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    }
  };

  // Registro de alumno (con email y password)
  const registerStudent = async (username, email, password) => {
    try {
      const result = await register(username, email, password, 'student');
      if (result.success) {
        await saveSession(result.user, result.token);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: error.message || 'Error al registrar usuario' };
    }
  };

  // Login de alumno (con email/username y password)
  const loginStudent = async (emailOrUsername, password) => {
    try {
      const result = await loginService(emailOrUsername, password);
      if (result.success) {
        await saveSession(result.user, result.token);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    }
  };

  // Login de docente — igual que alumno pero valida el rol
  const loginTeacher = async (emailOrUsername, password) => {
    try {
      const result = await loginService(emailOrUsername, password);
      if (result.success) {
        if (result.user.role !== 'teacher') {
          return { success: false, error: 'Estas credenciales no pertenecen a un docente' };
        }
        await saveSession(result.user, result.token);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    }
  };

  // Logout manual
  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove([USER_STORAGE_KEY, TOKEN_STORAGE_KEY]);
      clearToken();
      setUser(null);
    } catch (error) {
      console.error('Error haciendo logout:', error);
    }
  };

  // Actualizar datos del usuario sin cambiar el token
  const updateUser = async (userData) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    registerStudent,
    loginStudent,
    loginTeacher,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
