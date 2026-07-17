package com.cesartravel.auth.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.cesartravel.auth.exception.InvalidTokenException;
import com.cesartravel.auth.model.Role;
import com.cesartravel.auth.model.User;
import io.jsonwebtoken.Claims;
import java.util.Base64;
import org.junit.jupiter.api.Test;

class JwtServiceTest {

    private final JwtProperties properties = new JwtProperties(
            Base64.getEncoder().encodeToString("una-clave-de-prueba-de-32-bytes!".getBytes()), 5);
    private final JwtService jwtService = new JwtService(properties);

    private User sampleUser() {
        Role role = new Role();
        role.setId(2L);
        role.setName("USER");

        User user = new User();
        user.setId(1L);
        user.setName("Sofía");
        user.setLastname("Gómez");
        user.setEmail("sofia@example.com");
        user.setRole(role);
        return user;
    }

    @Test
    void generatesAndParsesAValidToken() {
        String token = jwtService.generateToken(sampleUser());

        Claims claims = jwtService.parseClaims(token);

        assertThat(claims.getSubject()).isEqualTo("sofia@example.com");
        assertThat(claims.get("role")).isEqualTo("USER");
        assertThat(claims.get("id", Integer.class)).isEqualTo(1);
    }

    @Test
    void rejectsATamperedToken() {
        String token = jwtService.generateToken(sampleUser());
        String tampered = token.substring(0, token.length() - 2) + "xx";

        assertThatThrownBy(() -> jwtService.parseClaims(tampered))
                .isInstanceOf(InvalidTokenException.class);
    }

    @Test
    void reissueKeepsTheSameSubjectAndRole() {
        String token = jwtService.generateToken(sampleUser());

        String reissued = jwtService.reissueToken(token);
        Claims claims = jwtService.parseClaims(reissued);

        assertThat(claims.getSubject()).isEqualTo("sofia@example.com");
        assertThat(claims.get("role")).isEqualTo("USER");
    }

    @Test
    void requiresASecretToBeConfigured() {
        assertThatThrownBy(() -> new JwtService(new JwtProperties("", 5)))
                .isInstanceOf(IllegalStateException.class);
    }
}
