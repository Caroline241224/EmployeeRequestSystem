# Employee Requests System

## Descripción

Este proyecto consiste en una aplicación para la gestión de solicitudes de empleados. Permite crear, listar y actualizar el estado de solicitudes como vacaciones, ajustes salariales o beneficios.

El sistema está dividido en dos partes principales:

* Backend desarrollado en **.NET 8**
* Frontend desarrollado en **React con TypeScript**

---

## Arquitectura Backend

El backend fue desarrollado utilizando una arquitectura por capas:

* **Domain**: Contiene las entidades del sistema.
* **Application**: Contiene los comandos, validaciones y lógica de aplicación.
* **Infrastructure**: Maneja el acceso a datos mediante repositorios.
* **API**: Expone los endpoints REST para el consumo del frontend.

También se implementó una estructura básica de **CQRS (Command Query Responsibility Segregation)**.

---

## Endpoints disponibles

| Método | Endpoint           | Descripción                   |
| ------ | ------------------ | ----------------------------- |
| POST   | /api/requests      | Crear solicitud               |
| GET    | /api/requests      | Obtener todas las solicitudes |
| GET    | /api/requests/{id} | Obtener solicitud por ID      |
| PUT    | /api/requests/{id} | Actualizar estado             |
| DELETE | /api/requests/{id} | Eliminar solicitud            |

---

## Tecnologías utilizadas

Backend:

* .NET 8
* Entity Framework Core
* Base de datos InMemory
* FluentValidation
* Swagger

Frontend:

* React
* TypeScript
* Hooks (useState, useEffect)
* Fetch API

DevOps:

* Dockerfile para contenerización del backend.

---

## Cómo ejecutar el proyecto

### Backend

1. Abrir la solución en Visual Studio.
2. Ejecutar el proyecto **EmployeeRequests.Api**.
3. Acceder a Swagger en:

https://localhost:5063/swagger

---

### Frontend

1. Abrir la carpeta del frontend en Visual Studio Code.
2. Ejecutar el siguiente comando en la terminal:

npm install

3. Luego ejecutar:

npm run dev

4. Abrir en el navegador la URL mostrada por Vite.

---

## Pruebas unitarias

El proyecto incluye pruebas unitarias utilizando **xUnit** para validar la lógica del sistema.

---

## Contenerización

El backend incluye un **Dockerfile** que permite empaquetar la API en un contenedor Docker para facilitar su despliegue en diferentes entornos.

---

## Mejoras futuras

* Implementar autenticación y autorización.
* Migrar a una base de datos persistente como PostgreSQL.
* Implementar logging y monitoreo.
* Implementar paginación en los endpoints.
