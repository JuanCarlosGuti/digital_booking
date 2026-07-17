# Roadmap — Cesar Travel (ex Digital Booking)

Estado del proyecto hoy: monolito Spring Boot 2.7 / Java 17 con huecos de seguridad reales (JWT con secreto hardcodeado, filtro JWT duplicado y muerto, `permitAll("/**")` que anula la protección de rutas), sin carga real de imágenes (solo URLs pegadas a mano), sin envío de emails, y sin concepto de "dueño" de un inmueble. Frontend React 18 sobre Create React App (deprecado), con sesión leída directo de `localStorage` y sin rutas protegidas.

Objetivo: "Cesar Travel" — backend en microservicios sobre Java 25, frontend React modernizado con identidad visual propia, autenticación corregida, carga real de imágenes, vista de ocupantes por propiedad, y notificación por correo al huésped y al propietario.

Ver [ARCHITECTURE.md](ARCHITECTURE.md) para el detalle de la arquitectura objetivo y [adr/](adr/) para el porqué de cada decisión.

## Fase 1 — Fundación

Entregable: paridad funcional con el sistema actual, pero en microservicios + Java 25 + identidad Cesar Travel, todo levantable local con `docker compose up`.

- [x] Diseñar contratos REST entre servicios y script de partición del dump (`ddbb/sprint 3/backend_integrador4.sql`) en los 3 schemas — condiciona todo lo demás, se hace antes de escribir código de negocio.
- [x] `auth-service` (Java 25 / Spring Boot 4.1, `SecurityFilterChain` limpio, JWT con secreto por variable de entorno) — construido, testeado, verificado contra MySQL real.
- [x] `property-service` (con columna `owner_id` ya creada, ver ADR-0004) — construido, testeado, verificado contra MySQL real, con los datos reales del dump migrados.
- [x] `booking-service` — construido, testeado, verificado end-to-end junto a auth-service y property-service (reserva, mis reservas, vista de ocupantes, cancelación).
- [x] `api-gateway` (Spring Cloud Gateway Server MVC, rutas estáticas, CORS centralizado) — construido y verificado: los 4 servicios corriendo juntos, todo el flujo (login, catálogo, reserva) probado pasando únicamente por el gateway.
- [x] Frontend: migración CRA → Vite, React 19, Vitest reemplazando Jest (19/19 archivos, 21/21 tests), limpieza de la deuda técnica inventariada durante el análisis (docs de trabajo eliminados al completarse la migración) (Header/Footer sin DOM directo, SearchBar, CalendarInput, ProductList, Login/Register, Product, ProductCalendar), componentes de clase restantes convertidos a hooks (BookingCalendar, ProductCalendar, ProductImages, MobileComponent), `AuthContext` real + rutas protegidas (`ProtectedRoute`) reemplazando el ocultamiento de UI por `localStorage`.
- [x] Rebrand completo: nombre Cesar Travel, logo árbol de cañaguate (`components/brand/CanaguateMark.jsx`), paleta Cesar/Guajira aplicada en `sass/general.scss` y propagada a toda la app.
- [x] Verificado end-to-end en navegador real (Playwright): registro, login, browse, crear reserva con validación de solapamiento, cancelar reserva, y **vista de ocupantes con nombre real del huésped** — sin errores de consola.
- [x] `docker-compose.yml` en la raíz: MySQL (3 schemas) + 4 servicios backend + frontend — levantado y verificado de punta a punta (registro/login vía gateway, catálogo, datos reales en las 3 bases). Fase 1 cerrada.
- [x] Documentación: este roadmap + ARCHITECTURE.md + ADRs (8 hasta ahora), READMEs reales por servicio y del frontend.
- [x] Catálogo de demo reescrito a **solo ciudades de Colombia** (antes mezclaba Argentina/Colombia, heredado del dump original) y ampliado a **28 propiedades** en 13 ciudades y 4 categorías (se agregó "Fincas"), para que la demo se vea más completa.

## Fase 2 — Funcionalidades pendientes

Las cosas que "no quedaron bien hechas" en el proyecto original. Dos de estas se adelantaron durante la fase 1 porque tocaban los mismos archivos que ya se estaban modernizando.

- [x] **Upload real de archivos** (multipart → volumen local `/data/uploads`, ver ADR-0005) — `POST /api/properties/{id}/images` en property-service guarda los archivos en disco (JPEG/PNG/WEBP, 8MB máx. por archivo) y los sirve como recurso estático en `/uploads/**`, ruteado también a través del gateway. `NewProductUploadMedia.jsx` ya no pide pegar una URL: es un input de archivo real con preview antes de subir. El flujo de creación queda en dos pasos (crear la propiedad, después subir sus imágenes) porque el endpoint de upload necesita que la propiedad ya exista.
- [x] **Ownership real de inmuebles activado en la UI** — `POST /api/properties` toma el dueño del JWT, `NewProduct` ya no es solo-ADMIN sino cualquier usuario autenticado ("Publicar propiedad" en el header).
- [x] **Vista de ocupantes** — `GET /api/bookings/property/{productId}` (identidad del huésped, solo el dueño) + `GET /api/bookings/availability/{productId}` (público, solo fechas, agregado durante la fase 1 al descubrir que el calendario de una propiedad necesitaba saber qué fechas ya estaban tomadas) + UI en `ProductOccupants` dentro del detalle de la propiedad.
- [x] **`notification-service` + emails de confirmación** (ver ADR-0002, ADR-0006) — 5º servicio (puerto 8084, sin DB, **sin puerto publicado ni ruta en el gateway**: solo booking-service lo llama por la red interna). booking-service dispara la notificación best-effort tras crear la reserva (timeouts cortos, jamás revierte la reserva — verificado reservando con el servicio caído); resuelve el email del dueño reenviando el JWT del huésped a auth-service. Variables SMTP en `.env.example` — vacías, el fallo solo se loguea.
- [ ] Cierre de mejoras de auth: expiración de token razonable (hoy 360h reales por un bug de `JwtGenerator.java` aunque el comentario dice "8 horas"), refresh token real.

## Fase 2b — Mejoras de usabilidad (jul 2026)

Plan acordado con el usuario para hacer la página más útil (se descartaron "precios por noche" y "footer con redes reales"; quedan como ideas futuras).

- [x] **Alcance territorial Cesar & La Guajira** — el modelo pasó de `ciudad + país` a `municipio + departamento` (columna `department` en `city`, sin país: el negocio es local/departamental). Catálogo reescrito: 28 propiedades en 12 municipios (6 de La Guajira: Riohacha, Palomino, Cabo de la Vela, Manaure, Uribia, Dibulla; 6 del Cesar: Valledupar, Pueblo Bello, La Paz, San Diego, Manaure Balcón del Cesar, Chimichagua), con coordenadas por municipio. Agregar municipios vecinos es un INSERT en el seed.
- [x] ~~Botón de WhatsApp para contactar al dueño~~ → **reemplazado por chat interno** (ver ADR-0009 y Fase 2c): el usuario pidió que la conversación quede dentro de la plataforma por privacidad. La columna `users.phone` (opcional al registrarse) se conserva pero no se expone.
- [x] **Mis propiedades** — `/my-properties`: el dueño lista, edita (formulario de publicar reutilizado en modo edición, reenviando las imágenes existentes porque el PUT las reemplaza) y elimina sus inmuebles.
- [x] **Búsqueda por fechas** — `GET /api/bookings/unavailable?from&to` (público, solo ids) + rango opcional en el buscador del home; los resultados excluyen inmuebles con reservas solapadas.
- [x] **Reseñas reales** — tabla `review` en booking_db (la regla "solo quien se hospedó y ya salió" se valida contra `reservation`, local); `POST /api/reviews` (403 sin estadía finalizada, 409 si repite), listado público por propiedad, `GET /api/reviews/summary?productIds=...` batch para las tarjetas (sin N+1), `reviewer_name` denormalizado del JWT. Las 4 estrellas pintadas de las tarjetas quedaron reemplazadas por el promedio real ("Sin reseñas aún" si no hay); el formulario vive en "Mis Reservas" (solo estadías finalizadas sin reseña previa).
- [x] **Compartir propiedad** — Web Share API nativa con fallback (copiar link + WhatsApp) en el header del detalle.
- [x] **Mapa de ubicación** — Leaflet + OpenStreetMap (react-leaflet v5, sin API key) en el detalle, sección "Zona de la propiedad" con las coordenadas del municipio.
- [ ] Ideas descartadas por ahora (decisión del usuario): precios por noche, redes reales en el footer.

## Fase 2c — Chat interno + pulido (jul 2026)

- [x] **Chat interno huésped↔dueño** (ver ADR-0009) — `chat-service` nuevo (6º servicio, puerto 8085, `chat_db`): conversación por inmueble, mensajes con leído/no-leído, badge "Mensajes" en el header, bandeja en `/messages` y hilo con actualización por sondeo (~4s). Reemplaza el botón de WhatsApp por decisión del usuario (privacidad y control — ningún dato de contacto se expone). Verificado end-to-end: abrir chat resuelve dueño real vía property/auth, no-leídos, marcar leído, respuesta, y 403 para no-participantes.
- [x] **Paginador** — 8 propiedades por página en el home, resultados de búsqueda y "Mis propiedades" (client-side; si el catálogo crece, el corte natural es paginar en `/api/properties`).
- [x] **Limpieza del desarrollo anterior** — eliminados: el monolito `backend/backend-integrador` (recuperable en el historial de git), los dumps y diagramas de `ddbb/` (ya migrados a Flyway), las colecciones Postman/Selenium de `testing/` (probaban el API viejo), los `.css/.css.map` compilados de la era CRA (el build usa los `.scss`) y los docs de análisis del frontend viejo. `.gitlab-ci.yml` reescrito para compilar los 5 servicios + frontend (el anterior compilaba el monolito con JDK 17 y desplegaba por SCP a un EC2 que ya no existe; deploy real queda para fase 3).

## Fase 3 — Endurecimiento y evaluación

- [ ] Tests unitarios/integración por servicio (JUnit5 + Testcontainers) y frontend (Vitest/RTL).
- [ ] CI/CD con imágenes Docker reemplazando el SCP directo actual (`.gitlab-ci.yml`).
- [ ] Volumen persistente para `/data/uploads` y MySQL en el deploy (hoy un redeploy por SCP pisaría el jar sin preservarlos).
- [ ] Logging básico.
- [ ] Reevaluar con el usuario qué más integrar.

## Riesgos conocidos

- Arrancar en microservicios desde cero es más esfuerzo inicial que crecer desde el monolito ya funcionando — decisión ya tomada, pero no subestimar el tiempo de la fase 1.
- SMTP con Gmail/Outlook tiene límite de envíos diarios — alcanza para demo, no para producción con tráfico real.
- Sin FKs reales cross-servicio, la integridad referencial depende de que cada servicio valide bien en escritura.
- El almacenamiento local de imágenes no sobrevive al pipeline de deploy actual — resolver el volumen persistente en fase 2/3, no al final.

## Deuda técnica y fallas conocidas

Cosas encontradas durante la construcción que quedaron documentadas en vez de perderse en silencio — quién retome el proyecto debería leer esto antes de sorprenderse con algo similar. Todo lo de esta sección ya está **resuelto** salvo donde se indica lo contrario; se deja registrado como referencia para `notification-service` y el resto del proyecto.

- **Toolchain Java 25 / Spring Boot 4.1** (ver [ADR-0008](adr/0008-toolchain-java25-spring-boot4.md), 7 hallazgos documentados) — resuelto: sin Lombok en los 4 servicios (no genera código en este entorno sin tirar error); `spring-boot-flyway`/`spring-boot-restclient`/`ObjectMapper` propio agregados donde hacían falta (Spring Boot 4 modularizó autoconfiguraciones que antes venían gratis, y ya no expone un `ObjectMapper` de Jackson 2 inyectable por defecto); `AuthenticationEntryPoint`/`AccessDeniedHandler` propios en los 3 servicios con seguridad para devolver 401 (no 403) cuando falta el token; `UserDetailsServiceAutoConfiguration` excluida en property-service/booking-service para no generar un usuario en memoria con password aleatoria que nunca se usa.
- **`booking-service` ahora valida solapamiento de fechas** entre reservas para un mismo inmueble (409 Conflict si se solapan) — ya no es una falla abierta. **Limitación residual, no resuelta:** la validación no es a prueba de condiciones de carrera bajo requests concurrentes para las mismas fechas; aceptable para el volumen actual, revisar si se agrega un lock pesimista o constraint de base más adelante.
- **`mvnw` con CRLF rompía el build de Docker** (`./mvnw: not found`, exit 127, en los 4 servicios Java) — Windows hacía checkout de los wrappers de Maven con terminadores CRLF (por `core.autocrlf`), lo que corrompe el shebang `#!/bin/sh` al ejecutarse dentro del contenedor Linux. Se corrigió el line-ending de los 4 `mvnw` existentes y se agregó `.gitattributes` (`*/mvnw text eol=lf`) para que no vuelva a pasar en futuros checkouts en Windows.
- **`header.scss` vs `Header.scss` rompía el build de Docker pero no el local** — `Header.jsx` importa `./Header.scss` y el archivo estaba en disco como `header.scss`: en Windows (filesystem case-insensitive) funciona, dentro del contenedor Linux el build de Vite falla con `Module not found`. Se renombró el archivo para que coincida con el import. Misma familia de problema que el CRLF de `mvnw`: cosas que Windows perdona y Linux no — si un build de Docker falla con "module not found" de un archivo que sí existe, revisar mayúsculas/minúsculas primero.
- **Las URLs de imágenes del CDN de Airbnb se pudren** — 9 de las 40 imágenes del seed empezaron a devolver 404 (a0.muscache.com borra las fotos cuando el anuncio original desaparece), dejando varias tarjetas del catálogo sin imagen. Se corrigió con la migración `V3__reemplazo_imagenes_rotas.sql` (reemplazos por fotos de Pexels, verificadas con HTTP 200 antes de sembrarlas). **Riesgo residual:** las ~31 URLs de muscache.com que siguen vivas pueden morir igual en el futuro — si vuelve a pasar, mismo procedimiento (verificar con curl, migración nueva de UPDATE); la solución de fondo sería servir el seed desde `/uploads` local como las imágenes subidas por usuarios.
- **`dependency:go-offline` fallaba al resolver `doxia-skin-model`** en la capa de warm-up de dependencias del `Dockerfile` de cada servicio Java (`Failed to read artifact descriptor for org.apache.maven.doxia:doxia-skin-model:jar:2.0.0`). Ese goal intenta resolver también los plugins de reporte/sitio (Doxia) que el proyecto no usa ni necesita para compilar — no es necesario para un build normal. Se reemplazó por `dependency:resolve dependency:resolve-plugins`, que solo resuelve lo que hace falta para compilar y empaquetar, en los 4 `Dockerfile` (`backend/services/*/Dockerfile`).
- **Vite 8 usa un transformador nuevo (Oxc) en vez de esbuild** para módulos `.js`/`.jsx` — no respeta la config clásica `esbuild.loader`/`optimizeDeps.esbuildOptions`. El proyecto heredaba varios `.js` con JSX adentro (costumbre de la época CRA/Babel, que no distinguía por extensión); se resolvió renombrando esos archivos a `.jsx` (`src/index.jsx`, `src/App.jsx`, y los 19 archivos de test) en vez de pelear con la config del transformador.
- **`react-date-range` es incompatible con `date-fns` 3/4** — sin pin explícito, npm resuelve la última versión de `date-fns` (4.x) y la app crashea entera al cargar (`(0, _addYears.default) is not a function`) porque `react-date-range` todavía usa los imports profundos de la API vieja de `date-fns` 2.x. Se fijó `date-fns` a `2.30.0` como dependencia directa. Encontrado recién al verificar en un navegador real — es el tipo de falla que un build exitoso (`vite build`) no detecta, porque el error solo ocurre en tiempo de ejecución al importar el módulo.
- **Lección de proceso:** el build de Vite (`npm run build`) pasó limpio mucho antes de encontrar el bug de `date-fns` de arriba — un build exitoso no es suficiente evidencia de que la app funciona. Hace falta levantar el servidor de desarrollo y ejercitarla en un navegador real (automatizado con Playwright acá) antes de dar por buena una migración de este tamaño.
