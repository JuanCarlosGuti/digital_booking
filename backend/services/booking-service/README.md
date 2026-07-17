# booking-service

Servicio de reservas de Cesar Travel. Ver [../../../docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md).

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `BOOKING_DB_HOST` / `BOOKING_DB_PORT` / `BOOKING_DB_NAME` | no (defaults `localhost:3306/booking_db`) | Conexión a MySQL |
| `BOOKING_DB_USER` | no (default `booking_service`) | Usuario de MySQL con permisos solo sobre `booking_db` |
| `BOOKING_DB_PASSWORD` | **sí** | Sin default |
| `JWT_SECRET` | **sí** | Mismo valor que auth-service — acá solo se usa para *validar* tokens |
| `PROPERTY_SERVICE_URL` | no (default `http://localhost:8082`) | Base URL de property-service, para validar que un inmueble existe y quién es su dueño |
| `SERVER_PORT` | no (default `8083`) | Puerto HTTP |

## Correr local

```bash
export BOOKING_DB_PASSWORD=...
export JWT_SECRET=...              # el mismo que usa auth-service
export PROPERTY_SERVICE_URL=http://localhost:8082
./mvnw spring-boot:run
```

Requiere property-service corriendo y alcanzable en `PROPERTY_SERVICE_URL` — toda reserva valida el `productId` contra property-service antes de guardarse (ver `docs/adr/0002-comunicacion-sincrona-entre-servicios.md`). Si property-service no responde, la creación de la reserva falla con `503` en vez de guardar una reserva "huérfana".

## Endpoints

Todos requieren sesión (`Authorization: Bearer <token>`) — a diferencia de property-service, acá no hay navegación pública.

- `POST /api/bookings` — crea una reserva; el `userId` se toma del JWT, no del body. `409 Conflict` si las fechas se solapan con otra reserva existente del mismo inmueble.
- `GET /api/bookings/mine` — reservas del usuario autenticado.
- `GET /api/bookings/property/{productId}` — ocupantes de un inmueble (quién lo reservó y en qué fechas); solo el dueño de ese inmueble o un `ADMIN`.
- `GET /api/bookings/availability/{productId}` — **público**, sin identidad del huésped: solo las fechas ya ocupadas, para deshabilitarlas en el calendario del detalle de una propiedad (a diferencia de `/property/{id}`, que sí identifica al huésped y por eso es privado).
- `DELETE /api/bookings/{id}` — cancela una reserva; solo el huésped que la hizo o un `ADMIN`.

Sin token → `401`. Token válido pero sin permiso (ej. ver ocupantes de un inmueble ajeno) → `403`.

## Notas de diseño

- Sin FK física a `product_id`/`user_id` (viven en `property_db`/`auth_db`, ver ADR-0001) — la existencia del inmueble se valida en el momento de crear la reserva llamando a property-service.
- Valida solapamiento de fechas entre reservas para un mismo inmueble (`ReservationRepository.findOverlapping`, rango `[checkIn, checkOut)` con `checkOut` exclusivo). **Limitación conocida:** no es a prueba de condiciones de carrera — dos requests concurrentes para las mismas fechas podrían pasar la validación antes de que cualquiera de las dos haga commit. Cubre el caso común; un lock pesimista o una constraint de base queda pendiente para cuando el volumen de reservas simultáneas lo justifique.
- El envío de emails de confirmación (a huésped y propietario) es responsabilidad de `notification-service`, que se construye en la fase 2 — este servicio no envía correos todavía.
- Ver [ADR-0008](../../../docs/adr/0008-toolchain-java25-spring-boot4.md) para los hallazgos de toolchain (Spring Boot 4 + Java 25) encontrados y resueltos acá: `ObjectMapper` propio en las clases de seguridad, exclusión de `UserDetailsServiceAutoConfiguration`, `AuthenticationEntryPoint`/`AccessDeniedHandler` para 401 vs 403 correctos.
