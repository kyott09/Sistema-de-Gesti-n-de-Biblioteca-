# Sistema de Gestión de Biblioteca

## Requisitos

- Node.js 18+
- MySQL/MariaDB de XAMPP iniciado en localhost:3306
- npm

## Estructura

- `biblioteca/backend` — API Express + TypeORM + MySQL
- `biblioteca/frontend` — aplicación React + Vite

## Instalación

1. Ingresá a `biblioteca/backend` y copiá `.env.example` a `.env` con tus datos.
2. En `biblioteca/frontend`, copiá `.env.example` a `.env` si querés definir el backend URL.
3. En la carpeta backend, ejecutá `npm install`.
4. En la carpeta frontend, ejecutá `npm install`.

## Base de datos

La base `biblioteca_db` se crea automaticamente al iniciar el backend. También podés ejecutar `database.sql` desde phpMyAdmin o MySQL CLI.

## Ejecutar seed

```bash
cd biblioteca/backend
npm run seed
```

Credenciales por defecto:

- Usuario: `admin`
- Contraseña: `admin123`

## Iniciar backend

```bash
cd biblioteca/backend
npm run dev
```

## Iniciar frontend

```bash
cd biblioteca/frontend
npm run dev
```

## Variables de entorno

Backend:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=biblioteca_db
JWT_SECRET=cambiar_este_secreto
JWT_EXPIRES_IN=1h
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Frontend:

```env
VITE_API_URL=http://localhost:3000
```

## Endpoints principales

- `POST /api/auth/login`
- `GET /api/books`
- `GET /api/books/:id`
- `GET /api/authors`
- `GET /api/genres`
- `GET /api/sagas`
- `GET /api/shelves`
- `GET /api/logs`
