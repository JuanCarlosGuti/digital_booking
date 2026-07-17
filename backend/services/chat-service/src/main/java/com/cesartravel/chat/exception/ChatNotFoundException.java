package com.cesartravel.chat.exception;

public class ChatNotFoundException extends RuntimeException {

    public ChatNotFoundException(Long id) {
        super("No existe la conversación " + id);
    }
}
