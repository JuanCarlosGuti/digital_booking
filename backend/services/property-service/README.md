# property-service

Servicio de inmuebles (propiedades, categorías, ciudades, features) de Cesar Travel. Ver [../../../docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md).

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `PROPERTY_DB_HOST` / `PROPERTY_DB_PORT` / `PROPERTY_DB_NAME` | no (defaults `localhost:3306/property_db`) | Conexión a MySQL |
| `PROPERTY_DB_USER` | no (default `property_service`) | Usuario de MySQL con permisos solo sobre `property_db` |
| `PROPERTY_DB_PASSWORD` | **sí** | Sin default |
| `JWT_SECRET` | **sí** | Mismo valor que auth-service — acá solo se usa para *validar* tokens, nunca para firmarlos |
| `SERVER_PORT` | no (default `8082`) | Puerto HTTP |

## Correr local

```bash
export PROPERTY_DB_PASSWORD=...
export JWT_SECRET=...   # el mismo que usa auth-service
./mvnw spring-boot:run
```

## Endpoints

- `GET /api/categories`, `GET /api/cities`, `GET /api/features` — públicos.
- `GET /api/properties?categoryId=&cityId=` — listado público, filtros opcionales.
- `GET /api/properties/{id}` — detalle público.
- `POST /api/properties` — crea una propiedad; el dueño (`owner_id`) se toma del JWT autenticado, no del body.
- `PUT /api/properties/{id}` / `DELETE /api/properties/{id}` — solo el dueño o un `ADMIN`.
- `GET /api/properties/owner/{ownerId}` — propiedades publicadas por ese usuario; solo el propio dueño o un `ADMIN` puede consultarlas.

La carga real de imágenes (`POST /api/properties/{id}/images`) es un endpoint de la fase 2 (ver `docs/ROADMAP.md`) — todavía no implementado acá.

Sin token en un endpoint protegido → `401`. Token válido pero sin permiso → `403`. Ver [ADR-0008](../../../docs/adr/0008-toolchain-java25-spring-boot4.md) para el resto de hallazgos de toolchain (Spring Boot 4 + Java 25) encontrados y resueltos durante la construcción.

## Datos semilla

Las migraciones Flyway (`V1__init.sql`, `V2__seed_data.sql`) recrean el esquema y migran los datos reales de `ddbb/sprint 3/backend_integrador4.sql`: 3 categorías, 6 ciudades, 10 features y 8 propiedades con sus imágenes y features, todas asignadas a `owner_id = 1` (el usuario admin semilla de auth-service). Las dos categorías corruptas del dump original ("descripcionUpdate"/"CategoriaUpdate", artefactos de pruebas) se descartaron; los dos productos que las referenciaban se remapearon a la categoría que les correspondía por contenido real.
