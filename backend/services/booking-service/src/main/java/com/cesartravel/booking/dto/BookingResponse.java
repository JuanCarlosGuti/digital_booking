package com.cesartravel.booking.dto;

import com.cesartravel.booking.model.Reservation;
import java.time.LocalDate;

public record BookingResponse(Long id, Long productId, Long userId, LocalDate checkIn, LocalDate checkOut) {

    public static BookingResponse from(Reservation reservation) {
        return new BookingResponse(
                reservation.getId(),
                reservation.getProductId(),
                reservation.getUserId(),
                reservation.getCheckIn(),
                reservation.getCheckOut());
    }
}
