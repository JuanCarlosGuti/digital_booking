package DH.back_integrador.repository;

import DH.back_integrador.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query(value = "select * from reservation where product_id like :productId",nativeQuery = true)
    List<Reservation> findByProduct_Id(@Param("productId") Integer productId);

    @Query(value = "select * from reservation where user_id like :userId",nativeQuery = true)
    List<Reservation> findByUser_Id(@Param("userId") Integer userId);


}
