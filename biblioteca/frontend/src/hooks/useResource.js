import { useEffect, useState } from 'react';
import api from '../services/api';

export function useResource(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoint);
      setData(response.data.data || []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [endpoint]);

  return { data, loading, error, reload: load };
}
