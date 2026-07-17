package com.cesartravel.property.exception;

public class CityNotFoundException extends RuntimeException {

    public CityNotFoundException(Long id) {
        super("No existe una ciudad con id " + id);
    }
}
