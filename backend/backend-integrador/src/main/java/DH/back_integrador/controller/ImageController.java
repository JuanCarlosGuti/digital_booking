package DH.back_integrador.controller;

import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Category;
import DH.back_integrador.model.Image;
import DH.back_integrador.model.Product;
import DH.back_integrador.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/imagenes")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Operation(summary = "Traer todas las imagenes")
    @GetMapping
    public ResponseEntity<List<Image>> getAllImages(){
        return imageService.getAllImage();
    }

    @Operation(summary = "Traer imagen por ID")
    @GetMapping("/{id}")
    public ResponseEntity<Image> getImage(@PathVariable Long id) throws ResourceNotFoundException {
        return imageService.getImage(id);
    }

    /*
    @Operation(summary = "Agregar una imagen")
    @PostMapping("product={product_id}")
    public ResponseEntity<Product> saveImage(@PathVariable(name = "product_id") Long product_id, @RequestBody Image image) throws ResourceNotFoundException {
        return imageService.saveImage(product_id, image);
    }

    @Operation(summary = "Actualizar una imagen")
    @PutMapping
    public ResponseEntity<Image> updateImage(@RequestBody Image image) throws ResourceNotFoundException {
        return imageService.updateImage(image);
    }

    @Operation(summary = "Eliminar una image por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) throws ResourceNotFoundException {
        return imageService.deleteImage(id);
    }
*/

}
