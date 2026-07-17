package com.cesartravel.booking.exception;

public class ReviewNotAllowedException extends RuntimeException {

    public ReviewNotAllowedException() {
        super("Solo podés reseñar propiedades donde ya te hospedaste (con la estadía finalizada)");
    }
}
