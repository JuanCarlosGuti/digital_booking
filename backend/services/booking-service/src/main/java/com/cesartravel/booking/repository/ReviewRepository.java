package com.cesartravel.booking.repository;

import com.cesartravel.booking.dto.ReviewSummaryResponse;
import com.cesartravel.booking.model.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);

    List<Review> findByUserId(Long userId);

    boolean existsByProductIdAndUserId(Long productId, Long userId);

    /** Promedio + cantidad por inmueble en una sola query (para las tarjetas del catálogo). */
    @Query("SELECT new com.cesartravel.booking.dto.ReviewSummaryResponse(r.productId, AVG(r.rating), COUNT(r)) "
            + "FROM Review r WHERE r.productId IN :productIds GROUP BY r.productId")
    List<ReviewSummaryResponse> summarizeByProductIds(@Param("productIds") List<Long> productIds);
}
