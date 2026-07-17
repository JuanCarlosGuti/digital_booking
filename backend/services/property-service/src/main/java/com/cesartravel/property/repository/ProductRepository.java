package com.cesartravel.property.repository;

import com.cesartravel.property.model.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIdAndCityId(Long categoryId, Long cityId);

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByCityId(Long cityId);

    List<Product> findByOwnerId(Long ownerId);
}
