package com.cesartravel.property.dto;

import com.cesartravel.property.model.Product;
import java.util.List;

public record ProductDetailResponse(
        Long id,
        String title,
        String description,
        String address,
        Integer roomNumber,
        Integer numberOfBathrooms,
        String extraDescription1,
        String extraDescription2,
        String extraDescription3,
        CategoryResponse category,
        CityResponse city,
        List<ImageResponse> images,
        List<FeatureResponse> features,
        Long ownerId) {

    public static ProductDetailResponse from(Product product) {
        List<ImageResponse> images = product.getImages().stream().map(ImageResponse::from).toList();
        List<FeatureResponse> features = product.getProductFeatures().stream()
                .map(productFeature -> FeatureResponse.from(productFeature.getFeature()))
                .toList();

        return new ProductDetailResponse(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getAddress(),
                product.getRoomNumber(),
                product.getNumberOfBathrooms(),
                product.getExtraDescription1(),
                product.getExtraDescription2(),
                product.getExtraDescription3(),
                CategoryResponse.from(product.getCategory()),
                CityResponse.from(product.getCity()),
                images,
                features,
                product.getOwnerId());
    }
}
