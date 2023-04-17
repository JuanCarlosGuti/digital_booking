package DH.back_integrador.Service;


import DH.back_integrador.controller.AuthController;
import DH.back_integrador.controller.CityController;
import DH.back_integrador.exceptions.GlobalExceptions;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Users;
import DH.back_integrador.service.UserService;
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
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class UserServiceTest {
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    private Users users;

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(userService.findByEmail(users.getEmail())).thenReturn(users);
    }

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(authController).setControllerAdvice(GlobalExceptions.class).build();
        users = new Users();
        configureMockito();
    }

    @Test
    public void findUserByEmail(){
        Users u = userService.findByEmail(users.getEmail());
        Assertions.assertEquals(u,users);
    }
}
