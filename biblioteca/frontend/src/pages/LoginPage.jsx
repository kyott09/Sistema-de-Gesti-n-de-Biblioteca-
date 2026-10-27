import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';

export function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [values, setValues] = useState({ username: 'admin', password: 'admin123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/books" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(values);
      navigate('/books');
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <label className="field">
          <span>Usuario</span>
          <input name="username" value={values.username} onChange={handleChange} />
        </label>
        <label className="field">
          <span>Contraseña</span>
          <input type="password" name="password" value={values.password} onChange={handleChange} />
        </label>
        <ErrorMessage message={error} />
        <button type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
      </form>
    </div>
  );
}
