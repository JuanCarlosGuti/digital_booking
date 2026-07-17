# Cesar Travel — frontend

SPA en React + Vite. Consume únicamente el `api-gateway` del backend (ver [../docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)) — nunca habla directo con auth-service/property-service/booking-service.

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `VITE_API_URL` | no (default `http://localhost:8080`) | Base URL del api-gateway |

## Correr local

```bash
npm install
npm run dev       # servidor de desarrollo, http://localhost:5173
npm run build     # build de producción a build/ (nombre elegido para no romper .gitlab-ci.yml)
npm run preview   # sirve el build de producción localmente
npm test          # corre la suite de Vitest una vez
npm run test:watch
```

Requiere el `api-gateway` (y detrás, los demás servicios) corriendo y alcanzable en `VITE_API_URL`.

## Stack

- **Vite** (no Create React App — CRA está deprecado por Meta) + **React 19**.
- **Vitest** + Testing Library para tests (no Jest — Vite no lo integra de forma nativa).
- **react-router-dom v7** para ruteo, con rutas protegidas reales (`components/ProtectedRoute.jsx`) en vez de solo esconder enlaces en el menú.
- `context/AuthContext.jsx` — sesión (token/usuario/rol) persistida en `localStorage` bajo una única clave (`services/authStorage.js`), consumida tanto por el contexto de React como por `services/fetchService.js` para el header `Authorization`.

## Notas conocidas

- `date-fns` está fijado a `2.30.0` (no la última) porque `react-date-range` todavía no es compatible con `date-fns` 3/4 — si en algún momento se actualiza `react-date-range`, revisar si ya soporta una versión más nueva antes de sacar el pin.
- La carga de imágenes de una propiedad sigue siendo "pegar una URL" (`NewProductUploadMedia.jsx`) — ya no se pierde en el envío (property-service las persiste de verdad), pero el upload real de archivos es un ítem de la fase 2 (ver `docs/ROADMAP.md`).
- La búsqueda por rango de fechas se sacó de `SearchBar` (el backend no tiene un endpoint de disponibilidad por fecha entre propiedades) — la búsqueda quedó acotada a categoría/ciudad. Buscar disponibilidad por fecha sigue existiendo, pero a nivel de una propiedad puntual (`ProductCalendar`/`BookingCalendar`, vía `GET /api/bookings/availability/{id}`).
- `general.scss` todavía usa `@import` y `map-get()` de Sass, que Dart Sass va a remover en 3.0 (hoy solo tira warnings, no rompe el build) — migrar a `@use`/`map.get()` queda pendiente.
