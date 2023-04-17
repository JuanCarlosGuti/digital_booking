package DH.back_integrador.Service;

import DH.back_integrador.controller.CategoryController;
import DH.back_integrador.controller.CityController;
import DH.back_integrador.controller.ProductController;
import DH.back_integrador.dto.ProductDTO;
import DH.back_integrador.exceptions.GlobalExceptions;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Category;
import DH.back_integrador.model.City;
import DH.back_integrador.service.CategoryService;
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
public class CategoryServiceTest {

    private MockMvc mockMvc;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    private Category category;

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(categoryService.saveCategory(category)).thenReturn(category);
        Mockito.when(categoryService.getAllCategory()).thenReturn(List.of(category));
        Mockito.when(categoryService.getCategory(category.getId())).thenReturn(category);
        Mockito.when(categoryService.updateCategory(category.getId(),category)).thenReturn(category);
        Mockito.when(categoryService.deleteCategory(category.getId())).thenReturn("The category with id " + category.getId() + " has not been found to be deleted.");
    }

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).setControllerAdvice(GlobalExceptions.class).build();
        category = new Category();
        configureMockito();
    }

    @Test
    public void addCategory() throws ResourceNotFoundException{
        Category c = categoryService.saveCategory(category);
        Assertions.assertEquals(category,c);
    }

    @Test
    public void findAllCategories() throws ResourceNotFoundException{
        Assertions.assertTrue(!categoryService.getAllCategory().isEmpty());
    }

    @Test
    public void findByCategoryId() throws ResourceNotFoundException{
        Category c = categoryService.getCategory(category.getId());
        Assertions.assertEquals(c,category);
    }

    @Test
    public void udetateCategory() throws ResourceNotFoundException{
        Category c = new Category();
        category.setDescription("nueva descripcion");
        c = categoryService.updateCategory(c.getId(),category);
        Assertions.assertEquals(c,category);
    }

    @Test
    public void deleteCategory() throws ResourceNotFoundException{
       String s = categoryService.deleteCategory(category.getId());
       Assertions.assertEquals(s, "The category with id " + category.getId() + " has not been found to be deleted.");
    }









}
