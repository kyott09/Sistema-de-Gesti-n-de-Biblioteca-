import { useEffect, useState } from 'react';
import api from '../services/api';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';

const forms = {
  authors: { endpoint: '/api/authors', label: 'Autores', fields: ['nombre', 'nacionalidad'] },
  genres: { endpoint: '/api/genres', label: 'Géneros', fields: ['nombre'] },
  sagas: { endpoint: '/api/sagas', label: 'Sagas', fields: ['nombre', 'descripcion'] },
  shelves: { endpoint: '/api/shelves', label: 'Estantes', fields: ['codigo', 'ubicacion', 'descripcion'] }
};

export function AdminPage() {
  const [resource, setResource] = useState('authors');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selected = forms[resource];

  const loadItems = async (nextResource = resource) => {
    setLoading(true);
    try {
      const response = await api.get(forms[nextResource].endpoint);
      setItems(response.data.data || []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar registros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(resource);
  }, [resource]);

  useEffect(() => {
    setForm(Object.fromEntries(selected.fields.map((field) => [field, ''])));
  }, [resource]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post(selected.endpoint, form);
      setForm(Object.fromEntries(selected.fields.map((field) => [field, ''])));
      await loadItems(resource);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este registro?')) return;
    try {
      await api.delete(`${selected.endpoint}/${id}`);
      await loadItems(resource);
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo eliminar');
    }
  };

  if (loading) return <Loader text="Cargando administración" />;

  return (
    <div className="page-grid admin-panel">
      <section className="panel">
        <h2>Mantenimiento</h2>
        <select value={resource} onChange={(e) => setResource(e.target.value)}>
          {Object.entries(forms).map(([key, item]) => (
            <option key={key} value={key}>{item.label}</option>
          ))}
        </select>
        <form onSubmit={handleSubmit} className="form-grid compact-form">
          {selected.fields.map((field) => (
            <label key={field} className="field">
              <span>{field}</span>
              <input name={field} value={form[field] || ''} onChange={handleChange} />
            </label>
          ))}
          <button type="submit">Guardar</button>
        </form>
        <ErrorMessage message={error} />
      </section>

      <section className="panel wide-panel">
        <h2>Registros</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {selected.fields.map((field) => <th key={field}>{field}</th>)}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {selected.fields.map((field) => <td key={`${item.id}-${field}`}>{item[field] || '-'}</td>)}
                  <td><button type="button" className="danger-btn" onClick={() => handleDelete(item.id)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
