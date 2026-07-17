package com.cesartravel.auth.controller;

import com.cesartravel.auth.dto.AuthResponse;
import com.cesartravel.auth.dto.LoginRequest;
import com.cesartravel.auth.dto.RegisterRequest;
import com.cesartravel.auth.dto.TokenResponse;
import com.cesartravel.auth.dto.UserSummaryResponse;
import com.cesartravel.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replaceFirst("(?i)^Bearer ", "");
        return ResponseEntity.ok(new TokenResponse(authService.refresh(token)));
    }

    /** Endpoint interno, consumido por property-service y booking-service para resolver
     * nombre/email de un usuario a partir de su id — no expone la contraseña. */
    @GetMapping("/users/{id}")
    public ResponseEntity<UserSummaryResponse> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(authService.getById(id));
    }
}
