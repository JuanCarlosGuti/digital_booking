# ADR-0001: Un MySQL con schema por servicio, no una base por servicio

## Estado
Aceptado

## Contexto
El monolito actual tiene una única base MySQL 8 (dump en `ddbb/sprint 3/backend_integrador4.sql`) con las tablas `users`, `roles`, `product`, `category`, `city`, `feature`, `product_feature`, `image`, `reservation`. Al separar en microservicios (auth-service, property-service, booking-service) hay que decidir cómo se separan los datos.

## Decisión
Una sola instancia de MySQL 8, con tres schemas lógicos:
- `auth_db`: `users`, `roles`.
- `property_db`: `category`, `city`, `feature`, `product` (+ `owner_id` nuevo, ver ADR-0004), `product_feature`, `image`.
- `booking_db`: `reservation`.

Cada servicio tiene su propio usuario de MySQL con permisos únicamente sobre su schema — el aislamiento es a nivel de servicio/credenciales, no de infraestructura física.

## Alternativas consideradas
- **Una base de datos por servicio (3 instancias MySQL separadas)**: aislamiento más real, pero para el tamaño actual del proyecto implica 3 motores de base para operar, respaldar y monitorear sin beneficio proporcional. Se descarta por ahora; si el proyecto crece, migrar de "schema propio" a "instancia propia" es un paso incremental, no una reescritura.

## Consecuencias
- Las FKs `reservation.product_id` y `reservation.user_id` **dejan de ser constraints reales de base de datos** — no hay FK limpia entre schemas de servicios distintos. La integridad referencial se valida en la aplicación (booking-service llama a property-service/auth-service antes de insertar).
- Se acepta consistencia eventual/débil en la lectura: si un producto se borra, una reserva vieja puede quedar apuntando a un `productId` que ya no existe, salvo que se implemente borrado lógico o limpieza explícita más adelante.
- Migración de datos: el dump único se parte en tres scripts de carga inicial, versionados con Flyway por servicio (`db/migration/V1__init.sql` en cada uno).
