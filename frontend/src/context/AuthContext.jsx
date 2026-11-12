import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const persistSession = useCallback((token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await authApi.getMe();
      setUser(data.data.user);
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const register = async (formData) => {
    setError(null);
    const { data } = await authApi.register(formData);
    persistSession(data.data.token, data.data.user);
    return data.data;
  };

  const login = async (formData) => {
    setError(null);
    const { data } = await authApi.login(formData);
    persistSession(data.data.token, data.data.user);
    return data.data;
  };

  const logout = () => {
    clearSession();
  };

  const updateProfile = async (updates) => {
    const { data } = await authApi.updateProfile(updates);
    setUser(data.data.user);
    return data.data.user;
  };

  const value = {
    user,
    loading,
    error,
    setError,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    refreshUser: loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
