package DH.back_integrador.service;

import DH.back_integrador.model.Roles;
import DH.back_integrador.model.Users;
import DH.back_integrador.repository.RolRepository;
import DH.back_integrador.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UsuarioDetailsService implements UserDetailsService  {


    @Autowired
    UserRepository usersRepository;

    @Autowired
    RolRepository rolRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = usersRepository.findByEmail(username);

        List< GrantedAuthority> rol = new ArrayList<>();
        rol.add(new SimpleGrantedAuthority(user.getRol().getName()));

        UserDetails userDetails = new User(user.getEmail(),user.getPassword(),rol);

        return userDetails;


    }
}

