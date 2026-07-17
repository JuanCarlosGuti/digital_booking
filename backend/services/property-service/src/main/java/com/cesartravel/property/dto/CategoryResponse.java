package com.cesartravel.property.dto;

import com.cesartravel.property.model.Category;

public record CategoryResponse(Long id, String title, String description, String imageUrl) {

    public static CategoryResponse from(Category category) {
        return new CategoryResponse(
                category.getId(), category.getTitle(), category.getDescription(), category.getImageUrl());
    }
}
