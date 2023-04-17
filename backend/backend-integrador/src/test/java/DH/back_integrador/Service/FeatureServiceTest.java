package DH.back_integrador.Service;

import DH.back_integrador.controller.CityController;
import DH.back_integrador.controller.FeatureController;
import DH.back_integrador.exceptions.GlobalExceptions;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Feature;
import DH.back_integrador.service.FeatureService;
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
public class FeatureServiceTest {

    private MockMvc mockMvc;

    @Mock
    private FeatureService featureService;

    @InjectMocks
    private FeatureController featureController;

    private Feature feature;

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(featureService.getFeature(feature.getId())).thenReturn(feature);
        Mockito.when(featureService.getAllFeature()).thenReturn(List.of(feature));
        Mockito.when(featureService.saveFeature(feature)).thenReturn(feature);
        Mockito.when(featureService.updateFeature(feature.getId(),feature)).thenReturn(feature);
        Mockito.when(featureService.deleteFeature(feature.getId())).thenReturn("The City with id " + feature.getId() + " has not been found to be deleted.");
    }

    @Before
    public void reset() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(featureController).setControllerAdvice(GlobalExceptions.class).build();
        feature = new Feature();
        configureMockito();
    }

    @Test
    public void findFeatureById() throws ResourceNotFoundException {
        Feature f = featureService.getFeature(feature.getId());
        Assertions.assertEquals(f,feature);
    }

    @Test
    public void findAllFeatures() throws ResourceNotFoundException {
        Assertions.assertFalse(featureService.getAllFeature().isEmpty());
    }

    @Test
    public void saveFeature() throws ResourceNotFoundException{
        Feature f = featureService.saveFeature(feature);
        Assertions.assertEquals(f,feature);
    }

    @Test
    public void updateFeature() throws ResourceNotFoundException{
      feature.setName("nuevo");
      Feature f = featureService.updateFeature(feature.getId(),feature);
      Assertions.assertTrue(f.getName().equals(feature.getName()));
    }

    @Test
    public void deleteFeatureById() throws ResourceNotFoundException{
        String s = featureService.deleteFeature(feature.getId());
        Assertions.assertEquals("The City with id " + feature.getId() + " has not been found to be deleted.",s);
    }

}
