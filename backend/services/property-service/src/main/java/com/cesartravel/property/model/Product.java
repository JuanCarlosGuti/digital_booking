package com.cesartravel.property.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String address;

    @Column(name = "room_number")
    private Integer roomNumber;

    @Column(name = "number_of_bathrooms")
    private Integer numberOfBathrooms;

    @Column(name = "extra_description_1")
    private String extraDescription1;

    @Column(name = "extra_description_2")
    private String extraDescription2;

    @Column(name = "extra_description_3")
    private String extraDescription3;

    /** Dueño del inmueble — id de un usuario en auth-service, sin FK física (ver ADR-0004).
     * Nullable porque las propiedades más viejas del monolito no tenían dueño hasta el backfill. */
    @Column(name = "owner_id")
    private Long ownerId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<ProductFeature> productFeatures = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(Integer numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public String getExtraDescription1() {
        return extraDescription1;
    }

    public void setExtraDescription1(String extraDescription1) {
        this.extraDescription1 = extraDescription1;
    }

    public String getExtraDescription2() {
        return extraDescription2;
    }

    public void setExtraDescription2(String extraDescription2) {
        this.extraDescription2 = extraDescription2;
    }

    public String getExtraDescription3() {
        return extraDescription3;
    }

    public void setExtraDescription3(String extraDescription3) {
        this.extraDescription3 = extraDescription3;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Set<Image> getImages() {
        return images;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<ProductFeature> getProductFeatures() {
        return productFeatures;
    }

    public void setProductFeatures(Set<ProductFeature> productFeatures) {
        this.productFeatures = productFeatures;
    }
}
