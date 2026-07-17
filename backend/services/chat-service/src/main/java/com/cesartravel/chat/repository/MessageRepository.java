package com.cesartravel.chat.repository;

import com.cesartravel.chat.model.Message;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);

    /** Último mensaje de la conversación — para el resumen en la lista de chats. */
    Message findFirstByConversationIdOrderByCreatedAtDesc(Long conversationId);

    /** Mensajes sin leer que OTRO participante le mandó al usuario en esta conversación. */
    long countByConversationIdAndSenderIdNotAndReadFalse(Long conversationId, Long userId);

    /** Total de mensajes sin leer del usuario en todas sus conversaciones — badge del header. */
    @Query("SELECT COUNT(m) FROM Message m WHERE m.read = false AND m.senderId <> :userId "
            + "AND (m.conversation.guestId = :userId OR m.conversation.ownerId = :userId)")
    long countUnreadForUser(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Message m SET m.read = true "
            + "WHERE m.conversation.id = :conversationId AND m.senderId <> :userId AND m.read = false")
    void markIncomingAsRead(@Param("conversationId") Long conversationId, @Param("userId") Long userId);
}
