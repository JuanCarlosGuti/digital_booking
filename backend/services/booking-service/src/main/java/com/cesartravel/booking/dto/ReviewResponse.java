package com.cesartravel.booking.dto;

import com.cesartravel.booking.model.Review;
import java.time.LocalDateTime;

public record ReviewResponse(
        Long id,
        Long productId,
        Integer rating,
        String comment,
        String reviewerName,
        LocalDateTime createdAt) {

    public static ReviewResponse from(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getProductId(),
                review.getRating(),
                review.getComment(),
                review.getReviewerName(),
                review.getCreatedAt());
    }
}
