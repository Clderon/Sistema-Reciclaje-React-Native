import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginOrRegister, register, login as loginService } from '../services/authService';

const AuthContext = createContext(null);

// Clave para almacenar datos del usuario
const USER_STORAGE_KEY = '@sistema_reciclaje:user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar usuario en storage
  const saveUser = async (userData) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  };

  // Login o registro (método antiguo, para padres/docentes)
  const signIn = async (username, role) => {
    try {
      const result = await loginOrRegister(username, role);
      
      if (result.success) {
        await saveUser(result.user);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    }
  };

  // Registro de alumno (con email y password)
  const registerStudent = async (username, email, password) => {
    try {
      const result = await register(username, email, password, 'student');
      
      if (result.success) {
        await saveUser(result.user);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error al registrar usuario' };
    }
  };

  // Login de alumno (con email/username y password)
  const loginStudent = async (emailOrUsername, password) => {
    try {
      const result = await loginService(emailOrUsername, password);
      
      if (result.success) {
        await saveUser(result.user);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    }
  };

  // Login de docente (con email/username y password)
  const loginTeacher = async (emailOrUsername, password) => {
    try {
      const result = await loginService(emailOrUsername, password);
      
      if (result.success) {
        // Verificar que el rol sea 'teacher'
        if (result.user.role !== 'teacher') {
          return { success: false, error: 'Estas credenciales no pertenecen a un docente' };
        }
        await saveUser(result.user);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    }
  };

  // Logout
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error haciendo logout:', error);
    }
  };

  // Actualizar datos del usuario
  const updateUser = (userData) => {
    saveUser(userData);
  };

  const value = {
    user,
    loading,
    signIn,
    registerStudent,
    loginStudent,
    loginTeacher,
    signOut,
    updateUser,
    isAuthenticated: !!user,
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

