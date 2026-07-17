package com.cesartravel.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

/** Payload que arma booking-service tras crear una reserva. owner* pueden venir null si
 * auth-service no respondió a tiempo — en ese caso solo se le escribe al huésped. */
public record BookingConfirmationRequest(
        @NotNull Long bookingId,
        @NotBlank String propertyTitle,
        @NotNull LocalDate checkIn,
        @NotNull LocalDate checkOut,
        @NotBlank String guestName,
        @NotBlank String guestEmail,
        String ownerName,
        String ownerEmail) {
}
