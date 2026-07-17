package com.cesartravel.booking.client;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cesartravel.notification-service")
public record NotificationProperties(String baseUrl) {
}
