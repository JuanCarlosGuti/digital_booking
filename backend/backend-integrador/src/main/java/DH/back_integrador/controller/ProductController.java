package DH.back_integrador.controller;

import DH.back_integrador.dto.ProductDTO;
import DH.back_integrador.exceptions.BadRequestException;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.*;
import DH.back_integrador.service.CategoryService;
import DH.back_integrador.service.CityService;
import DH.back_integrador.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CityService cityService;

    @Operation(summary = "Traer todos los productos")
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts(){
        var auth =  SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getPrincipal());
        System.out.println(auth.getAuthorities());
        System.out.println(auth.isAuthenticated());

        return ResponseEntity.ok(productService.getAllProduct());
    }

    @Operation(summary = "Traer el producto por ID")
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) throws ResourceNotFoundException {
        ProductDTO productDTO = productService.getProduct(id);
        if (productDTO!=null){
            return new ResponseEntity<>(productDTO, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("The product with id " + id + " has not been found.");
    }

    @Operation(summary = "Traer el producto de categoria")
    @GetMapping("/categoria={category_id}")
    public ResponseEntity<List<ProductDTO>> getProductByCategory(@PathVariable(name = "category_id") Long category_id) throws ResourceNotFoundException{
        return new ResponseEntity<>(productService.getProductsByCategory(category_id),HttpStatus.OK);
    }

    @Operation(summary = "Traer el producto por ciudad")
    @GetMapping("/ciudad={city_id}")
    public ResponseEntity<List<ProductDTO>> getProductByCity(@PathVariable(name = "city_id") Long city_id) throws ResourceNotFoundException {
        return new ResponseEntity<>(productService.getProductsByCity(city_id), HttpStatus.OK);
    }

    @Operation(summary = "Agregar un producto")
    @PostMapping
    public ResponseEntity<ProductDTO> saveProduct(@RequestBody ProductDTO productDto) throws BadRequestException, ResourceNotFoundException {
        return new ResponseEntity<>(productService.saveProduct(productDto), HttpStatus.CREATED);

    }

    @Operation(summary = "Actualizar un producto")
    @PutMapping
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(productService.updateProduct(productDto), HttpStatus.CREATED);
    }

    @Operation(summary = "Eliminar un producto por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(productService.deleteProduct(id), HttpStatus.OK);
    }



    @Operation(summary = "Traer el producto por ciudad")
    @GetMapping("/features={prod_id}")
    public ResponseEntity<List<Feature>> getFeatureByProduct(@PathVariable(name = "prod_id") Long prod_id) throws ResourceNotFoundException {
        return new ResponseEntity<>(productService.getFeaturesByProduct(prod_id), HttpStatus.OK);
    }

    @Operation(summary = "Traer los productos disponibles por fecha")
    @GetMapping("/findByDate/{startDate}/{endDate}")
    public ResponseEntity<List<ProductDTO>> findAllBetweenDates(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)@PathVariable("startDate") LocalDate startDate,  @DateTimeFormat (iso = DateTimeFormat.ISO.DATE)@PathVariable("endDate") LocalDate endDate) throws ResourceNotFoundException {
              return new ResponseEntity<>(productService.findAllBetweenDates(  startDate ,endDate), HttpStatus.OK);
    }

    @Operation(summary = "Traer los productos disponibles por fecha y ciudad")
    @GetMapping("/findByDate/{startDate}/{endDate}/{id}")
    public ResponseEntity<List<ProductDTO>> findAllBetweenDates(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)@PathVariable("startDate") LocalDate startDate,  @DateTimeFormat (iso = DateTimeFormat.ISO.DATE)@PathVariable("endDate") LocalDate endDate, @PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(productService.findByProductBetweenDatesAndCity(  startDate ,endDate, id), HttpStatus.OK);
    }



}
