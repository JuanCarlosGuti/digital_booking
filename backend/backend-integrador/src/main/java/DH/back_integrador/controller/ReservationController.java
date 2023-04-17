package DH.back_integrador.controller;

import DH.back_integrador.dto.ReservationDTO;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class ReservationController {

    @Autowired
    private ReservationService reservationService;


    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> findById(@PathVariable("id") Integer id) throws ResourceNotFoundException {
        ReservationDTO ReservationDTO = reservationService.findById(id);
        if (ReservationDTO !=null){
            return new ResponseEntity<>(ReservationDTO, HttpStatus.OK);
        }else {
            throw new ResourceNotFoundException("The Reservation with id: "  + id +  " has not been found.\"");
        }

    }


    @PostMapping("/create")
    public ResponseEntity<ReservationDTO> create(@RequestBody ReservationDTO ReservationDTO) throws ResourceNotFoundException {
        ReservationDTO reservationData = reservationService.save(ReservationDTO);
        return new ResponseEntity<>(reservationData, HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<ReservationDTO> update(@RequestBody ReservationDTO ReservationDTO) throws ResourceNotFoundException {
        return new ResponseEntity<>(reservationService.update(ReservationDTO), HttpStatus.OK);
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id) throws ResourceNotFoundException {
        reservationService.deleteById(id);
        return new ResponseEntity<>("Delete success", HttpStatus.OK);
    }


    @GetMapping("/findAll")
    public ResponseEntity<List<ReservationDTO>> findAll() {
        return new ResponseEntity<>(reservationService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/findAll/product/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllByProductId(@PathVariable("id") Integer id){
        return new ResponseEntity<>(reservationService.findAllByProductsId(id), HttpStatus.OK);
    }

    @GetMapping("/findAll/user/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllByUserId(@PathVariable("id") Integer id){
        return new ResponseEntity<>(reservationService.findAllByUserId(id), HttpStatus.OK);
    }
}
