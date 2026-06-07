import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Something went wrong';
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return {
    data,
    loading,
    error,
    request,
    setData
  };
};

export default useApi;
