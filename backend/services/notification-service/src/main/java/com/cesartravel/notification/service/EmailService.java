package com.cesartravel.notification.service;

import com.cesartravel.notification.dto.BookingConfirmationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/** Emails de confirmación de reserva por SMTP (ver ADR-0006). Texto plano a propósito:
 * el valor está en que el aviso llegue, no en el diseño. Cada envío va en su propio
 * try/catch — que falle el del dueño no impide el del huésped, y viceversa. */
@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final String from;

    public EmailService(JavaMailSender mailSender, @Value("${cesartravel.mail.from}") String from) {
        this.mailSender = mailSender;
        this.from = from;
    }

    public void sendBookingConfirmation(BookingConfirmationRequest request) {
        sendSafely(
                request.guestEmail(),
                "Tu reserva en Cesar Travel está confirmada",
                """
                Hola %s!

                Tu reserva #%d de "%s" está confirmada.

                Check-in:  %s
                Check-out: %s

                ¡Buen viaje!
                — Cesar Travel
                """.formatted(
                        request.guestName(),
                        request.bookingId(),
                        request.propertyTitle(),
                        request.checkIn(),
                        request.checkOut()));

        if (request.ownerEmail() != null && !request.ownerEmail().isBlank()) {
            sendSafely(
                    request.ownerEmail(),
                    "Nueva reserva en tu propiedad — Cesar Travel",
                    """
                    Hola %s!

                    %s reservó tu propiedad "%s".

                    Check-in:  %s
                    Check-out: %s

                    Podés ver los ocupantes de tu propiedad desde su página en Cesar Travel.
                    — Cesar Travel
                    """.formatted(
                            request.ownerName() == null ? "" : request.ownerName(),
                            request.guestName(),
                            request.propertyTitle(),
                            request.checkIn(),
                            request.checkOut()));
        } else {
            log.info("Reserva #{} sin email del dueño — solo se notificó al huésped", request.bookingId());
        }
    }

    private void sendSafely(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Email enviado a {}: {}", to, subject);
        } catch (Exception ex) {
            // Best-effort (ADR-0002): el fallo se loguea y no se propaga — la reserva ya existe.
            log.warn("No se pudo enviar el email a {}: {}", to, ex.getMessage());
        }
    }
}
