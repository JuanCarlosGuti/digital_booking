package com.cesartravel.property.exception;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(Long id) {
        super("No existe una propiedad con id " + id);
    }
}
