package com.cesartravel.booking.client;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

/** Cliente REST a auth-service, solo para resolver el email del dueño al notificar una reserva
 * (ver ADR-0002). Reenvía el JWT del huésped: el endpoint /api/auth/users/{id} acepta cualquier
 * usuario autenticado, así que no hace falta un token de servicio ni un endpoint sin auth.
 * Nunca propaga errores — si auth-service no responde, el email al dueño simplemente no sale. */
@Component
public class AuthServiceClient {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceClient.class);

    private final RestClient restClient;

    public AuthServiceClient(RestClient.Builder restClientBuilder, AuthServiceProperties properties) {
        this.restClient = restClientBuilder.baseUrl(properties.baseUrl()).build();
    }

    public Optional<UserView> findById(Long userId, String bearerToken) {
        try {
            UserView view = restClient
                    .get()
                    .uri("/api/auth/users/{id}", userId)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + bearerToken)
                    .retrieve()
                    .body(UserView.class);
            return Optional.ofNullable(view);
        } catch (RestClientException ex) {
            log.warn("No se pudo resolver el usuario {} en auth-service: {}", userId, ex.getMessage());
            return Optional.empty();
        }
    }
}
