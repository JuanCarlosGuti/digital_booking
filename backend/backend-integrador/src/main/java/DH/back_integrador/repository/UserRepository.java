package DH.back_integrador.repository;

import DH.back_integrador.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    public Users findByEmailAndPassword(String email, String password);

    Users findByEmail(String email);

}
