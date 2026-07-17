package com.cesartravel.booking.exception;

public class NotReservationOwnerException extends RuntimeException {

    public NotReservationOwnerException() {
        super("No sos el dueño de esta reserva ni el propietario del inmueble");
    }
}
