import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/adminAPI.js';

export const useAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('adminToken');
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authAPI.login(email, password);
      if (result.success) {
        localStorage.setItem('adminToken', result.token);
        setIsLoggedIn(true);
        navigate('/dashboard');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/login');
  }, [navigate]);

  return {
    isLoggedIn,
    login,
    logout,
    error,
    loading,
  };
};
