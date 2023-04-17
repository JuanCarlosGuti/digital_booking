package DH.back_integrador.controller;

import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Feature;
import DH.back_integrador.service.FeatureService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/caracteristicas")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @Operation(summary = "Traer todas las caracteristicas")
    @GetMapping
    public ResponseEntity<List<Feature>> getFeatures() {
        return ResponseEntity.ok(featureService.getAllFeature());
    }

    @Operation(summary = "Traer caracteristica por ID")
    @GetMapping("/{id}")
    public ResponseEntity<Feature> getFeatureById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(featureService.getFeature(id));
    }

    @Operation(summary = "Agregar una caracteristica")
    @PostMapping
    private ResponseEntity<Feature> saveFeature(@RequestBody Feature feature) {
        return ResponseEntity.ok(featureService.saveFeature(feature));
    }

    @Operation(summary = "Actualizar una caracteristica")
    @PutMapping("update/{id}")
    private ResponseEntity<Feature> updateFeature(@PathVariable Long id, @RequestBody Feature feature) throws ResourceNotFoundException{
        return ResponseEntity.ok(featureService.updateFeature(id, feature));
    }

    @Operation(summary = "Eliminar una caracteristica")
    @DeleteMapping("/{id}")
    private ResponseEntity<String> deleteFeature(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(featureService.deleteFeature(id));
    }


}
