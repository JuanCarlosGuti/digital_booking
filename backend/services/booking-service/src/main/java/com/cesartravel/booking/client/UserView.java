package com.cesartravel.booking.client;

/** Vista mínima de un usuario tal como la expone auth-service (/api/auth/users/{id}). */
public record UserView(Long id, String name, String lastname, String email, String phone) {
}
