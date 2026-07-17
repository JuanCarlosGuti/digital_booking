package com.cesartravel.auth.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cesartravel.jwt")
public record JwtProperties(String secret, long expirationMinutes) {
}
