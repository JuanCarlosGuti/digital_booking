package com.cesartravel.property.controller;

import com.cesartravel.property.dto.FeatureResponse;
import com.cesartravel.property.service.FeatureService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/features")
public class FeatureController {

    private final FeatureService featureService;

    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping
    public List<FeatureResponse> findAll() {
        return featureService.findAll();
    }
}
