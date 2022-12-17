package DH.back_integrador.service;


import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.City;
import DH.back_integrador.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public List<City> getAllCity(){
        return cityRepository.findAll();
    }

    public City getCity(Long id) throws ResourceNotFoundException {
        City searchedCity = cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The city with id " + id + " has not been found."));

        return searchedCity;
    }

    public City saveCity(City city) {
        return cityRepository.save(city);
    }


    public City updateCity(Long city_id, City city) throws ResourceNotFoundException{
        City cityToUpdate = cityRepository.findById(city_id)
                .orElseThrow(() -> new ResourceNotFoundException("The product with id " + city_id + " has not been found to be updated."));

        if (city.getCity() != null) {
            cityToUpdate.setCity(city.getCity());
        }
        if (city.getCountry() != null) {
            cityToUpdate.setCountry(city.getCountry());
        }

        return cityRepository.save(cityToUpdate);
    }

    public String deleteCity(Long id) throws ResourceNotFoundException {
        City cityToDelete = cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The City with id " + id + " has not been found to be deleted."));

        cityRepository.deleteById(id);
        return "City with id " + id + " deleted succesfully.";
    }
}
