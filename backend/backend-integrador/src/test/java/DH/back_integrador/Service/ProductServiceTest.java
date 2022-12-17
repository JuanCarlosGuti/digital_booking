package DH.back_integrador.Service;


import DH.back_integrador.controller.CityController;
import DH.back_integrador.controller.ProductController;
import DH.back_integrador.dto.ProductDTO;
import DH.back_integrador.exceptions.GlobalExceptions;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Category;
import DH.back_integrador.model.City;
import DH.back_integrador.service.ProductService;
import org.junit.Assert;
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
public class ProductServiceTest {

    private MockMvc mockMvc;

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private ProductDTO productDTO;

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(productService.saveProduct(productDTO)).thenReturn(productDTO);
        Mockito.when(productService.updateProduct(productDTO)).thenReturn(productDTO);
        Mockito.when(productService.getProduct(1L)).thenReturn(productDTO);
        Mockito.when(productService.getAllProduct()).thenReturn(List.of(productDTO));
        Mockito.when(productService.findAllBetweenDates(LocalDate.of(2022,11,22), LocalDate.of(2022,11,25))).thenReturn(List.of(productDTO));
        Mockito.when(productService.getProductsByCity(1L)).thenReturn(List.of(productDTO));
        Mockito.when(productService.deleteProduct(1L)).thenReturn("The product with id "+1+ " has been deleted ");
    }

    public void loadData() throws ResourceNotFoundException {
        ProductDTO p1 = new ProductDTO(1L);
        ProductDTO p2 = new ProductDTO(2L);
        ProductDTO p3 = new ProductDTO(3L);
        ProductDTO p4 = new ProductDTO(4L);
        productService.saveProduct(p1);
        productService.saveProduct(p2);
        productService.saveProduct(p3);
        productService.saveProduct(p4);

    }


    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(productController).setControllerAdvice(GlobalExceptions.class).build();
        productDTO = new ProductDTO (1L,"name","title", "descripcion","address",3,1,new Category(1L),new City(1L),null,null,null,null,null);
        configureMockito();
    }


    @Test
    public void AddProduct() throws ResourceNotFoundException {
        ProductDTO p = productService.saveProduct(productDTO);
        Assertions.assertEquals (productDTO, p);
    }

    @Test
    public void UpdateProduct() throws ResourceNotFoundException {
        productDTO.setAddress("new address");
        ProductDTO p = productService.updateProduct(productDTO);
        Assertions.assertEquals(productDTO, p);
    }

    @Test
    public void createAndFindById() throws ResourceNotFoundException {
    ProductDTO p = new ProductDTO(1L);
    productService.saveProduct(p);
    Assert.assertNotNull(productService.getProduct(p.getId()));
    }

    @Test
    public void createListAndList() throws ResourceNotFoundException{
    this.loadData();
    Assert.assertFalse(productService.getAllProduct().isEmpty());

    }

    @Test
    public void FindBetweenDates() throws ResourceNotFoundException {
        List<ProductDTO> p = productService.findAllBetweenDates(LocalDate.of(2022,11,22), LocalDate.of(2022,11,25));
        Assertions.assertTrue(!p.isEmpty());
    }

    @Test
    public void findAllByCity() throws ResourceNotFoundException {
        List<ProductDTO> p = productService.getProductsByCity(1L);
        Assertions.assertEquals(List.of(productDTO), p);
    }
    @Test
    public void deleteProduct()throws ResourceNotFoundException{
       String s = productService.deleteProduct(1L);
        Assert.assertEquals(s,"The product with id "+1+ " has been deleted ");

    }






}
