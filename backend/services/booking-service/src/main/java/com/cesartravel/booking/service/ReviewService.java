package com.cesartravel.booking.service;

import com.cesartravel.booking.dto.ReviewRequest;
import com.cesartravel.booking.dto.ReviewResponse;
import com.cesartravel.booking.dto.ReviewSummaryResponse;
import com.cesartravel.booking.exception.ReviewAlreadyExistsException;
import com.cesartravel.booking.exception.ReviewNotAllowedException;
import com.cesartravel.booking.model.Review;
import com.cesartravel.booking.repository.ReservationRepository;
import com.cesartravel.booking.repository.ReviewRepository;
import com.cesartravel.booking.security.AuthenticatedUser;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;

    public ReviewService(ReviewRepository reviewRepository, ReservationRepository reservationRepository) {
        this.reviewRepository = reviewRepository;
        this.reservationRepository = reservationRepository;
    }

    /** Una reseña por usuario y propiedad, solo con estadía finalizada (checkOut <= hoy). */
    @Transactional
    public ReviewResponse create(ReviewRequest request, AuthenticatedUser reviewer) {
        boolean stayedThere = reservationRepository.existsByProductIdAndUserIdAndCheckOutLessThanEqual(
                request.productId(), reviewer.id(), LocalDate.now());
        if (!stayedThere) {
            throw new ReviewNotAllowedException();
        }
        if (reviewRepository.existsByProductIdAndUserId(request.productId(), reviewer.id())) {
            throw new ReviewAlreadyExistsException();
        }

        Review review = new Review();
        review.setProductId(request.productId());
        review.setUserId(reviewer.id());
        review.setRating(request.rating());
        review.setComment(request.comment() == null || request.comment().isBlank() ? null : request.comment());
        // Denormalizado desde el JWT: listar reseñas no necesita resolver nombres en auth-service.
        review.setReviewerName((reviewer.name() + " " + reviewer.lastname()).trim());
        review.setCreatedAt(LocalDateTime.now());

        return ReviewResponse.from(reviewRepository.save(review));
    }

    public List<ReviewResponse> findByProperty(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream()
                .map(ReviewResponse::from)
                .toList();
    }

    /** Batch para las tarjetas del catálogo — un solo GROUP BY, sin N+1. */
    public List<ReviewSummaryResponse> summarize(List<Long> productIds) {
        if (productIds == null || productIds.isEmpty()) {
            return List.of();
        }
        return reviewRepository.summarizeByProductIds(productIds);
    }

    /** Ids de inmuebles ya reseñados por el usuario — para ocultar el botón en "mis reservas". */
    public List<Long> findMyReviewedProductIds(AuthenticatedUser reviewer) {
        return reviewRepository.findByUserId(reviewer.id()).stream().map(Review::getProductId).toList();
    }
}
