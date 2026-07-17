package com.cesartravel.gateway.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cesartravel.services")
public record GatewayRoutingProperties(
        String authServiceUrl, String propertyServiceUrl, String bookingServiceUrl, String chatServiceUrl) {
}
