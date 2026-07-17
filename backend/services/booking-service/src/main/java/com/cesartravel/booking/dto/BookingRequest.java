package com.cesartravel.booking.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record BookingRequest(
        @NotNull Long productId,
        @NotNull @Future(message = "checkIn debe ser una fecha futura") LocalDate checkIn,
        @NotNull @Future(message = "checkOut debe ser una fecha futura") LocalDate checkOut) {
}
