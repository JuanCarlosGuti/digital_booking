package com.cesartravel.chat.dto;

import com.cesartravel.chat.model.Message;
import java.time.LocalDateTime;

public record MessageResponse(Long id, Long senderId, String body, LocalDateTime createdAt) {

    public static MessageResponse from(Message message) {
        return new MessageResponse(
                message.getId(), message.getSenderId(), message.getBody(), message.getCreatedAt());
    }
}
