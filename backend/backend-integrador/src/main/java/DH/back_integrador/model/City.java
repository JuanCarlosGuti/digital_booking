package DH.back_integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class City {

    @Id
    //@SequenceGenerator(name = "city_generator", sequenceName = "city_generator", allocationSize = 1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_generator")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;
    @Column
    private String city;
    @Column
    private String country;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "city")
    @JsonIgnore
    private Set<Product> products = new HashSet<>();


    public City() {
    }

    public City(Long id) {
        this.id = id;
    }

    public City(String city, String country) {
        this.city = city;
        this.country = country;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public City(Long id, String city, String country) {
        this.id = id;
        this.city = city;
        this.country = country;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}
