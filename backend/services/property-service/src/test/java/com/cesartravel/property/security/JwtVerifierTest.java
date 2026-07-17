package com.cesartravel.property.security;

import static org.assertj.core.api.Assertions.assertThat;

import io.jsonwebtoken.Jwts;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.Test;

/** Simula un token tal como lo emite auth-service, para confirmar que property-service
 * lo valida correctamente usando el mismo secreto compartido (ver ADR-0002). */
class JwtVerifierTest {

    private final String secret = Base64.getEncoder().encodeToString("una-clave-de-prueba-de-32-bytes!".getBytes());
    private final JwtVerifier jwtVerifier = new JwtVerifier(new JwtProperties(secret));

    private String tokenIssuedByAuthService() {
        SecretKey key = new SecretKeySpec(Base64.getDecoder().decode(secret), "HmacSHA256");
        Instant now = Instant.now();
        return Jwts.builder()
                .subject("sofia@example.com")
                .claim("id", 42L)
                .claim("name", "Sofía")
                .claim("lastname", "Gómez")
                .claim("role", "USER")
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(5, ChronoUnit.MINUTES)))
                .signWith(key)
                .compact();
    }

    @Test
    void parsesIdEmailAndRoleFromAValidToken() {
        AuthenticatedUser user = jwtVerifier.verify(tokenIssuedByAuthService());

        assertThat(user).isNotNull();
        assertThat(user.id()).isEqualTo(42L);
        assertThat(user.email()).isEqualTo("sofia@example.com");
        assertThat(user.role()).isEqualTo("USER");
        assertThat(user.isAdmin()).isFalse();
    }

    @Test
    void returnsNullForATamperedToken() {
        String token = tokenIssuedByAuthService();
        String tampered = token.substring(0, token.length() - 2) + "xx";

        assertThat(jwtVerifier.verify(tampered)).isNull();
    }

    @Test
    void returnsNullForGarbage() {
        assertThat(jwtVerifier.verify("not-a-jwt")).isNull();
    }
}
