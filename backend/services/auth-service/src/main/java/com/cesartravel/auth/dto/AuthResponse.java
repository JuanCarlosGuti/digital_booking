package com.cesartravel.auth.dto;

public record AuthResponse(
        String token,
        Long id,
        String name,
        String lastname,
        String email,
        String role) {
}
