import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

/**
 * Hook personalizado para manejar datos de API con cache y estados
 * @param {string} endpoint - Endpoint de la API
 * @param {object} params - Parámetros para la petición
 * @param {object} options - Opciones adicionales
 * @returns {object} - { data, loading, error, refetch }
 */
export const useApiData = (endpoint, params = {}, options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.request(endpoint, {
        method: 'GET',
        params
      });
      
      setData(response);
    } catch (err) {
      setError(err.message || 'Error al cargar los datos');
      console.error(`Error fetching ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

/**
 * Hook para manejar mutaciones (POST, PUT, DELETE)
 * @param {function} mutationFn - Función que realiza la mutación
 * @returns {object} - { mutate, loading, error, success }
 */
export const useMutation = (mutationFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const mutate = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await mutationFn(...args);
      setSuccess(true);
      
      // Limpiar éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
      
      return result;
    } catch (err) {
      setError(err.message || 'Error en la operación');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  return {
    mutate,
    loading,
    error,
    success
  };
};

export default useApiData;