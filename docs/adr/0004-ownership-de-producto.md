# ADR-0004: Agregar `owner_id` a `Product` en vez de un rol "HOST" nuevo

## Estado
Aceptado

## Contexto
Hoy `Product` (el inmueble) no tiene ningún concepto de "dueño" — todas las propiedades se cargan desde el flujo `/admin`, gateado solo por el rol `ADMIN`. Para poder (a) mostrarle al propietario quién reservó su inmueble y (b) enviarle el correo de confirmación, hace falta saber quién es el dueño de cada `Product`.

## Decisión
Agregar `owner_id BIGINT NULL` a `product` (schema `property_db`), apuntando al `id` de un usuario en `auth_db` — sin FK física real (cross-schema, ver ADR-0001), solo el id numérico.

Cualquier usuario autenticado puede publicar un inmueble y se vuelve automáticamente "dueño" de ese producto (mismo modelo que Airbnb) — **no se crea un rol `HOST` nuevo**, se evita tocar el modelo de `Role` que hoy es `USER`/`ADMIN`.

`POST /api/properties` toma el `ownerId` del JWT del usuario autenticado, nunca de un campo editable en el body — para que nadie pueda asignarle una propiedad a otro usuario.

Backfill de datos existentes: las propiedades semilla del dump actual se asignan al id del usuario admin conocido en la migración inicial.

## Consecuencias
- `GET /api/bookings/property/{productId}` (vista de ocupantes) requiere que booking-service confirme, vía property-service, que el `ownerId` del producto coincide con el usuario del JWT antes de devolver la lista de reservas.
- La columna se crea ya en la fase 1 (aunque la asignación real de dueño se activa en la fase 2) para no migrar la tabla `product` dos veces.
