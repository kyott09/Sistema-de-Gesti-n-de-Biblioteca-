import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';

export function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get(`/api/books/${id}`);
        setBook(response.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'No se pudo cargar el libro');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <Loader text="Cargando detalle" />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  return (
    <div className="panel detail-card">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Libro</p>
          <h1>{book.titulo}</h1>
        </div>
        <Link to="/books" className="secondary-btn link-button">Volver</Link>
      </div>
      <div className="detail-grid">
        <div><strong>Autor:</strong> {book.author?.nombre || '-'}</div>
        <div><strong>Género:</strong> {book.genre?.nombre || '-'}</div>
        <div><strong>Saga:</strong> {book.saga?.nombre || 'Sin saga'}</div>
        <div><strong>Estante:</strong> {book.shelf?.codigo || '-'} ({book.shelf?.ubicacion || 'Sin ubicación'})</div>
        <div><strong>Año:</strong> {book.anioPublicacion}</div>
        <div><strong>ISBN:</strong> {book.isbn || 'Sin ISBN'}</div>
      </div>
      <p><strong>Descripción:</strong> {book.descripcion || 'Sin descripción'}</p>
    </div>
  );
}
