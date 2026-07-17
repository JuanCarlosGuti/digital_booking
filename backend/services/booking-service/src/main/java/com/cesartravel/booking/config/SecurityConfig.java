package com.cesartravel.booking.config;

import com.cesartravel.booking.security.JwtAuthenticationFilter;
import com.cesartravel.booking.security.RestAccessDeniedHandler;
import com.cesartravel.booking.security.RestAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtFilter,
            RestAuthenticationEntryPoint authenticationEntryPoint,
            RestAccessDeniedHandler accessDeniedHandler) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health", "/actuator/health/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        // Rutas públicas: disponibilidad sin identidad del huésped — fechas
                        // ocupadas de una propiedad (calendario del detalle) e ids de inmuebles
                        // ocupados en un rango (búsqueda por fechas del home).
                        .requestMatchers(HttpMethod.GET, "/api/bookings/availability/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/bookings/unavailable").permitAll()
                        // Reseñas: leerlas es público (como el catálogo); crear requiere sesión.
                        .requestMatchers(HttpMethod.GET, "/api/reviews/property/*", "/api/reviews/summary")
                        .permitAll()
                        // Todo lo demás requiere sesión — a diferencia de property-service, acá no
                        // hay más navegación pública: reservar, ver "mis reservas" y ver ocupantes
                        // (con identidad) son siempre acciones de un usuario autenticado.
                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
