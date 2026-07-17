package com.cesartravel.property.repository;

import com.cesartravel.property.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
