package DH.back_integrador.model;


import DH.back_integrador.dto.ReservationDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate checkIn;
    private LocalDate checkOut;


    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private Users user;



    public Reservation(Integer id, LocalDate checkIn, LocalDate checkOut, Product product) {
        this.id = id;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.product = product;
    }


    public Reservation(Integer id, LocalDate checkIn, LocalDate checkOut, Product product, Users user) {
        this.id = id;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.product = product;
        this.user = user;
    }

    public Reservation() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public ReservationDTO toDTO(){
        ReservationDTO ReservationDTO = new ReservationDTO();
        ReservationDTO.setId(id);
        ReservationDTO.setCheckIn(checkIn);
        ReservationDTO.setCheckOut(checkOut);
        ReservationDTO.setProduct(product);
        ReservationDTO.setUser(user);

        return ReservationDTO;
    }
}
