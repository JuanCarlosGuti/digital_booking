package com.cesartravel.auth.exception;

public class EmailAlreadyRegisteredException extends RuntimeException {

    public EmailAlreadyRegisteredException(String email) {
        super("Ya existe una cuenta registrada con el email " + email);
    }
}
