package DH.back_integrador.service;

import DH.back_integrador.dto.ReservationDTO;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Product;
import DH.back_integrador.model.Reservation;
import DH.back_integrador.repository.ProductRepository;
import DH.back_integrador.repository.ReservationRepository;
import DH.back_integrador.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

   @Autowired
   private UserRepository userRepository;

   @Autowired
   private ProductRepository productRepository;



    public ReservationDTO findById(Integer id)  {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()){
            return reservation.get().toDTO();
        }
        return null;
    }



    public ReservationDTO save(ReservationDTO ReservationDTO) throws ResourceNotFoundException {
        //Optional<Users> user = userRepository.findById(reservationDTO.getUser().getId());
        Optional<Product> product = productRepository.findById(ReservationDTO.getProduct().getId());
        if (product.isPresent() /*&& user.isPresent()*/) {
            Reservation reservation = ReservationDTO.toEntity();
            reservationRepository.save(reservation);
            return reservation.toDTO();
        } else {
            if (product.isEmpty()) {
                throw new ResourceNotFoundException("The product with id " + product.get().getId() + " has not been found.");
            }/* else if (user.isEmpty()) {
                throw new ResourceNotFoundException("The user with id " + user.get().getId() + " has not been found.");
            } */else {
                throw new ResourceNotFoundException("The product with id " + product.get().getId() );//+ "and the user with id" + user.get().getId() + " has not been found.");
            }
        }
    }


    public ReservationDTO update(ReservationDTO ReservationDTO) throws ResourceNotFoundException {
        Optional<Reservation> reservation = reservationRepository.findById(ReservationDTO.getId());
              if (reservation.isPresent()){
               reservationRepository.save(ReservationDTO.toEntity());
               return ReservationDTO;
              } else {
                  throw  new ResourceNotFoundException ("The reservation with id " + ReservationDTO.getId() + " has not been found.");
              }
    }


    public String deleteById(Integer id) throws ResourceNotFoundException {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()){
            reservationRepository.deleteById(id);
            return "The product with id "+reservation.get().getId()+ " has been deleted ";
        }else {
            throw new ResourceNotFoundException ("The reservation with id " +id + " has not been found.");

        }
    }


    public List<ReservationDTO> findAll() {
        List<Reservation> reservationList = reservationRepository.findAll();
        return reservationList.stream().map(reservation -> reservation.toDTO()).collect(Collectors.toList());
    }



    public List<ReservationDTO> findAllByProductsId(Integer productId) {
        List<Reservation> reservations = reservationRepository.findByProduct_Id(productId);
        return reservations.stream().map(reservation -> reservation.toDTO()).collect(Collectors.toList());
    }

    public List<ReservationDTO> findAllByUserId(Integer userId) {
        List<Reservation> reservations = reservationRepository.findByUser_Id(userId);
        return reservations.stream().map(reservation -> reservation.toDTO()).collect(Collectors.toList());
    }
}
