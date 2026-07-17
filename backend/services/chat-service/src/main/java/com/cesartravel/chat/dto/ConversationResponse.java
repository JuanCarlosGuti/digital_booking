package com.cesartravel.chat.dto;

import com.cesartravel.chat.model.Conversation;

/** Resumen para la lista de chats: con quién hablo (según mi rol), sobre qué inmueble,
 * el último mensaje y cuántos me faltan leer. */
public record ConversationResponse(
        Long id,
        Long productId,
        String productTitle,
        Long otherUserId,
        String otherUserName,
        String lastMessage,
        long unreadCount) {

    public static ConversationResponse from(
            Conversation conversation, Long viewerId, String lastMessage, long unreadCount) {
        boolean viewerIsGuest = conversation.getGuestId().equals(viewerId);
        return new ConversationResponse(
                conversation.getId(),
                conversation.getProductId(),
                conversation.getProductTitle(),
                viewerIsGuest ? conversation.getOwnerId() : conversation.getGuestId(),
                viewerIsGuest ? conversation.getOwnerName() : conversation.getGuestName(),
                lastMessage,
                unreadCount);
    }
}
