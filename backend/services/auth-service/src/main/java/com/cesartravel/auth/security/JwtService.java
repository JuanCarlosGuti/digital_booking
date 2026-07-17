package com.cesartravel.auth.security;

import com.cesartravel.auth.exception.InvalidTokenException;
import com.cesartravel.auth.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long expirationMinutes;

    public JwtService(JwtProperties properties) {
        if (properties.secret() == null || properties.secret().isBlank()) {
            throw new IllegalStateException(
                    "cesartravel.jwt.secret no está configurado. Definí la variable de entorno AUTH_JWT_SECRET "
                            + "(mínimo 32 bytes en base64) antes de levantar auth-service.");
        }
        byte[] keyBytes = java.util.Base64.getDecoder().decode(properties.secret());
        this.signingKey = new SecretKeySpec(keyBytes, "HmacSHA256");
        this.expirationMinutes = properties.expirationMinutes();
    }

    public String generateToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("id", user.getId())
                .claim("name", user.getName())
                .claim("lastname", user.getLastname())
                .claim("role", user.getRole().getName())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(expirationMinutes, ChronoUnit.MINUTES)))
                .signWith(signingKey)
                .compact();
    }

    /** Reemite un token válido y no expirado con una nueva ventana de expiración (refresh simple). */
    public String reissueToken(String currentToken) {
        Claims claims = parseClaims(currentToken);
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(claims.getSubject())
                .claim("id", claims.get("id"))
                .claim("name", claims.get("name"))
                .claim("lastname", claims.get("lastname"))
                .claim("role", claims.get("role"))
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(expirationMinutes, ChronoUnit.MINUTES)))
                .signWith(signingKey)
                .compact();
    }

    public Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (JwtException | IllegalArgumentException ex) {
            throw new InvalidTokenException("Token inválido o expirado", ex);
        }
    }

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }
}
