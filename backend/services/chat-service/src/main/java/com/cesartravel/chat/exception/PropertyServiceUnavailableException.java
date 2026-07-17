package com.cesartravel.chat.exception;

public class PropertyServiceUnavailableException extends RuntimeException {

    public PropertyServiceUnavailableException(Throwable cause) {
        super("property-service no respondió — no se puede validar el inmueble en este momento", cause);
    }
}
