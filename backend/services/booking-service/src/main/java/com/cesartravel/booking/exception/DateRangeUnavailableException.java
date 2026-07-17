package com.cesartravel.booking.exception;

public class DateRangeUnavailableException extends RuntimeException {

    public DateRangeUnavailableException() {
        super("El inmueble ya tiene una reserva que se solapa con esas fechas");
    }
}
