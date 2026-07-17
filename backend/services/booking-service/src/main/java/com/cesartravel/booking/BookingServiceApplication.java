package com.cesartravel.booking;

import com.cesartravel.booking.client.AuthServiceProperties;
import com.cesartravel.booking.client.NotificationProperties;
import com.cesartravel.booking.client.PropertyServiceProperties;
import com.cesartravel.booking.security.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

// booking-service solo valida JWTs ya emitidos por auth-service — nunca autentica por
// usuario/contraseña, así que se excluye la autoconfiguración que crea un usuario en memoria
// con contraseña aleatoria (y la imprime en el log) al no encontrar un UserDetailsService propio.
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@EnableConfigurationProperties({
    JwtProperties.class,
    PropertyServiceProperties.class,
    AuthServiceProperties.class,
    NotificationProperties.class
})
public class BookingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookingServiceApplication.class, args);
    }
}
