# Backend Base Template

REST API reutilizable construida con Node.js, Express y PostgreSQL. La API expone un endpoint de salud y operaciones CRUD para usuarios.

## Requisitos

- Node.js y npm
- PostgreSQL en ejecución local

## Instalación

Desde la raíz del proyecto, instala las dependencias:

```powershell
npm install
```

La configuración local está en `.env`. Si necesitas restablecerla, copia `.env.example` a `.env` y configura la conexión:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/mi_base_de_datos
CORS_ORIGIN=http://localhost:3000
```

Asegúrate de que PostgreSQL esté ejecutándose y que exista la base de datos `mi_base_de_datos`. Puedes crearla con `psql`:

```powershell
psql -U postgres -h localhost -c "CREATE DATABASE mi_base_de_datos;"
```

## Inicializar el esquema

Ejecuta el script SQL desde la raíz del proyecto:

```powershell
psql -U postgres -h localhost -d mi_base_de_datos -f src\config\schema.sql
```

El script crea la tabla `users` si aún no existe.

## Iniciar el servidor

En desarrollo, `nodemon` reinicia el servidor cuando cambian los archivos:

```powershell
npm run dev
```

Para iniciar el servidor sin modo de desarrollo:

```powershell
npm start
```

Por defecto, el servidor escucha en `http://localhost:3000`.

## Endpoints disponibles

- `GET /health` — estado del servidor.
- `GET /api/v1/users` — listar usuarios.
- `GET /api/v1/users/:id` — obtener un usuario.
- `POST /api/v1/users` — crear un usuario (`name` y `email`).
- `PUT /api/v1/users/:id` — actualizar un usuario (`name` y `email`).
- `DELETE /api/v1/users/:id` — eliminar un usuario.

Ejemplo de cuerpo para crear o actualizar un usuario:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}
```
