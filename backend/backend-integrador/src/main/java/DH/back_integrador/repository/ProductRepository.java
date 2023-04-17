package DH.back_integrador.repository;

import DH.back_integrador.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where p.category.id = ?1")
    List<Product> getProductsByCategory(Long category_id);

    @Query("select p from Product p where p.city.id = ?1")
    List<Product> getProductsByCity(Long city_id);

    @Query("select p.feature from ProductFeature p where p.product.id = ?1")
    List<Feature> getFeaturesByProducts(Long product_id);

    @Query(value = "select * from product left join reservation on product.id = reservation.product_id where ((reservation.check_in not between ?1 and ?2) " +
            "or (reservation.check_in is null) or ( not reservation.check_in  <= ?1 and not reservation.check_out >= ?2)) and ((reservation.check_out not between ?1 and ?2) or (reservation.check_out is null)) " +
            "group by product.id",nativeQuery = true)
    Optional<List<Product>> findProductsXDates(LocalDate start, LocalDate end) ;

    @Query(value = "select * from product left join reservation on product.id = reservation.product_id where ((reservation.check_in not between ?1 and ?2) " +
            "or (reservation.check_in is null) or ( not reservation.check_in  <= ?1 and not reservation.check_out >= ?2)) and ((reservation.check_out not between ?1 and ?2) or (reservation.check_out is null))and product.city_id like ?3  " +
            "group by product.id",nativeQuery = true)
    Optional<List<Product>> findProductsXDatesAndCity(LocalDate start, LocalDate end, Long id);





}
