package com.cesartravel.property.exception;

public class NotPropertyOwnerException extends RuntimeException {

    public NotPropertyOwnerException() {
        super("No sos el propietario de esta propiedad");
    }
}
