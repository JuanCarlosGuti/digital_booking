package com.cesartravel.booking.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/** Vista mínima de un inmueble tal como lo expone property-service — solo lo que
 * booking-service necesita (existencia + dueño), ignora el resto del payload. */
@JsonIgnoreProperties(ignoreUnknown = true)
public record PropertyView(Long id, Long ownerId, String title) {
}
