package DH.back_integrador.Service;


import DH.back_integrador.controller.CityController;
import DH.back_integrador.dto.ProductDTO;
import DH.back_integrador.exceptions.GlobalExceptions;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Category;
import DH.back_integrador.model.City;
import DH.back_integrador.service.CityService;
import DH.back_integrador.service.ProductService;
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

import java.util.List;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class CityServiceTest {

    private MockMvc mockMvc;

    @Mock
    private CityService cityService;

    @InjectMocks
    private CityController cityController;

    private City city;

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(cityService.saveCity(city)).thenReturn(city);
        Mockito.when(cityService.getCity(1L)).thenReturn(city);
        Mockito.when(cityService.updateCity(1L,city)).thenReturn(city);
        Mockito.when(cityService.getAllCity()).thenReturn(List.of(city));
        Mockito.when(cityService.deleteCity(1L)).thenReturn("The City with id " + city.getId() + " has not been found to be deleted.");

    }

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(cityController).setControllerAdvice(GlobalExceptions.class).build();
        city = new City();
        configureMockito();
    }

    @Test
    public void addCity() throws ResourceNotFoundException {
        City c = cityService.saveCity(city);
        Assertions.assertEquals (city, c);
    }

    @Test
    public void findById() throws ResourceNotFoundException{
        City city1 = cityService.getCity(1L);
        Assertions.assertTrue(city.getId()== city1.getId());
    }

    @Test
    public void updateCity() throws ResourceNotFoundException{
        city.setCity("Medellín");
        City city1 = cityService.updateCity(1L, city);
        Assertions.assertEquals(city1,city);

    }

    @Test
    public void  findListCity() throws ResourceNotFoundException{
        City city1 = new City();
        City city2 = new City();
        cityService.saveCity(city1);
        cityService.saveCity(city2);
        Assertions.assertFalse(cityService.getAllCity().isEmpty());
    }


    @Test
    public void deleteCityById()throws ResourceNotFoundException{
        String s = cityService.deleteCity(1L);
        Assertions.assertTrue(s.contains("The City with id " + city.getId() + " has not been found to be deleted."));
    }


















}
