# Sistema de Gestión de Biblioteca

Aplicación full-stack con backend Node.js + Express + TypeORM + MySQL y frontend React + Vite.

## Estructura

- `backend/`: API REST, autenticación JWT, TypeORM, MySQL, seeds.
- `frontend/`: interfaz en React con rutas protegidas.

## Requisitos

- Node.js 18+
- MySQL/MariaDB activo (XAMPP o equivalente)
- Base de datos: `biblioteca_db`

## Variables de entorno

Copiar y ajustar los ejemplos:

- `backend/.env.example` -> `backend/.env`
- `frontend/.env.example` -> `frontend/.env`

## Arranque

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

La app queda disponible en:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Credenciales por defecto

- Usuario: `admin`
- Contraseña: `admin123`

## Funcionalidades principales

- Login con JWT
- CRUD de libros
- CRUD de autores, géneros, sagas y estantes
- Listado de logs del sistema
- Protección de rutas privadas
- Seeds iniciales para catálogo y administrador

## Validación rápida

1. Levantar MySQL.
2. Iniciar backend.
3. Iniciar frontend.
4. Ingresar en `/login` con las credenciales anteriores.
5. Probar el flujo de libros y administración.

## Notas

El backend crea la base de datos automáticamente si no existe y se conecta a MySQL en `localhost:3306` con usuario y contraseña definidos en `.env`.
