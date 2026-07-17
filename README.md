# Cesar Travel

Plataforma de reservas de alojamientos (ex "Digital Booking"), en proceso de modernización: backend en microservicios sobre Java 25, frontend React modernizado, e identidad visual propia inspirada en la región Cesar–La Guajira (árbol de cañaguate).

## Estado del proyecto

El proyecto está en migración activa desde un monolito Spring Boot 2.7 hacia la arquitectura descrita en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). El trabajo está dividido en fases — ver el detalle y el checklist de cada una en [docs/ROADMAP.md](docs/ROADMAP.md).

## Documentación

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — arquitectura objetivo (servicios, datos, comunicación).
- [docs/ROADMAP.md](docs/ROADMAP.md) — fases del plan de modernización.
- [docs/adr/](docs/adr/) — decisiones de arquitectura y por qué se tomaron.
- [frontend/docs/frontend-update/](frontend/docs/frontend-update/) — inventario de deuda técnica del frontend previo a la modernización.

## Estructura del repositorio

- `backend/` — servicios backend (monolito actual en `backend/backend-integrador`, migrando a microservicios).
- `frontend/` — SPA React.
- `ddbb/` — dumps y diagramas de la base de datos por sprint.
- `infra/` — material de infraestructura/red.
- `testing/` — colecciones Postman y suites Selenium IDE históricas.
- `docs/` — documentación de arquitectura y decisiones.
