# Backend — Cesar Travel

Los microservicios viven en [services/](services/) — uno por carpeta, cada uno con su propio
README, `pom.xml`, migraciones Flyway y Dockerfile:

- [auth-service](services/auth-service/) — usuarios, roles, JWT (firma).
- [property-service](services/property-service/) — inmuebles, municipios, categorías, imágenes.
- [booking-service](services/booking-service/) — reservas y reseñas.
- [chat-service](services/chat-service/) — chat interno huésped↔dueño (ver ADR-0009).
- [notification-service](services/notification-service/) — emails (interno, sin gateway).
- [api-gateway](services/api-gateway/) — único punto de entrada público.

Ver [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) para la vista completa. El monolito original
(`backend-integrador`, Spring Boot 2.7/Java 17) fue reemplazado por estos servicios y eliminado
del árbol — sigue disponible en el historial de git si hiciera falta consultarlo.
