package com.cesartravel.property.service;

import com.cesartravel.property.dto.CityResponse;
import com.cesartravel.property.repository.CityRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<CityResponse> findAll() {
        return cityRepository.findAll().stream().map(CityResponse::from).toList();
    }
}
