package com.cesartravel.property.controller;

import com.cesartravel.property.dto.CityResponse;
import com.cesartravel.property.service.CityService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public List<CityResponse> findAll() {
        return cityService.findAll();
    }
}
