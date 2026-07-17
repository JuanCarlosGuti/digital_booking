# ADR-0006: Notificaciones por correo vía SMTP simple, no AWS SES

## Estado
Aceptado

## Contexto
Hoy no existe envío de emails en el sistema. Se necesita avisarle al huésped y al propietario cuando se confirma una reserva.

## Decisión
`notification-service` usa `spring-boot-starter-mail` contra un servidor SMTP simple (Gmail u Outlook con app password), configurado por variables de entorno (`SMTP_HOST`, `SMTP_USER`, `SMTP_APP_PASSWORD`), nunca hardcodeado. Decisión explícita del usuario del proyecto: sin AWS SES por ahora.

## Consecuencias
- Límite de envíos diarios de una cuenta personal de Gmail/Outlook (del orden de cientos por día) — suficiente para demo/portafolio, no para producción con tráfico real. Queda documentado como límite conocido, no bloqueante hoy.
- Si el volumen de reservas crece, migrar a un proveedor transaccional (SES, SendGrid, Mailgun) es un cambio acotado a `notification-service` (cambia la configuración de envío, no el contrato `POST /api/notifications/booking-confirmation` que consumen los demás servicios).
