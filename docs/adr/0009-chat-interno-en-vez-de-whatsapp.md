# ADR-0009: Chat interno en vez de contacto por WhatsApp

## Estado
Aceptado

## Contexto
La primera versión del contacto huésped→dueño fue un botón de WhatsApp (`wa.me/57{celular}`),
que exigía exponer el celular del dueño al huésped y sacaba la conversación de la plataforma.
El usuario del proyecto pidió reemplazarlo **por privacidad y control**: que ningún dato de
contacto personal se exponga y que la conversación quede dentro de Cesar Travel.

## Decisión
Se construyó `chat-service` (6º microservicio, puerto 8085, schema `chat_db`) con conversaciones
huésped↔dueño por inmueble (una por par producto-huésped) y mensajes con estado leído/no-leído.

- **Actualización por sondeo (polling), no WebSocket** — decisión explícita del usuario: el hilo
  abierto se refresca cada ~4s y el badge del header cada ~20s. Suficiente para coordinar una
  reserva; si el chat se vuelve intensivo, el paso natural es STOMP/WebSocket sin cambiar el modelo.
- El dueño del inmueble se resuelve **contra property-service** al abrir el chat (nunca se confía
  en ids provistos por el cliente); su nombre se denormaliza vía auth-service reenviando el JWT
  del huésped (mismo patrón que los emails de booking-service, ver ADR-0002).
- Nombres y título del inmueble van **denormalizados** en la conversación: listar la bandeja no
  llama a ningún otro servicio.
- Todos los endpoints requieren sesión y validan pertenencia (solo los dos participantes ven el
  hilo — 403 para cualquier otro).
- El botón de WhatsApp se eliminó de la UI. La columna `users.phone` (opcional) se conserva por
  si un caso futuro la necesita, pero no se muestra a nadie.

## Consecuencias
- Un microservicio más que construir/levantar (compose ya lo orquesta; `chat_db` + usuario propio
  en `infra/mysql/init.sql`).
- El sondeo genera tráfico constante mientras hay pestañas abiertas — irrelevante a esta escala,
  medible si algún día hay cientos de usuarios simultáneos (ahí conviene WebSocket).
- Los mensajes quedan en la base sin cifrado a nivel de aplicación — aceptable para coordinación
  de reservas; no usar el chat para datos sensibles queda como advertencia de producto.
