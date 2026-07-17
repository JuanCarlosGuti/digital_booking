# auth-service

Servicio de autenticación y usuarios de Cesar Travel. Ver [../../../docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) para cómo encaja con los demás servicios.

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `AUTH_DB_HOST` / `AUTH_DB_PORT` / `AUTH_DB_NAME` | no (defaults `localhost:3306/auth_db`) | Conexión a MySQL |
| `AUTH_DB_USER` | no (default `auth_service`) | Usuario de MySQL con permisos solo sobre `auth_db` |
| `AUTH_DB_PASSWORD` | **sí** | Sin default — el arranque falla si no está seteada |
| `JWT_SECRET` | **sí** | Clave HMAC-SHA256 en base64 (mínimo 32 bytes), sin default. **Compartida por todos los servicios** — auth-service la usa para firmar, property-service/booking-service la usan para solo validar. |
| `JWT_EXPIRATION_MINUTES` | no (default `480` = 8h) | Vigencia del token |
| `SERVER_PORT` | no (default `8081`) | Puerto HTTP |

## Correr local

```bash
export AUTH_DB_PASSWORD=... 
export JWT_SECRET=$(openssl rand -base64 32)
./mvnw spring-boot:run
```

Requiere una instancia MySQL accesible con el schema `auth_db` creado (Flyway crea las tablas en el primer arranque). Para levantar todo junto (MySQL + los 4 servicios), usar el `docker-compose.yml` de la raíz del repo una vez esté armado.

## Endpoints

- `POST /api/auth/register` — alta de usuario (rol `USER` por defecto).
- `POST /api/auth/login` — devuelve un JWT.
- `POST /api/auth/refresh` — reemite el token vigente con una nueva ventana de expiración (refresh simple; un refresh token real con revocación queda para la fase 2, ver `docs/ROADMAP.md`).
- `GET /api/auth/users/{id}` — interno, consumido por property-service/booking-service para resolver nombre/email.

Sin token en un endpoint protegido → `401`. Token válido pero sin permiso → `403`. Ver [ADR-0008](../../../docs/adr/0008-toolchain-java25-spring-boot4.md) para el resto de hallazgos de toolchain (Spring Boot 4 + Java 25) encontrados y resueltos durante la construcción.

## Usuario semilla

La migración `V1__init.sql` crea un usuario `admin@cesartravel.co` (contraseña de desarrollo `CesarTravel#2026`, **cambiarla** antes de cualquier uso real) con id `1` — property-service usa ese id como dueño de las propiedades migradas desde el monolito (ver `docs/adr/0004-ownership-de-producto.md`).
