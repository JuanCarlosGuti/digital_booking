package com.cesartravel.chat.security;

/** Identidad extraída del JWT (auth-service la firma; acá solo se valida). name/lastname
 * viajan como claims en el token — se usan para denormalizar reviewer_name en las reseñas
 * y para el payload de emails, sin llamadas extra a auth-service. */
public record AuthenticatedUser(Long id, String email, String name, String lastname, String role) {

    public boolean isAdmin() {
        return "ADMIN".equals(role);
    }
}
