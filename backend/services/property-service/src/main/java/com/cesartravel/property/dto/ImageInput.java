package com.cesartravel.property.dto;

import jakarta.validation.constraints.NotBlank;

/** URL pegada a mano al crear una propiedad — puente hasta que exista upload real de archivos
 * (POST /api/properties/{id}/images, fase 2, ver docs/ROADMAP.md y ADR-0005). */
public record ImageInput(String title, @NotBlank String url) {
}
