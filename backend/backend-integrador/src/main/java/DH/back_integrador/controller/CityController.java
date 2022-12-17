package DH.back_integrador.controller;

import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.City;
import DH.back_integrador.service.CityService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/ciudades")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class CityController {

    @Autowired
    private CityService cityService;

    @Operation(summary = "Traer todas las ciudades")
    @GetMapping
    public ResponseEntity<List<City>> getCities(){
        return ResponseEntity.ok(cityService.getAllCity());
    }

    @Operation(summary = "Traer la ciudad por ID")
    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.getCity(id));
    }

    @Operation(summary = "Agregar una ciudad")
    @PostMapping
    public ResponseEntity<City> saveCity(@RequestBody City city){
        return ResponseEntity.ok(cityService.saveCity(city));
    }

    @Operation(summary = "Actualizar una ciudad")
    @PutMapping("/update/{id}")
    public ResponseEntity<City> updateCity(@PathVariable Long id, @RequestBody City city) throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.updateCity(id, city));
    }

    @Operation(summary = "Eliminar una ciudad por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCity(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.deleteCity(id));
    }

}
