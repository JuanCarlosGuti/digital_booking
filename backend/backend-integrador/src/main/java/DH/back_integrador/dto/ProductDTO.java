package DH.back_integrador.dto;


import DH.back_integrador.model.*;
import java.util.Set;

public class ProductDTO {

    private Long id;
    private String name;
    private String title;
    private String description;
    private String address;
    private Integer roomNumber;
    private Integer numberOfBathrooms;
    private Category category;
    private City city;
    private Set<Image> images;
    private Set<ProductFeature> productFeatures;




    private String extraDescription1;

    private String extraDescription2;

    private String extraDescription3;

    public ProductDTO(Long id, String name, String title, String description, String address, Integer roomNumber, Integer numberOfBathrooms, Category category, City city, Set<Image> images, Set<ProductFeature> productFeatures, String extraDescription1, String extraDescription2, String extraDescription3) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.description = description;
        this.address = address;
        this.roomNumber = roomNumber;
        this.numberOfBathrooms = numberOfBathrooms;
        this.category = category;
        this.city = city;
        this.images = images;
        this.productFeatures = productFeatures;
        this.extraDescription1 = extraDescription1;
        this.extraDescription2 = extraDescription2;
        this.extraDescription3 = extraDescription3;
    }

    public ProductDTO(Long id) {
        this.id = id;
    }

    public ProductDTO(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public ProductDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
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

    public void setName(String name) {
        this.name = name;
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

    public Product toEntity() {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setTitle(title);
        product.setDescription(description);
        product.setAddress(address);
        product.setRoomNumber(roomNumber);
        product.setNumberOfBathrooms(numberOfBathrooms);
        product.setCategory(category);
        product.setCity(city);
        product.setImages(images);
        product.setProductFeatures(productFeatures);
        product.setExtraDescription1(extraDescription1);
        product.setExtraDescription2(extraDescription2);
        product.setExtraDescription3(extraDescription3);


        return product;
    }


    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", address='" + address + '\'' +
                ", roomNumber=" + roomNumber +
                ", numberOfBathrooms=" + numberOfBathrooms +
                ", category=" + category +
                ", city=" + city +
                ", images=" + images +
                ", productFeatures=" + productFeatures +
                ", extraDescription1='" + extraDescription1 + '\'' +
                ", extraDescription2='" + extraDescription2 + '\'' +
                ", extraDescription3='" + extraDescription3 + '\'' +
                '}';
    }
}
