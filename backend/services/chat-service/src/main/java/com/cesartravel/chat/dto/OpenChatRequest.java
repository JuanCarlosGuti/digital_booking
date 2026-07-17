package com.cesartravel.chat.dto;

import jakarta.validation.constraints.NotNull;

public record OpenChatRequest(@NotNull Long productId) {
}
