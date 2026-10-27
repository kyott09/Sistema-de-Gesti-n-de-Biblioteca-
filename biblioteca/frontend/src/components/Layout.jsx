import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Biblioteca</div>
        <nav className="nav">
          <NavLink to="/books">Libros</NavLink>
          <NavLink to="/admin">Administración</NavLink>
          <NavLink to="/logs">Logs</NavLink>
        </nav>
        <div className="topbar-user">
          <span>{user?.username}</span>
          <button type="button" className="secondary-btn" onClick={logout}>Cerrar sesión</button>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
