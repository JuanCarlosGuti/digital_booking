package com.cesartravel.property.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import java.util.Base64;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Component;

@Component
public class JwtVerifier {

    private final SecretKey signingKey;

    public JwtVerifier(JwtProperties properties) {
        if (properties.secret() == null || properties.secret().isBlank()) {
            throw new IllegalStateException(
                    "cesartravel.jwt.secret no está configurado. Definí la variable de entorno JWT_SECRET "
                            + "(el mismo valor que usa auth-service) antes de levantar property-service.");
        }
        byte[] keyBytes = Base64.getDecoder().decode(properties.secret());
        this.signingKey = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    /** Devuelve null si el token es inválido o expiró — quien llama decide si eso importa
     * (endpoints públicos ignoran el resultado, los protegidos lo exigen vía SecurityFilterChain). */
    public AuthenticatedUser verify(String token) {
        try {
            Claims claims = Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
            return new AuthenticatedUser(
                    claims.get("id", Long.class), claims.getSubject(), String.valueOf(claims.get("role")));
        } catch (JwtException | IllegalArgumentException ex) {
            return null;
        }
    }
}
