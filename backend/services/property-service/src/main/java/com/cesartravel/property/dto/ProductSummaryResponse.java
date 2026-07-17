package com.cesartravel.property.dto;

import com.cesartravel.property.model.Product;

public record ProductSummaryResponse(
        Long id,
        String title,
        String address,
        Integer roomNumber,
        Integer numberOfBathrooms,
        CategoryResponse category,
        CityResponse city,
        String coverImageUrl,
        Long ownerId) {

    public static ProductSummaryResponse from(Product product) {
        String coverImageUrl = product.getImages().stream()
                .findFirst()
                .map(image -> image.getUrl())
                .orElse(null);

        return new ProductSummaryResponse(
                product.getId(),
                product.getTitle(),
                product.getAddress(),
                product.getRoomNumber(),
                product.getNumberOfBathrooms(),
                CategoryResponse.from(product.getCategory()),
                CityResponse.from(product.getCity()),
                coverImageUrl,
                product.getOwnerId());
    }
}
