import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { FormInput, FormSelect } from '../components';

const emptyBook = {
  titulo: '',
  anioPublicacion: '',
  isbn: '',
  descripcion: '',
  authorId: '',
  genreId: '',
  shelfId: '',
  sagaId: ''
};

export function BooksPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sagas, setSagas] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ genreId: '', authorId: '', year: '' });

  const fetchCatalogs = async () => {
    const [authorsRes, genresRes, sagasRes, shelvesRes] = await Promise.all([
      api.get('/api/authors'),
      api.get('/api/genres'),
      api.get('/api/sagas'),
      api.get('/api/shelves')
    ]);
    setAuthors(authorsRes.data.data || []);
    setGenres(genresRes.data.data || []);
    setSagas(sagasRes.data.data || []);
    setShelves(shelvesRes.data.data || []);
  };

  const loadBooks = async (nextFilters = filters) => {
    const params = new URLSearchParams();
    if (nextFilters.genreId) params.append('genreId', nextFilters.genreId);
    if (nextFilters.authorId) params.append('authorId', nextFilters.authorId);
    if (nextFilters.year) params.append('year', nextFilters.year);

    setLoading(true);
    try {
      const response = await api.get(`/api/books?${params.toString()}`);
      setBooks(response.data.data || []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar libros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchCatalogs();
        await loadBooks(filters);
      } catch (err) {
        setError(err?.response?.data?.message || 'Error al cargar la biblioteca');
      }
    };
    init();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const next = { ...filters, [name]: value };
    setFilters(next);
    loadBooks(next);
  };

  const clearFilters = () => {
    const next = { genreId: '', authorId: '', year: '' };
    setFilters(next);
    loadBooks(next);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...form,
        anioPublicacion: Number(form.anioPublicacion),
        authorId: Number(form.authorId),
        genreId: Number(form.genreId),
        shelfId: Number(form.shelfId),
        sagaId: form.sagaId ? Number(form.sagaId) : null
      };

      if (editingId) {
        await api.put(`/api/books/${editingId}`, payload);
      } else {
        await api.post('/api/books', payload);
      }
      setForm(emptyBook);
      setEditingId(null);
      await fetchCatalogs();
      await loadBooks();
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo guardar el libro');
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setForm({
      titulo: book.titulo || '',
      anioPublicacion: book.anioPublicacion || '',
      isbn: book.isbn || '',
      descripcion: book.descripcion || '',
      authorId: book.author?.id || '',
      genreId: book.genre?.id || '',
      shelfId: book.shelf?.id || '',
      sagaId: book.saga?.id || ''
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este libro?')) {
      return;
    }
    try {
      await api.delete(`/api/books/${id}`);
      await loadBooks();
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo eliminar el libro');
    }
  };

  if (loading) return <Loader text="Cargando catálogo" />;

  return (
    <div className="page-grid">
      <section className="panel">
        <h2>Filtros</h2>
        <div className="filters-grid">
          <label className="field">
            <span>Género</span>
            <select name="genreId" value={filters.genreId} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.nombre}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Autor</span>
            <select name="authorId" value={filters.authorId} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>{author.nombre}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Año</span>
            <input type="number" name="year" value={filters.year} onChange={handleFilterChange} />
          </label>
        </div>
        <button type="button" className="secondary-btn" onClick={clearFilters}>Limpiar filtros</button>
      </section>

      <section className="panel">
        <h2>{editingId ? 'Editar libro' : 'Nuevo libro'}</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label className="field">
            <span>Título</span>
            <input name="titulo" value={form.titulo} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Año</span>
            <input type="number" name="anioPublicacion" value={form.anioPublicacion} onChange={handleChange} />
          </label>
          <label className="field">
            <span>ISBN</span>
            <input name="isbn" value={form.isbn} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Autor</span>
            <select name="authorId" value={form.authorId} onChange={handleChange}>
              <option value="">Seleccionar</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>{author.nombre}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Género</span>
            <select name="genreId" value={form.genreId} onChange={handleChange}>
              <option value="">Seleccionar</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.nombre}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Estante</span>
            <select name="shelfId" value={form.shelfId} onChange={handleChange}>
              <option value="">Seleccionar</option>
              {shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.id}>{shelf.codigo}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Saga</span>
            <select name="sagaId" value={form.sagaId} onChange={handleChange}>
              <option value="">Sin saga</option>
              {sagas.map((saga) => (
                <option key={saga.id} value={saga.id}>{saga.nombre}</option>
              ))}
            </select>
          </label>
          <label className="field full-span">
            <span>Descripción</span>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="3" />
          </label>
          <div className="actions-row full-span">
            <button type="submit">{editingId ? 'Guardar cambios' : 'Crear libro'}</button>
            {editingId && (
              <button type="button" className="secondary-btn" onClick={() => { setEditingId(null); setForm(emptyBook); }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
        <ErrorMessage message={error} />
      </section>

      <section className="panel wide-panel">
        <h2>Catálogo</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Género</th>
                <th>Año</th>
                <th>Estante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td><Link to={`/books/${book.id}`}>{book.titulo}</Link></td>
                  <td>{book.author?.nombre || '-'}</td>
                  <td>{book.genre?.nombre || '-'}</td>
                  <td>{book.anioPublicacion}</td>
                  <td>{book.shelf?.codigo || '-'}</td>
                  <td className="cell-actions">
                    <button type="button" className="secondary-btn" onClick={() => handleEdit(book)}>Editar</button>
                    <button type="button" className="danger-btn" onClick={() => handleDelete(book.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
