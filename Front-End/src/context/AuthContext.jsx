import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token guardado al cargar la aplicación
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      apiService.setToken(token);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await apiService.register(userData);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      apiService.removeToken();
      apiService.clearCache(); // Limpiar cache al cerrar sesión
    }
  }, []);

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  }), [user, login, register, logout, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};