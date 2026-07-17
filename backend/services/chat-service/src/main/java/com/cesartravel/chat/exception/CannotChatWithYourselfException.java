package com.cesartravel.chat.exception;

public class CannotChatWithYourselfException extends RuntimeException {

    public CannotChatWithYourselfException() {
        super("No podés abrir un chat sobre tu propia propiedad");
    }
}
