package com.cesartravel.property.service;

import com.cesartravel.property.dto.FeatureResponse;
import com.cesartravel.property.repository.FeatureRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FeatureService {

    private final FeatureRepository featureRepository;

    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public List<FeatureResponse> findAll() {
        return featureRepository.findAll().stream().map(FeatureResponse::from).toList();
    }
}
