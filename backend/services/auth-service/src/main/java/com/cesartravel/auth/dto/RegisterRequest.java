package com.cesartravel.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank String name,
        @NotBlank String lastname,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres") String password,
        // Opcional (sin @NotBlank; @Pattern ignora null) — celular colombiano para WhatsApp.
        @Pattern(regexp = "^3\\d{9}$", message = "El celular debe ser colombiano: 10 dígitos empezando por 3")
        String phone) {
}
