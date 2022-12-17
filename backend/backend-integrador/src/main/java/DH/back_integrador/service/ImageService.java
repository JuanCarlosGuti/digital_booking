package DH.back_integrador.service;

import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Category;
import DH.back_integrador.model.Image;
import DH.back_integrador.model.Product;
import DH.back_integrador.repository.ImageRepository;
import DH.back_integrador.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<List<Image>> getAllImage(){
        return ResponseEntity.ok(imageRepository.findAll());
    }

    public ResponseEntity<Image> getImage(Long id) throws ResourceNotFoundException{
        ResponseEntity<Image> response = null;
        Optional<Image> imageSearched = imageRepository.findById(id);
        if(imageSearched.isPresent()) {
            response = ResponseEntity.ok(imageSearched.get());
        } else {
            throw new ResourceNotFoundException("The image with id " + id + " has not been found.");
        }
        return response;
    }


    public Image saveImage(Long product_id, Image image){

        return imageRepository.save(image);
    }



    /*
    public void updateImage(Long id, Image image){
        Image imageOld = imageRepository.findById(id).get();

        imageOld.setTitle(image.getTitle());
        imageOld.setUrl(image.getUrl());

        imageRepository.save(imageOld);
    }

     */
    /*
    public ResponseEntity<Image> updateImage(Image image) throws ResourceNotFoundException{
        ResponseEntity<Image> response = null;
        Optional<Image> imageToUpdate = imageRepository.findById(image.getId());
        if (imageToUpdate.isPresent()) {
            response = ResponseEntity.ok(imageRepository.save(image));
        } else {
            throw new ResourceNotFoundException("The image with id " + image.getId() + " has not been found to be updated.");
        }
        return response;
    }

     */

    /*
    public ResponseEntity<String> deleteImage(Long id) throws ResourceNotFoundException{
        ResponseEntity<String> response = null;
        if (imageRepository.findById(id).isPresent()) {
            imageRepository.deleteById(id);
            response = ResponseEntity.ok("Image with id " + id + " deleted succesfully.");
        } else {
            throw new ResourceNotFoundException("The image with id " + id + " has not been found to be deleted.");
        }
        return response;
    }

     */
}
