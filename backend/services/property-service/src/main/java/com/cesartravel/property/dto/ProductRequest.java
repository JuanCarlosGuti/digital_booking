package com.cesartravel.property.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ProductRequest(
        @NotBlank String title,
        @NotBlank String description,
        @NotBlank String address,
        @NotNull Integer roomNumber,
        @NotNull Integer numberOfBathrooms,
        String extraDescription1,
        String extraDescription2,
        String extraDescription3,
        @NotNull Long categoryId,
        @NotNull Long cityId,
        List<Long> featureIds,
        List<ImageInput> images) {
}
