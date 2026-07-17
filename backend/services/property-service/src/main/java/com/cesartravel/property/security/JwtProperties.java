package com.cesartravel.property.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** property-service solo valida tokens emitidos por auth-service — comparten el mismo secreto. */
@ConfigurationProperties(prefix = "cesartravel.jwt")
public record JwtProperties(String secret) {
}
