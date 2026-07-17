package com.cesartravel.gateway.config;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

/** Rutas estáticas del gateway (ver ADR-0003: sin service discovery, un solo punto de
 * entrada público que reenvía por prefijo de path al servicio correspondiente). */
@Configuration
public class GatewayRoutesConfig {

    @Bean
    public RouterFunction<ServerResponse> gatewayRoutes(GatewayRoutingProperties properties) {
        RouterFunction<ServerResponse> authRoutes = route("auth-service")
                .route(path("/api/auth/**"), http())
                .before(uri(properties.authServiceUrl()))
                .build();

        RouterFunction<ServerResponse> propertyRoutes = route("property-service")
                .route(path("/api/properties/**", "/api/categories/**", "/api/cities/**", "/api/features/**"), http())
                .before(uri(properties.propertyServiceUrl()))
                .build();

        RouterFunction<ServerResponse> bookingRoutes = route("booking-service")
                .route(path("/api/bookings/**", "/api/reviews/**"), http())
                .before(uri(properties.bookingServiceUrl()))
                .build();

        // Imágenes de propiedades servidas como recurso estático por property-service (ver ADR-0005).
        RouterFunction<ServerResponse> uploadsRoutes = route("property-uploads")
                .route(path("/uploads/**"), http())
                .before(uri(properties.propertyServiceUrl()))
                .build();

        RouterFunction<ServerResponse> chatRoutes = route("chat-service")
                .route(path("/api/chats/**"), http())
                .before(uri(properties.chatServiceUrl()))
                .build();

        return authRoutes.and(propertyRoutes).and(bookingRoutes).and(uploadsRoutes).and(chatRoutes);
    }
}
