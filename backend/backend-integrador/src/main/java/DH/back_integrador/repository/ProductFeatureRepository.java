package DH.back_integrador.repository;

import DH.back_integrador.model.Feature;
import DH.back_integrador.model.Product;
import DH.back_integrador.model.ProductFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProductFeatureRepository extends JpaRepository<ProductFeature, Long> {
}
