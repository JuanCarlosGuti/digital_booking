package com.cesartravel.property.dto;

import com.cesartravel.property.model.Image;

public record ImageResponse(Long id, String title, String url) {

    public static ImageResponse from(Image entity) {
        return new ImageResponse(entity.getId(), entity.getTitle(), entity.getUrl());
    }
}
