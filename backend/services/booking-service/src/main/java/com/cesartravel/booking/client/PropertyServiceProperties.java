package com.cesartravel.booking.client;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cesartravel.property-service")
public record PropertyServiceProperties(String baseUrl) {
}
