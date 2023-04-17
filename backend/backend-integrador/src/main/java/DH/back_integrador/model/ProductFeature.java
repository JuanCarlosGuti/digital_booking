package DH.back_integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class ProductFeature {

    @Id
    //@SequenceGenerator(name = "product_feature_generator", sequenceName = "product_feature_generator", allocationSize = 1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_feature_generator")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    @JsonIgnore
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(name = "feature_id",nullable = false)
    private Feature feature;

    public ProductFeature() {
    }

    public ProductFeature(Long id) {
        this.id = id;
    }


    public ProductFeature(Product product, Feature feature) {
        this.product = product;
        this.feature = feature;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Feature getFeature() {
        return feature;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }


    @Override
    public String toString() {
        return "ProductFeature{" +
                "id=" + id +
                ", product=" + product +
                ", feature=" + feature +
                '}';
    }
}
