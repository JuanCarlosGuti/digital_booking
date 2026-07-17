package com.cesartravel.booking.dto;

/** Promedio + cantidad por inmueble — endpoint batch para pintar estrellas en las tarjetas
 * del catálogo con una sola llamada (sin N+1). */
public record ReviewSummaryResponse(Long productId, Double avgRating, Long reviewCount) {
}
