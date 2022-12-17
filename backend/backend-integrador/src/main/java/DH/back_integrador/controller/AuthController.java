package DH.back_integrador.controller;

import DH.back_integrador.config.JwtGenerator;
import DH.back_integrador.dto.AuthDto;
import DH.back_integrador.exceptions.BadRequestException;
import DH.back_integrador.exceptions.ResourceNotFoundException;
import DH.back_integrador.model.AuthenticationReq;
import DH.back_integrador.model.Roles;
import DH.back_integrador.model.Users;
import DH.back_integrador.repository.UserRepository;
import DH.back_integrador.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RestController
//@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;




    @PostMapping("/login")
    public ResponseEntity<AuthDto> login(@RequestBody AuthenticationReq authenticationReq) {


        try {
            if(authenticationReq.getUsuario() == null || authenticationReq.getClave() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email o contrasena vacios");
            }

            try {


                //validar la contraseña
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationReq.getUsuario(),
                            authenticationReq.getClave()));


        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }


            Users userData = userService.findByEmail(authenticationReq.getUsuario());


            if(userData == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Email o contrasena invalidos");
            }

            AuthDto auth = new AuthDto();
            auth.email = userData.getEmail();
            auth.token = (jwtGenerator.generateToken(authenticationReq.getUsuario()));

            return ResponseEntity.ok(auth);

        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.CONFLICT);
        }

    }






    @PostMapping("/registro")
    public ResponseEntity<Users> saveUser(@RequestBody Users user) throws BadRequestException, ResourceNotFoundException {


        if (userRepository.findByEmail(user.getEmail())!=null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "El email ya esta registrado");
        }

        //pisar el password por uno encriptado
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //poner Rol por defecto, se le pone el rol del id:1
        user.setRol(new Roles(1L));


        return new ResponseEntity<>(userRepository.save(user), HttpStatus.CREATED);

    }








}
