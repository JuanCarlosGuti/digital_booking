package DH.back_integrador.service;

import DH.back_integrador.model.Users;
import DH.back_integrador.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;



    public Users findByEmail(String email) {

        Users user = this.userRepository.findByEmail(email);
        if(user == null){
            return null;
        }
        return user;
    }
}
