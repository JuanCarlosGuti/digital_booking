package DH.back_integrador.service;

import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.Feature;
import DH.back_integrador.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class FeatureService {

    @Autowired
    private FeatureRepository featureRepository;


    public List<Feature> getAllFeature(){
        return featureRepository.findAll();
    }

    public Feature getFeature(Long id) throws ResourceNotFoundException {
        Feature searchedFeature = featureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The feature with id " + id + " has not been found."));

        return searchedFeature;
    }

    public Feature saveFeature(Feature feature){
        return featureRepository.save(feature);
    }


    public Feature updateFeature(Long id, Feature feature) throws ResourceNotFoundException{
        Feature featureToUpdate = featureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The feature with id " + id + " has not been found to be updated."));

        if (feature.getName() != null) {
            featureToUpdate.setName(feature.getName());
        }
        if (feature.getReferenceIcon() != null) {
            featureToUpdate.setReferenceIcon(feature.getReferenceIcon());
        }

        return featureRepository.save(featureToUpdate);
    }

    public String deleteFeature(Long id) throws ResourceNotFoundException{
        Feature featureToDelete = featureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The City with id " + id + " has not been found to be deleted."));

        featureRepository.deleteById(id);
        return "Feature with id " + id + " deleted succesfully.";
    }
}
