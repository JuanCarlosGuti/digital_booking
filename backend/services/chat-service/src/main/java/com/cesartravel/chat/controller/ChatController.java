package com.cesartravel.chat.controller;

import com.cesartravel.chat.dto.ConversationResponse;
import com.cesartravel.chat.dto.MessageRequest;
import com.cesartravel.chat.dto.MessageResponse;
import com.cesartravel.chat.dto.OpenChatRequest;
import com.cesartravel.chat.security.AuthenticatedUser;
import com.cesartravel.chat.service.ChatService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    /** Abre (o recupera) la conversación del usuario con el dueño de un inmueble. */
    @PostMapping
    public ResponseEntity<ConversationResponse> open(
            @Valid @RequestBody OpenChatRequest request, @AuthenticationPrincipal AuthenticatedUser guest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chatService.openChat(request.productId(), guest));
    }

    @GetMapping
    public List<ConversationResponse> findMine(@AuthenticationPrincipal AuthenticatedUser viewer) {
        return chatService.findMine(viewer);
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount(@AuthenticationPrincipal AuthenticatedUser viewer) {
        return Map.of("unread", chatService.countUnread(viewer));
    }

    @GetMapping("/{id}/messages")
    public List<MessageResponse> findMessages(
            @PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser viewer) {
        return chatService.findMessages(id, viewer);
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<MessageResponse> sendMessage(
            @PathVariable Long id,
            @Valid @RequestBody MessageRequest request,
            @AuthenticationPrincipal AuthenticatedUser sender) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chatService.sendMessage(id, request, sender));
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<Void> markRead(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser viewer) {
        chatService.markRead(id, viewer);
        return ResponseEntity.noContent().build();
    }
}
