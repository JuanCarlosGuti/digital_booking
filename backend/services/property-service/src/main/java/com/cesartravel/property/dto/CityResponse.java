package com.cesartravel.property.dto;

import com.cesartravel.property.model.City;

public record CityResponse(Long id, String city, String department, Double latitude, Double longitude) {

    public static CityResponse from(City entity) {
        return new CityResponse(
                entity.getId(),
                entity.getCity(),
                entity.getDepartment(),
                entity.getLatitude(),
                entity.getLongitude());
    }
}
