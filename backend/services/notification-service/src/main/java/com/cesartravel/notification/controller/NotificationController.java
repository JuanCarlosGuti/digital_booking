package com.cesartravel.notification.controller;

import com.cesartravel.notification.dto.BookingConfirmationRequest;
import com.cesartravel.notification.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Endpoint interno — booking-service lo llama tras crear una reserva. NO se rutea en el
 * api-gateway a propósito: nadie de afuera debería poder disparar emails (ver ADR-0002). */
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final EmailService emailService;

    public NotificationController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/booking-confirmation")
    public ResponseEntity<Void> bookingConfirmation(@Valid @RequestBody BookingConfirmationRequest request) {
        emailService.sendBookingConfirmation(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
