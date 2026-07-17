package com.cesartravel.property;

import com.cesartravel.property.security.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

// property-service solo valida JWTs ya emitidos por auth-service — nunca autentica por
// usuario/contraseña, así que se excluye la autoconfiguración que crea un usuario en memoria
// con contraseña aleatoria (y la imprime en el log) al no encontrar un UserDetailsService propio.
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@EnableConfigurationProperties(JwtProperties.class)
public class PropertyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertyServiceApplication.class, args);
    }
}
