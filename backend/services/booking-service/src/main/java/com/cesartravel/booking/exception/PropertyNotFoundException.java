package com.cesartravel.booking.exception;

public class PropertyNotFoundException extends RuntimeException {

    public PropertyNotFoundException(Long productId) {
        super("No existe un inmueble con id " + productId);
    }
}
