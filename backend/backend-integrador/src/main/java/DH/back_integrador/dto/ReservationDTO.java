package DH.back_integrador.dto;

import DH.back_integrador.model.Product;
import DH.back_integrador.model.Reservation;
import DH.back_integrador.model.Users;

import java.time.LocalDate;


public class ReservationDTO {

    private Integer id;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Product product;
    private Users user;




    public ReservationDTO(Integer id,  LocalDate checkIn, LocalDate checkOut, Product product) {
        this.id = id;
        this.checkIn=checkIn;
        this.checkOut = checkOut;
        this.product = product;
    }

    public ReservationDTO(Integer id, LocalDate checkIn, LocalDate checkOut, Product product, Users user) {
        this.id = id;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.product = product;
        this.user = user;
    }

    public ReservationDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public Reservation toEntity(){
        Reservation reservation = new Reservation();
        reservation.setId(this.id);
        reservation.setCheckIn(checkIn);
        reservation.setCheckOut(checkOut);
        reservation.setProduct(product);
        reservation.setUser(user);
        return reservation;
    }

    @Override
    public String toString() {
        return "ReservationDTO{" +

                ", product=" + product.getId() +

                '}';
    }
}
