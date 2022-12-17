package DH.back_integrador.Service;


import DH.back_integrador.controller.CityController;
import DH.back_integrador.controller.ReservationController;

import DH.back_integrador.dto.ReservationDTO;
import DH.back_integrador.exceptions.GlobalExceptions;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Category;
import DH.back_integrador.model.City;
import DH.back_integrador.model.Product;
import DH.back_integrador.model.Users;
import DH.back_integrador.service.ReservationService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ReservationServiceTest {

    private MockMvc mockMvc;

    @Mock
    private ReservationService reservationService;

    @InjectMocks
    private ReservationController reservationController;

    private ReservationDTO reservationDTO;

    private Product productDTO;


    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(reservationService.save(reservationDTO)).thenReturn(reservationDTO);
        Mockito.when(reservationService.update(reservationDTO)).thenReturn(reservationDTO);
        Mockito.when(reservationService.findById(1)).thenReturn(reservationDTO);
        Mockito.when(reservationService.findAll()).thenReturn(List.of(reservationDTO));
        Mockito.when(reservationService.deleteById(1)).thenReturn("The product with id "+ reservationDTO.getId() +" has been deleted ");
        Mockito.when(reservationService.findAllByProductsId(1)).thenReturn(List.of(reservationDTO));
    }

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(reservationController).setControllerAdvice(GlobalExceptions.class).build();
        productDTO = new Product (1L,"name","title", "descripcion","address",3,1,"","","",new Category(1L),new City(1L),null,null);
        reservationDTO = new ReservationDTO(1,LocalDate.of(2022,11,22),LocalDate.of(2022,11,24), productDTO);
        configureMockito();
    }

    @Test
    public void AddReservation() throws ResourceNotFoundException {
        ReservationDTO r = reservationService.save(reservationDTO);

        Assertions.assertEquals (reservationDTO, r);
    }

    @Test
    public void UpdateReservation() throws ResourceNotFoundException {
        reservationDTO.setCheckOut(LocalDate.of(2022,11,25));
        ReservationDTO r = reservationService.update(reservationDTO);
        Assertions.assertEquals (reservationDTO, r);
    }

    @Test
    public void findReservartionById() throws ResourceNotFoundException{
       Assertions.assertNotNull(reservationService.findById(1));

    }

    @Test
    public void findAllReservations() throws ResourceNotFoundException{
        Assertions.assertFalse(reservationService.findAll().isEmpty());
    }

    @Test
    public void  deleteReservation() throws ResourceNotFoundException{
        String s =reservationService.deleteById(1);
        Assertions.assertEquals("The product with id "+ 1 +" has been deleted ",s);
    }

    @Test
    public void findReservationsByProductId() throws ResourceNotFoundException{
        Assertions.assertTrue(!reservationService.findAllByProductsId(1).isEmpty());
    }






}
