package com.cesartravel.booking.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ReviewRequest(
        @NotNull Long productId,
        @NotNull @Min(1) @Max(5) Integer rating,
        @Size(max = 1000) String comment) {
}
