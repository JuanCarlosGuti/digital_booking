# api-gateway

Punto de entrada único de Cesar Travel — el frontend solo le habla a este servicio, nunca directo a auth-service/property-service/booking-service. Ver [../../../docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) y [ADR-0003](../../../docs/adr/0003-sin-service-discovery.md).

Implementado con **Spring Cloud Gateway Server MVC** (`spring-cloud-starter-gateway-server-webmvc`) — la variante servlet/blocking del gateway, no la reactiva (WebFlux). Se eligió así para que todo el backend use el mismo modelo de programación (los otros tres servicios son Spring MVC clásico), en vez de mezclar reactivo y bloqueante solo para el gateway.

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `AUTH_SERVICE_URL` | no (default `http://localhost:8081`) | Base URL de auth-service |
| `PROPERTY_SERVICE_URL` | no (default `http://localhost:8082`) | Base URL de property-service |
| `BOOKING_SERVICE_URL` | no (default `http://localhost:8083`) | Base URL de booking-service |
| `CORS_ALLOWED_ORIGINS` | no (default `http://localhost:5173,http://localhost:3000`) | Orígenes permitidos, separados por coma (el frontend en dev) |
| `SERVER_PORT` | no (default `8080`) | Puerto HTTP |

## Correr local

```bash
./mvnw spring-boot:run
```

Requiere los tres servicios backend corriendo (o alcanzables en las URLs configuradas). Sin base de datos propia — el gateway no tiene estado.

## Rutas

Configuradas en código (`config/GatewayRoutesConfig.java`), no en YAML — reenvío estático por prefijo de path, sin reescribir la ruta:

| Prefijo | Servicio destino |
|---|---|
| `/api/auth/**` | auth-service |
| `/api/properties/**`, `/api/categories/**`, `/api/cities/**`, `/api/features/**` | property-service |
| `/api/bookings/**` | booking-service |

CORS centralizado en `config/CorsConfig.java` — es el único lugar del backend donde se configura, en vez de repetirlo en cada servicio.

## Notas de diseño

- Sin service discovery (Eureka/Consul) — rutas estáticas alcanzan para 3 servicios de instancia única (ver ADR-0003). Revisar esta decisión si el proyecto pasa a correr con más de una instancia por servicio.
- El gateway **no valida JWT** — cada servicio downstream valida su propio token con el secreto compartido (`JWT_SECRET`). El gateway es un proxy de enrutamiento puro, no un punto de autorización.
