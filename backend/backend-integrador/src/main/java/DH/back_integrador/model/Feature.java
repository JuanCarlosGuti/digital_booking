package DH.back_integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Feature {

    @Id
    //@SequenceGenerator(name = "feature_generator", sequenceName = "feature_generator", allocationSize = 1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "feature_generator")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;
    @Column
    private String name;
    @Column
    private String referenceIcon;


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "feature")
    @JsonIgnore
    private Set<ProductFeature> productFeatures = new HashSet<>();


    public Feature() {
    }

    public Feature(String name, String referenceIcon) {
        this.name = name;
        this.referenceIcon = referenceIcon;
    }

    public Feature(Long id, String name, String referenceIcon) {
        this.id = id;
        this.name = name;
        this.referenceIcon = referenceIcon;
    }

    public Set<ProductFeature> getProductFeatures() {
        return productFeatures;
    }

    public void setProductFeatures(Set<ProductFeature> productFeatures) {
        this.productFeatures = productFeatures;
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

    public void setName(String name) {
        this.name = name;
    }

    public String getReferenceIcon() {
        return referenceIcon;
    }

    public void setReferenceIcon(String referenceIcon) {
        this.referenceIcon = referenceIcon;
    }

    @Override
    public String toString() {
        return "Feature{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", referenceIcon='" + referenceIcon + '\'' +
                '}';
    }
}
