package com.cesartravel.property.dto;

import com.cesartravel.property.model.Feature;

public record FeatureResponse(Long id, String name, String referenceIcon) {

    public static FeatureResponse from(Feature entity) {
        return new FeatureResponse(entity.getId(), entity.getName(), entity.getReferenceIcon());
    }
}
