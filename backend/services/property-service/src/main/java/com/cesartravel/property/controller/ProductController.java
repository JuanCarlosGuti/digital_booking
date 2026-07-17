package com.cesartravel.property.controller;

import com.cesartravel.property.dto.ProductDetailResponse;
import com.cesartravel.property.dto.ProductRequest;
import com.cesartravel.property.dto.ProductSummaryResponse;
import com.cesartravel.property.security.AuthenticatedUser;
import com.cesartravel.property.service.ProductService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/properties")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductSummaryResponse> search(
            @RequestParam(required = false) Long categoryId, @RequestParam(required = false) Long cityId) {
        return productService.search(categoryId, cityId);
    }

    @GetMapping("/{id}")
    public ProductDetailResponse findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping("/owner/{ownerId}")
    public List<ProductSummaryResponse> findByOwner(
            @PathVariable Long ownerId, @AuthenticationPrincipal AuthenticatedUser requester) {
        return productService.findByOwner(ownerId, requester);
    }

    @PostMapping
    public ResponseEntity<ProductDetailResponse> create(
            @Valid @RequestBody ProductRequest request, @AuthenticationPrincipal AuthenticatedUser owner) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request, owner));
    }

    @PutMapping("/{id}")
    public ProductDetailResponse update(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request,
            @AuthenticationPrincipal AuthenticatedUser requester) {
        return productService.update(id, request, requester);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser requester) {
        productService.delete(id, requester);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProductDetailResponse uploadImages(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files,
            @AuthenticationPrincipal AuthenticatedUser requester) {
        return productService.addImages(id, files, requester);
    }
}
