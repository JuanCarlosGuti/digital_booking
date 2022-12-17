package DH.back_integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Image {

    @Id
    //@SequenceGenerator(name = "image_generator", sequenceName = "image_generator", allocationSize = 1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_generator")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;
    @Column
    private String title;
    @Column
    private String url;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(name = "product_id",nullable = false)
    @JsonIgnore
    private Product product;


    public Image() {
    }

    public Image(String title, String url) {
        this.title = title;
        this.url = url;
    }

    public Image(Long id, String title, String url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }

    public Image(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", url='" + url + '\'' +
                ", product=" + product +
                '}';
    }
}
