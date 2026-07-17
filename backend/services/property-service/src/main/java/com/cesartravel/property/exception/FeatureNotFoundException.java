package com.cesartravel.property.exception;

public class FeatureNotFoundException extends RuntimeException {

    public FeatureNotFoundException(Long id) {
        super("No existe una feature con id " + id);
    }
}
