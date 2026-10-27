import { useEffect, useState } from 'react';
import api from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';

export function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLogs = async (nextLevel = level) => {
    setLoading(true);
    try {
      const url = nextLevel ? `/api/logs?level=${nextLevel}` : '/api/logs';
      const response = await api.get(url);
      setLogs(response.data.data.items || []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleLevelChange = (event) => {
    const next = event.target.value;
    setLevel(next);
    loadLogs(next);
  };

  if (loading) return <Loader text="Cargando logs" />;

  return (
    <div className="panel">
      <h2>Eventos del sistema</h2>
      <label className="field filter-inline">
        <span>Nivel</span>
        <select value={level} onChange={handleLevelChange}>
          <option value="">Todos</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
          <option value="debug">Debug</option>
        </select>
      </label>
      <ErrorMessage message={error} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nivel</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.fecha).toLocaleString()}</td>
                <td>{log.nivel}</td>
                <td>{log.mensaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
