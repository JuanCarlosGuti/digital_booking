# ADR-0002: Comunicación síncrona REST entre servicios, sin broker de mensajería

## Estado
Aceptado

## Contexto
Con el backend partido en auth-service, property-service, booking-service y notification-service, hace falta que unos se comuniquen con otros: booking-service necesita validar que un producto existe, resolver emails de huésped/propietario, y avisarle a notification-service que mande un correo tras crear una reserva.

## Decisión
REST síncrono entre servicios, usado **solo cuando hay autorización o validación real de por medio**:
- booking-service valida `productId` contra property-service antes de crear una reserva.
- booking-service resuelve emails de huésped y propietario vía auth-service antes de llamar a notification-service, y le pasa el payload ya armado (notification-service no vuelve a llamar a nadie).
- El envío de la notificación es un **POST best-effort**: si falla, se loguea (y opcionalmente se registra en un `NotificationLog` para reintento manual) pero no revierte ni bloquea la creación de la reserva.

Para datos de solo lectura sin lógica de negocio (ej. mostrar título/imagen de un producto en "mis reservas"), es el **frontend** el que agrega llamando directo a property-service con el `productId` que ya tiene — evita que booking-service se convierta en un orquestador de todo lo demás.

## Alternativas consideradas
- **Broker de mensajería (Kafka/RabbitMQ) para desacoplar completamente los servicios**: se descarta por ahora. Para 4 servicios y el volumen de este proyecto, un broker agrega un componente más para operar (y aprender/depurar) sin un beneficio proporcional. Si en el futuro el envío de notificaciones necesita reintentos robustos o hay más eventos de dominio que emitir, migrar de "POST best-effort" a "evento en una cola" es un cambio incremental y localizado a notification-service, no una reescritura general.

## Consecuencias
- Acoplamiento en tiempo de ejecución: si property-service o auth-service están caídos, crear una reserva falla (para la validación de producto) — es una degradación aceptable dado el tamaño del sistema.
- El fallo de notification-service **no** debe poder tumbar la creación de una reserva; hay que implementar el POST con timeout corto y manejo de error que no propague la excepción hacia arriba.
