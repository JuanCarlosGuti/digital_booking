package com.cesartravel.chat.service;

import com.cesartravel.chat.client.AuthServiceClient;
import com.cesartravel.chat.client.PropertyServiceClient;
import com.cesartravel.chat.client.PropertyView;
import com.cesartravel.chat.dto.ConversationResponse;
import com.cesartravel.chat.dto.MessageRequest;
import com.cesartravel.chat.dto.MessageResponse;
import com.cesartravel.chat.exception.CannotChatWithYourselfException;
import com.cesartravel.chat.exception.ChatNotFoundException;
import com.cesartravel.chat.exception.NotChatParticipantException;
import com.cesartravel.chat.exception.PropertyNotFoundException;
import com.cesartravel.chat.model.Conversation;
import com.cesartravel.chat.model.Message;
import com.cesartravel.chat.repository.ConversationRepository;
import com.cesartravel.chat.repository.MessageRepository;
import com.cesartravel.chat.security.AuthenticatedUser;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final PropertyServiceClient propertyServiceClient;
    private final AuthServiceClient authServiceClient;

    public ChatService(
            ConversationRepository conversationRepository,
            MessageRepository messageRepository,
            PropertyServiceClient propertyServiceClient,
            AuthServiceClient authServiceClient) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.propertyServiceClient = propertyServiceClient;
        this.authServiceClient = authServiceClient;
    }

    /** Devuelve la conversación existente para (inmueble, huésped) o crea una nueva.
     * El inmueble y su dueño se resuelven contra property-service — jamás se confía en
     * ids de dueño provistos por el cliente. */
    @Transactional
    public ConversationResponse openChat(Long productId, AuthenticatedUser guest) {
        Conversation existing = conversationRepository
                .findByProductIdAndGuestId(productId, guest.id())
                .orElse(null);
        if (existing != null) {
            return toResponse(existing, guest.id());
        }

        PropertyView property = propertyServiceClient
                .findById(productId)
                .orElseThrow(() -> new PropertyNotFoundException(productId));
        if (property.ownerId() == null || property.ownerId().equals(guest.id())) {
            throw new CannotChatWithYourselfException();
        }

        // Nombre del dueño denormalizado — mejor esfuerzo vía auth-service con el JWT del
        // huésped (el endpoint acepta cualquier autenticado); si falla, un placeholder digno.
        String token = String.valueOf(SecurityContextHolder.getContext().getAuthentication().getCredentials());
        String ownerName = authServiceClient
                .findById(property.ownerId(), token)
                .map(owner -> (owner.name() + " " + owner.lastname()).trim())
                .orElse("Dueño de la propiedad");

        Conversation conversation = new Conversation();
        conversation.setProductId(property.id());
        conversation.setProductTitle(property.title());
        conversation.setGuestId(guest.id());
        conversation.setGuestName((guest.name() + " " + guest.lastname()).trim());
        conversation.setOwnerId(property.ownerId());
        conversation.setOwnerName(ownerName);
        conversation.setCreatedAt(LocalDateTime.now());

        return toResponse(conversationRepository.save(conversation), guest.id());
    }

    public List<ConversationResponse> findMine(AuthenticatedUser viewer) {
        return conversationRepository.findByGuestIdOrOwnerIdOrderByIdDesc(viewer.id(), viewer.id()).stream()
                .map(conversation -> toResponse(conversation, viewer.id()))
                .toList();
    }

    public List<MessageResponse> findMessages(Long conversationId, AuthenticatedUser viewer) {
        requireParticipant(conversationId, viewer);
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId).stream()
                .map(MessageResponse::from)
                .toList();
    }

    @Transactional
    public MessageResponse sendMessage(Long conversationId, MessageRequest request, AuthenticatedUser sender) {
        Conversation conversation = requireParticipant(conversationId, sender);

        Message message = new Message();
        message.setConversation(conversation);
        message.setSenderId(sender.id());
        message.setBody(request.body());
        message.setCreatedAt(LocalDateTime.now());

        return MessageResponse.from(messageRepository.save(message));
    }

    /** Marca como leídos los mensajes que el otro participante le mandó al usuario. */
    @Transactional
    public void markRead(Long conversationId, AuthenticatedUser viewer) {
        requireParticipant(conversationId, viewer);
        messageRepository.markIncomingAsRead(conversationId, viewer.id());
    }

    /** Total de mensajes sin leer en todas las conversaciones — para el badge del header. */
    public long countUnread(AuthenticatedUser viewer) {
        return messageRepository.countUnreadForUser(viewer.id());
    }

    private Conversation requireParticipant(Long conversationId, AuthenticatedUser viewer) {
        Conversation conversation = conversationRepository
                .findById(conversationId)
                .orElseThrow(() -> new ChatNotFoundException(conversationId));
        if (!conversation.isParticipant(viewer.id())) {
            throw new NotChatParticipantException();
        }
        return conversation;
    }

    private ConversationResponse toResponse(Conversation conversation, Long viewerId) {
        Message last = messageRepository.findFirstByConversationIdOrderByCreatedAtDesc(conversation.getId());
        long unread = messageRepository.countByConversationIdAndSenderIdNotAndReadFalse(
                conversation.getId(), viewerId);
        return ConversationResponse.from(conversation, viewerId, last == null ? null : last.getBody(), unread);
    }
}
