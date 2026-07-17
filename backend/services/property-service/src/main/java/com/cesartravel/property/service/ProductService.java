package com.cesartravel.property.service;

import com.cesartravel.property.dto.ProductDetailResponse;
import com.cesartravel.property.dto.ProductRequest;
import com.cesartravel.property.dto.ProductSummaryResponse;
import com.cesartravel.property.exception.CategoryNotFoundException;
import com.cesartravel.property.exception.CityNotFoundException;
import com.cesartravel.property.exception.FeatureNotFoundException;
import com.cesartravel.property.exception.NotPropertyOwnerException;
import com.cesartravel.property.exception.ProductNotFoundException;
import com.cesartravel.property.model.Category;
import com.cesartravel.property.model.City;
import com.cesartravel.property.model.Feature;
import com.cesartravel.property.model.Image;
import com.cesartravel.property.model.Product;
import com.cesartravel.property.model.ProductFeature;
import com.cesartravel.property.repository.CategoryRepository;
import com.cesartravel.property.repository.CityRepository;
import com.cesartravel.property.repository.FeatureRepository;
import com.cesartravel.property.repository.ProductRepository;
import com.cesartravel.property.security.AuthenticatedUser;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CityRepository cityRepository;
    private final FeatureRepository featureRepository;
    private final ImageStorageService imageStorageService;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            CityRepository cityRepository,
            FeatureRepository featureRepository,
            ImageStorageService imageStorageService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.cityRepository = cityRepository;
        this.featureRepository = featureRepository;
        this.imageStorageService = imageStorageService;
    }

    public List<ProductSummaryResponse> search(Long categoryId, Long cityId) {
        List<Product> products;
        if (categoryId != null && cityId != null) {
            products = productRepository.findByCategoryIdAndCityId(categoryId, cityId);
        } else if (categoryId != null) {
            products = productRepository.findByCategoryId(categoryId);
        } else if (cityId != null) {
            products = productRepository.findByCityId(cityId);
        } else {
            products = productRepository.findAll();
        }
        return products.stream().map(ProductSummaryResponse::from).toList();
    }

    public ProductDetailResponse findById(Long id) {
        return ProductDetailResponse.from(getProductOrThrow(id));
    }

    /** Propiedades publicadas por un usuario — solo el propio dueño o un ADMIN puede consultarlas. */
    public List<ProductSummaryResponse> findByOwner(Long ownerId, AuthenticatedUser requester) {
        boolean isOwner = ownerId.equals(requester.id());
        if (!isOwner && !requester.isAdmin()) {
            throw new NotPropertyOwnerException();
        }
        return productRepository.findByOwnerId(ownerId).stream().map(ProductSummaryResponse::from).toList();
    }

    @Transactional
    public ProductDetailResponse create(ProductRequest request, AuthenticatedUser owner) {
        Product product = new Product();
        applyRequest(product, request);
        product.setOwnerId(owner.id());

        return ProductDetailResponse.from(productRepository.save(product));
    }

    @Transactional
    public ProductDetailResponse update(Long id, ProductRequest request, AuthenticatedUser requester) {
        Product product = getProductOrThrow(id);
        requireOwnerOrAdmin(product, requester);
        applyRequest(product, request);

        return ProductDetailResponse.from(productRepository.save(product));
    }

    @Transactional
    public void delete(Long id, AuthenticatedUser requester) {
        Product product = getProductOrThrow(id);
        requireOwnerOrAdmin(product, requester);
        productRepository.delete(product);
    }

    /** Sube y agrega imágenes a una propiedad ya creada (ver ADR-0005) — a diferencia de
     * applyRequest, esto suma imágenes en vez de reemplazar las existentes. */
    @Transactional
    public ProductDetailResponse addImages(Long id, List<MultipartFile> files, AuthenticatedUser requester) {
        Product product = getProductOrThrow(id);
        requireOwnerOrAdmin(product, requester);

        for (MultipartFile file : files) {
            String url = imageStorageService.store(file);
            Image image = new Image();
            image.setProduct(product);
            image.setTitle(product.getTitle());
            image.setUrl(url);
            product.getImages().add(image);
        }

        return ProductDetailResponse.from(productRepository.save(product));
    }

    private void applyRequest(Product product, ProductRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));
        City city = cityRepository.findById(request.cityId())
                .orElseThrow(() -> new CityNotFoundException(request.cityId()));

        product.setTitle(request.title());
        product.setDescription(request.description());
        product.setAddress(request.address());
        product.setRoomNumber(request.roomNumber());
        product.setNumberOfBathrooms(request.numberOfBathrooms());
        product.setExtraDescription1(request.extraDescription1());
        product.setExtraDescription2(request.extraDescription2());
        product.setExtraDescription3(request.extraDescription3());
        product.setCategory(category);
        product.setCity(city);

        product.getProductFeatures().clear();
        if (request.featureIds() != null) {
            Set<ProductFeature> productFeatures = new HashSet<>();
            for (Long featureId : request.featureIds()) {
                Feature feature = featureRepository.findById(featureId)
                        .orElseThrow(() -> new FeatureNotFoundException(featureId));
                ProductFeature productFeature = new ProductFeature();
                productFeature.setProduct(product);
                productFeature.setFeature(feature);
                productFeatures.add(productFeature);
            }
            product.getProductFeatures().addAll(productFeatures);
        }

        product.getImages().clear();
        if (request.images() != null) {
            for (var imageInput : request.images()) {
                Image image = new Image();
                image.setProduct(product);
                image.setTitle(imageInput.title());
                image.setUrl(imageInput.url());
                product.getImages().add(image);
            }
        }
    }

    private void requireOwnerOrAdmin(Product product, AuthenticatedUser requester) {
        boolean isOwner = product.getOwnerId() != null && product.getOwnerId().equals(requester.id());
        if (!isOwner && !requester.isAdmin()) {
            throw new NotPropertyOwnerException();
        }
    }

    private Product getProductOrThrow(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }
}
