package com.cesartravel.booking.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** booking-service solo valida tokens emitidos por auth-service — comparten el mismo secreto. */
@ConfigurationProperties(prefix = "cesartravel.jwt")
public record JwtProperties(String secret) {
}
