package com.cesartravel.booking.dto;

import com.cesartravel.booking.model.Reservation;
import java.time.LocalDate;

/** Solo fechas, sin identidad del huésped — a diferencia de BookingResponse, esta vista es
 * pública (ver SecurityConfig): cualquiera puede consultar qué fechas ya están ocupadas para
 * deshabilitarlas en el calendario, pero no quién las reservó. */
public record AvailabilityResponse(LocalDate checkIn, LocalDate checkOut) {

    public static AvailabilityResponse from(Reservation reservation) {
        return new AvailabilityResponse(reservation.getCheckIn(), reservation.getCheckOut());
    }
}
