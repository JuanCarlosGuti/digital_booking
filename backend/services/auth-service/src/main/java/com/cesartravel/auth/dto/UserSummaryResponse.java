package com.cesartravel.auth.dto;

/** Vista mínima de un usuario, para que otros servicios (booking-service, property-service)
 * resuelvan nombre/email sin exponer la contraseña ni depender del modelo interno de auth-service.
 * phone puede ser null — es opcional al registrarse (botón de WhatsApp solo si existe). */
public record UserSummaryResponse(
        Long id,
        String name,
        String lastname,
        String email,
        String phone) {
}
