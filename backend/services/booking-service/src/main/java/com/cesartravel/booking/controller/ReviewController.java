package com.cesartravel.booking.controller;

import com.cesartravel.booking.dto.ReviewRequest;
import com.cesartravel.booking.dto.ReviewResponse;
import com.cesartravel.booking.dto.ReviewSummaryResponse;
import com.cesartravel.booking.security.AuthenticatedUser;
import com.cesartravel.booking.service.ReviewService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> create(
            @Valid @RequestBody ReviewRequest request, @AuthenticationPrincipal AuthenticatedUser reviewer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.create(request, reviewer));
    }

    /** Reseñas de un inmueble — públicas, como el catálogo. */
    @GetMapping("/property/{productId}")
    public List<ReviewResponse> findByProperty(@PathVariable Long productId) {
        return reviewService.findByProperty(productId);
    }

    /** Promedio + cantidad por inmueble, batch (?productIds=1,2,3) — para las tarjetas. */
    @GetMapping("/summary")
    public List<ReviewSummaryResponse> summarize(@RequestParam List<Long> productIds) {
        return reviewService.summarize(productIds);
    }

    /** Ids de inmuebles ya reseñados por el usuario autenticado. */
    @GetMapping("/mine")
    public List<Long> findMine(@AuthenticationPrincipal AuthenticatedUser reviewer) {
        return reviewService.findMyReviewedProductIds(reviewer);
    }
}
