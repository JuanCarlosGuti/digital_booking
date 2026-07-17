package com.cesartravel.property.config;

import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** Sirve las imágenes guardadas en disco por ImageStorageService (ver ADR-0005) como recursos
 * estáticos bajo /uploads/**. */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final String uploadsDir;

    public WebMvcConfig(@Value("${cesartravel.uploads.dir}") String uploadsDir) {
        this.uploadsDir = uploadsDir;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = Paths.get(uploadsDir).toAbsolutePath().normalize().toUri().toString();
        registry.addResourceHandler("/uploads/**").addResourceLocations(location);
    }
}
