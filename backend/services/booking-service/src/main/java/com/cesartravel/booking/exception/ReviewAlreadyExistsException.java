package com.cesartravel.booking.exception;

public class ReviewAlreadyExistsException extends RuntimeException {

    public ReviewAlreadyExistsException() {
        super("Ya dejaste una reseña para esta propiedad");
    }
}
