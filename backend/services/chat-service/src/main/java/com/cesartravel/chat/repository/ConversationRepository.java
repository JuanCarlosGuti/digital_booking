package com.cesartravel.chat.repository;

import com.cesartravel.chat.model.Conversation;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    Optional<Conversation> findByProductIdAndGuestId(Long productId, Long guestId);

    /** Todas las conversaciones donde el usuario participa (como huésped o como dueño). */
    List<Conversation> findByGuestIdOrOwnerIdOrderByIdDesc(Long guestId, Long ownerId);
}
