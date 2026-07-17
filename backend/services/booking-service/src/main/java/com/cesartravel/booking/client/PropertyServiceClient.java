package com.cesartravel.booking.client;

import com.cesartravel.booking.exception.PropertyServiceUnavailableException;
import java.util.Optional;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

/** Cliente REST a property-service (ver ADR-0002: comunicación síncrona solo cuando hay
 * validación real de por medio — acá, confirmar que el inmueble existe y quién es el dueño). */
@Component
public class PropertyServiceClient {

    private final RestClient restClient;

    public PropertyServiceClient(RestClient.Builder restClientBuilder, PropertyServiceProperties properties) {
        this.restClient = restClientBuilder.baseUrl(properties.baseUrl()).build();
    }

    public Optional<PropertyView> findById(Long productId) {
        try {
            PropertyView view = restClient
                    .get()
                    .uri("/api/properties/{id}", productId)
                    .retrieve()
                    .body(PropertyView.class);
            return Optional.ofNullable(view);
        } catch (HttpClientErrorException.NotFound ex) {
            return Optional.empty();
        } catch (RestClientException ex) {
            throw new PropertyServiceUnavailableException(ex);
        }
    }
}
