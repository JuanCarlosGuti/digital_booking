package com.cesartravel.chat.client;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cesartravel.auth-service")
public record AuthServiceProperties(String baseUrl) {
}
