package com.cesartravel.booking.repository;

import com.cesartravel.booking.model.Reservation;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByProductId(Long productId);

    /** Reservas del mismo inmueble cuyo rango [checkIn, checkOut) se solapa con el pedido
     * (checkOut es exclusivo: alguien puede entrar el mismo día que otro se va). */
    @Query("SELECT r FROM Reservation r "
            + "WHERE r.productId = :productId AND r.checkIn < :checkOut AND r.checkOut > :checkIn")
    List<Reservation> findOverlapping(
            @Param("productId") Long productId, @Param("checkIn") LocalDate checkIn, @Param("checkOut") LocalDate checkOut);

    /** Inmuebles con alguna reserva que se solapa con el rango — para que el buscador excluya
     * los no disponibles. Misma semántica semiabierta que findOverlapping. */
    @Query("SELECT DISTINCT r.productId FROM Reservation r WHERE r.checkIn < :to AND r.checkOut > :from")
    List<Long> findUnavailableProductIds(@Param("from") LocalDate from, @Param("to") LocalDate to);

    /** ¿El usuario tuvo una estadía ya finalizada en el inmueble? — condición para reseñar. */
    boolean existsByProductIdAndUserIdAndCheckOutLessThanEqual(Long productId, Long userId, LocalDate date);
}
