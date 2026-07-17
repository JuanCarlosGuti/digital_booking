package com.cesartravel.property.config;

import com.cesartravel.property.security.JwtAuthenticationFilter;
import com.cesartravel.property.security.RestAccessDeniedHandler;
import com.cesartravel.property.security.RestAuthenticationEntryPoint;
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
                        // Explorar el catálogo (listar/ver propiedades, categorías, ciudades, features)
                        // es público — solo publicar/editar/borrar y ver quién es dueño de qué requiere sesión.
                        .requestMatchers(HttpMethod.GET, "/api/categories/**", "/api/cities/**", "/api/features/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/properties", "/api/properties/*").permitAll()
                        // Imágenes servidas como recurso estático (ver ADR-0005) — públicas, como
                        // cualquier imagen de una propiedad ya lo era antes vía URL externa.
                        .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
