package com.cesartravel.property.repository;

import com.cesartravel.property.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
