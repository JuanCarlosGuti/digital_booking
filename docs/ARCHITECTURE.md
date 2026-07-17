# Arquitectura — Cesar Travel (ex Digital Booking)

Este documento describe la arquitectura objetivo hacia la que se está migrando el proyecto. Para el detalle de por qué se tomó cada decisión, ver las [ADR](adr/). Para el orden de trabajo, ver [ROADMAP.md](ROADMAP.md).

## Vista general

```
                         ┌────────────────────┐
                         │      frontend       │
                         │  React + Vite (SPA) │
                         └──────────┬──────────┘
                                    │ HTTPS
                                    ▼
                         ┌────────────────────┐
                         │     api-gateway      │
                         │ Spring Cloud Gateway │
                         │  rutas estáticas     │
                         └─┬──────┬──────┬────┬─┘
                 /api/auth │      │      │    │ /api/chats
                           │ /api/properties  │
                           │      │      │ /api/bookings + /api/reviews
                 ┌─────────▼──┐ ┌─▼──────────┐ ┌▼─────────────┐ ┌▼───────────┐
                 │auth-service│ │  property- │ │   booking-   │ │chat-service│
                 │            │ │  service   │ │   service    │ │            │
                 └─────┬──────┘ └─────┬──────┘ └──────┬───────┘ └─────┬──────┘
                       │              │               │ POST best-effort
                       │              │               ▼               │
                       │              │     ┌───────────────────┐    │
                       │              │     │notification-service│    │
                       │              │     │ SMTP, interno      │    │
                       │              │     │ (sin gateway/DB)   │    │
                       │              │     └───────────────────┘    │
                       ▼              ▼               ▼               ▼
                 ┌──────────────────────────────────────────────────────┐
                 │              MySQL 8 (una instancia)                  │
                 │  auth_db │ property_db │ booking_db │ chat_db         │
                 └──────────────────────────────────────────────────────┘
```
Todos los servicios de negocio son Java 25 / Spring Boot 4.1.

## Servicios

### api-gateway
- Spring Cloud Gateway Server MVC (variante servlet/blocking, no reactiva — coherente con el resto de los servicios, todos Spring MVC clásico). Único punto de entrada público.
- Rutas **estáticas** (sin service discovery — ver [ADR-0003](adr/0003-sin-service-discovery.md)): `/api/auth/**` → auth-service; `/api/properties/**`, `/api/categories/**`, `/api/cities/**`, `/api/features/**` y `/uploads/**` (imágenes subidas) → property-service; `/api/bookings/**` y `/api/reviews/**` → booking-service; `/api/chats/**` → chat-service. `/api/notifications/**` **no se rutea a propósito** — es interno.
- Resuelve CORS de forma centralizada (hoy vive mal repartido entre `WebSecurityConfig` y un `CorsConfig` con bloques comentados).

### auth-service
- Entidades: `User` (con `phone` opcional — celular colombiano para el contacto por WhatsApp), `Role`.
- Endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `GET /api/auth/users/{id}` (autenticado — devuelve nombre/email/teléfono; lo usan el frontend para la vista de ocupantes y el botón de WhatsApp, y booking-service para resolver el email del dueño al notificar).
- Dueño del schema `auth_db`.

### property-service
- Entidades: `Product` (el inmueble — incluye `owner_id`, ver [ADR-0004](adr/0004-ownership-de-producto.md)), `Category`, `City` (**municipio + departamento + coordenadas** — el alcance es local/departamental, Cesar y La Guajira, sin campo país), `Feature`, `ProductFeature`, `Image`.
- Endpoints: CRUD `/api/properties`, `GET /api/properties/owner/{ownerId}` (base de "Mis propiedades"), `POST /api/properties/{id}/images` (upload multipart real a `/data/uploads`, servido en `/uploads/**` — ver [ADR-0005](adr/0005-almacenamiento-local-de-imagenes.md)).
- Dueño del schema `property_db`.

### booking-service
- Entidades: `Reservation` (`checkIn`, `checkOut`, `productId`, `userId`) y `Review` (rating 1-5, comentario, `reviewer_name` denormalizado del JWT — vive acá y no en property_db porque la regla "solo reseña quien tuvo una estadía finalizada" se valida contra `reservation`, local).
- Endpoints de reservas: `POST /api/bookings` (valida solapamiento, `409`; al crear dispara la notificación por email best-effort), `GET /api/bookings/mine`, `GET /api/bookings/property/{productId}` (ocupantes con identidad — solo el dueño), `GET /api/bookings/availability/{productId}` (**público**, solo fechas), `GET /api/bookings/unavailable?from&to` (**público**, solo ids de inmuebles ocupados — para la búsqueda por fechas), `DELETE /api/bookings/{id}`.
- Endpoints de reseñas: `POST /api/reviews` (403 sin estadía finalizada, 409 si ya reseñó), `GET /api/reviews/property/{id}` (público), `GET /api/reviews/summary?productIds=...` (público, batch para las tarjetas del catálogo), `GET /api/reviews/mine`.
- Dueño del schema `booking_db`.
- Al crear una reserva: valida `productId` contra property-service; después del save arma el payload de confirmación (huésped desde los claims del JWT; email del dueño vía auth-service **reenviando el JWT del huésped**) y llama a notification-service con timeouts cortos — cualquier fallo se loguea y jamás revierte la reserva (ver [ADR-0002](adr/0002-comunicacion-sincrona-entre-servicios.md)).

### chat-service
- Entidades: `Conversation` (una por par inmueble-huésped; título del inmueble y nombres de los participantes denormalizados al crear) y `Message` (con estado leído/no-leído). Ver [ADR-0009](adr/0009-chat-interno-en-vez-de-whatsapp.md) — reemplaza el contacto por WhatsApp.
- Endpoints (todos autenticados, solo participantes): `POST /api/chats` (abre/recupera la conversación — el dueño se resuelve contra property-service, nunca del cliente), `GET /api/chats` (bandeja con último mensaje y no-leídos), `GET/POST /api/chats/{id}/messages`, `POST /api/chats/{id}/read`, `GET /api/chats/unread-count` (badge del header).
- El frontend actualiza por **sondeo** (hilo ~4s, badge ~20s) — sin WebSocket a propósito (decisión del usuario, suficiente a esta escala).
- Dueño del schema `chat_db`.

### notification-service
- Sin base de datos ni seguridad propia: **interno** — no tiene puerto publicado en docker-compose ni ruta en el gateway; solo booking-service lo alcanza por la red interna.
- Endpoint: `POST /api/notifications/booking-confirmation` → 202. Envía dos correos de texto plano (huésped siempre; dueño si se resolvió su email) vía `spring-boot-starter-mail` (SMTP, ver [ADR-0006](adr/0006-email-por-smtp.md)); cada envío en su propio try/catch.
- Configuración por variables `SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_APP_PASSWORD/MAIL_FROM` (ver `.env.example`) — vacías, el envío falla logueado y nada más se ve afectado.

## Datos

Una sola instancia MySQL 8, cuatro schemas lógicos (`auth_db`, `property_db`, `booking_db`, `chat_db`), cada servicio con su propio usuario y sin acceso cruzado a los schemas de otros servicios. Detalle y trade-offs en [ADR-0001](adr/0001-particionado-de-schemas.md).

## Frontend

React (no Angular — decisión explícita, ver [ADR-0007](adr/0007-frontend-se-queda-en-react.md)) + Vite, consumiendo únicamente el `api-gateway`. Identidad visual "Cesar Travel" (logo árbol de cañaguate, paleta Cesar/Guajira).

## Infraestructura local

`docker-compose.yml` en la raíz del repo levanta: MySQL (con los 4 schemas), los 6 servicios backend (notification-service sin puerto publicado) y el frontend, para desarrollo local con un solo `docker compose up`. Volúmenes persistentes: `mysql-data` (datos) y `property-uploads` (imágenes subidas).
