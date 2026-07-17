package com.cesartravel.property.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/** Sin esto, Spring Security devuelve 403 tanto para "no mandaste token" como para
 * "tu token es válido pero no tenés permiso" — acá se separan: 401 cuando falta o es
 * inválida la credencial, 403 (ver RestAccessDeniedHandler) cuando sí hay sesión pero no alcanza.
 * ObjectMapper propio en vez de inyectado: Spring Boot 4 no expone por defecto un bean
 * com.fasterxml.jackson.databind.ObjectMapper (su serialización interna pasó a Jackson 3),
 * y acá solo se serializa un mapa plano — no hace falta la configuración de la app. */
@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now().toString());
        body.put("status", HttpStatus.UNAUTHORIZED.value());
        body.put("error", HttpStatus.UNAUTHORIZED.getReasonPhrase());
        body.put("message", "Falta autenticación o el token es inválido/expiró");

        OBJECT_MAPPER.writeValue(response.getWriter(), body);
    }
}
