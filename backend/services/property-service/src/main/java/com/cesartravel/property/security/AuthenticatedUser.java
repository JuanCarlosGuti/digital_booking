package com.cesartravel.property.security;

public record AuthenticatedUser(Long id, String email, String role) {

    public boolean isAdmin() {
        return "ADMIN".equals(role);
    }
}
