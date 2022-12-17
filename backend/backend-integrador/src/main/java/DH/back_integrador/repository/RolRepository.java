package DH.back_integrador.repository;
import DH.back_integrador.model.Roles;
import DH.back_integrador.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Roles, Long> {
}
