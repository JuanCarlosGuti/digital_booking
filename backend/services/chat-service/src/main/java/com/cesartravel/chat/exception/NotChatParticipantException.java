package com.cesartravel.chat.exception;

public class NotChatParticipantException extends RuntimeException {

    public NotChatParticipantException() {
        super("No sos participante de esta conversación");
    }
}
