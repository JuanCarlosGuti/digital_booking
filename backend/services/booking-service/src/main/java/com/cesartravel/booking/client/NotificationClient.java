package com.cesartravel.booking.client;

import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/** Llamada best-effort a notification-service tras crear una reserva (ver ADR-0002): timeout
 * corto para no colgar el flujo de reserva, y jamás propaga errores — si el email no sale,
 * se loguea y la reserva sigue siendo válida. */
@Component
public class NotificationClient {

    private static final Logger log = LoggerFactory.getLogger(NotificationClient.class);

    /** Payload de POST /api/notifications/booking-confirmation (espejo del DTO de notification-service). */
    public record BookingConfirmationPayload(
            Long bookingId,
            String propertyTitle,
            LocalDate checkIn,
            LocalDate checkOut,
            String guestName,
            String guestEmail,
            String ownerName,
            String ownerEmail) {
    }

    private final RestClient restClient;

    public NotificationClient(RestClient.Builder restClientBuilder, NotificationProperties properties) {
        // Timeouts cortos a propósito: el email es un efecto secundario, no puede demorar la reserva.
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(2_000);
        requestFactory.setReadTimeout(3_000);
        this.restClient = restClientBuilder
                .baseUrl(properties.baseUrl())
                .requestFactory(requestFactory)
                .build();
    }

    public void sendBookingConfirmation(BookingConfirmationPayload payload) {
        try {
            restClient
                    .post()
                    .uri("/api/notifications/booking-confirmation")
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();
            log.info("Notificación de reserva #{} despachada a notification-service", payload.bookingId());
        } catch (Exception ex) {
            log.warn(
                    "No se pudo notificar la reserva #{} (best-effort, la reserva sigue válida): {}",
                    payload.bookingId(),
                    ex.getMessage());
        }
    }
}
