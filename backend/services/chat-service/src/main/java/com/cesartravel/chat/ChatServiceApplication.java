package com.cesartravel.chat;

import com.cesartravel.chat.client.AuthServiceProperties;
import com.cesartravel.chat.client.PropertyServiceProperties;
import com.cesartravel.chat.security.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

// Igual que booking-service: solo valida JWTs de auth-service, nunca autentica por
// usuario/contraseña — se excluye el usuario en memoria autogenerado.
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@EnableConfigurationProperties({JwtProperties.class, PropertyServiceProperties.class, AuthServiceProperties.class})
public class ChatServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatServiceApplication.class, args);
    }
}
