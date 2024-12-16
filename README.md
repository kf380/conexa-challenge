# Conexa Challenge - Backend con NestJS

Este proyecto es un backend implementado con NestJS, cuyo propósito es gestionar películas y series, cumpliendo con requisitos como autenticación, roles de usuario, endpoints protegidos, sincronización con la API de Star Wars, y pruebas unitarias y E2E.

## Descripción General

La API permite:

- Registrar usuarios con rol "regular" o "admin".
- Iniciar sesión para obtener un token JWT.
- Usuarios con rol "admin" pueden crear, actualizar, eliminar y sincronizar películas.
- Usuarios "regulares" pueden consultar el detalle de una película específica.
- Se integra con la API pública de Star Wars para sincronizar la lista de films.

La aplicación está desarrollada con NestJS, utiliza JWT para autenticación, Mongoose para persistencia en MongoDB, y dispone de documentación a través de Swagger.

## Requerimientos

- Node.js 18+
- MongoDB en ejecución (local o remoto)
- Redis opcional (dependiendo de la configuración de cache)
- Variables de entorno definidas en un archivo `.env` o `.env.development`

## Variables de Entorno

Ejemplo de archivo `.env.development`:

```env
MONGO_URI=mongodb://localhost:27017/movies_db
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=test@@758@test
PORT=3000
