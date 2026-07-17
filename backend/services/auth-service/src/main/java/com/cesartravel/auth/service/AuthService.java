package com.cesartravel.auth.service;

import com.cesartravel.auth.dto.AuthResponse;
import com.cesartravel.auth.dto.LoginRequest;
import com.cesartravel.auth.dto.RegisterRequest;
import com.cesartravel.auth.dto.UserSummaryResponse;
import com.cesartravel.auth.exception.EmailAlreadyRegisteredException;
import com.cesartravel.auth.exception.InvalidCredentialsException;
import com.cesartravel.auth.exception.UserNotFoundException;
import com.cesartravel.auth.model.Role;
import com.cesartravel.auth.model.User;
import com.cesartravel.auth.repository.RoleRepository;
import com.cesartravel.auth.repository.UserRepository;
import com.cesartravel.auth.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final String DEFAULT_ROLE = "USER";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyRegisteredException(request.email());
        }

        Role role = roleRepository.findByName(DEFAULT_ROLE)
                .orElseThrow(() -> new IllegalStateException(
                        "El rol " + DEFAULT_ROLE + " no está seedeado en la base — revisar la migración Flyway"));

        User user = new User();
        user.setName(request.name());
        user.setLastname(request.lastname());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        // Vacío se normaliza a null: "sin teléfono" tiene una sola representación en la base.
        user.setPhone(request.phone() == null || request.phone().isBlank() ? null : request.phone());
        user.setRole(role);

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);
        return toAuthResponse(saved, token);
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentialsException();
        }

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(InvalidCredentialsException::new);
        String token = jwtService.generateToken(user);
        return toAuthResponse(user, token);
    }

    public String refresh(String currentToken) {
        return jwtService.reissueToken(currentToken);
    }

    public UserSummaryResponse getById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return new UserSummaryResponse(
                user.getId(), user.getName(), user.getLastname(), user.getEmail(), user.getPhone());
    }

    private AuthResponse toAuthResponse(User user, String token) {
        return new AuthResponse(
                token, user.getId(), user.getName(), user.getLastname(), user.getEmail(), user.getRole().getName());
    }
}
