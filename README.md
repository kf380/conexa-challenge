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

- Instalación
Sigue estos pasos para clonar y configurar el proyecto localmente:

Clonar el repositorio:

* git clone https://github.com/tu-usuario/conexa-challenge.git
* cd conexa-challenge

  
Instalar las dependencias:

* npm install

Configurar las variables de entorno:

Crea un archivo .env en la raíz del proyecto y define las variables necesarias. Puedes usar .env.development como ejemplo:

## Variables de Entorno

Ejemplo de archivo `.env.development`:

```env
MONGO_URI=mongodb://localhost:27017/movies_db
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=test@@758@test
PORT=3000
 
 ```

Iniciar la Aplicación en Modo Desarrollo
* npm run start:dev

La aplicación estará disponible en http://localhost:3000.

Iniciar la Aplicación en Modo Producción

Construir la aplicación:
* npm run build

Iniciar la aplicación:
* npm run start:prod

## Documentacion Swagger

En Local:
* http://localhost:3000/api/docs

En Producción:

* https://conexa-challenge-hqeo.onrender.com/api/docs

- Esta documentación incluye todos los endpoints, parámetros, roles necesarios y respuestas esperadas.

Pruebas
* El proyecto incluye pruebas unitarias y E2E para asegurar la calidad del código.

Ejecutar Pruebas Unitarias
* npm run test

Ejecutar Pruebas E2E
* npm run test:e2e

Ejecutar Todas las Pruebas
* npm run test:all



