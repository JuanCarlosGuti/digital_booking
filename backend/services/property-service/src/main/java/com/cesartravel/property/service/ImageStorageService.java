package com.cesartravel.property.service;

import com.cesartravel.property.exception.InvalidImageException;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/** Guarda archivos de imagen en disco local (ver ADR-0005) y devuelve la URL pública completa,
 * ya con el host del gateway incluido — así ProductDetailResponse/ImageResponse no necesitan
 * saber si una imagen vino de un upload real o de una URL externa sembrada. */
@Service
public class ImageStorageService {

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of("image/jpeg", "image/png", "image/webp");
    private static final long MAX_FILE_SIZE_BYTES = 8L * 1024 * 1024;

    private final Path uploadsDir;
    private final String publicBaseUrl;

    public ImageStorageService(
            @Value("${cesartravel.uploads.dir}") String uploadsDir,
            @Value("${cesartravel.public-url}") String publicBaseUrl) {
        this.uploadsDir = Paths.get(uploadsDir);
        this.publicBaseUrl = publicBaseUrl.replaceAll("/$", "");
    }

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidImageException("El archivo está vacío");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new InvalidImageException("La imagen supera el tamaño máximo permitido (8MB)");
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new InvalidImageException("Formato no soportado: solo se aceptan imágenes JPEG, PNG o WEBP");
        }

        String extension = switch (contentType) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            default -> ".jpg";
        };
        String filename = UUID.randomUUID() + extension;

        try {
            Files.createDirectories(uploadsDir);
            file.transferTo(uploadsDir.resolve(filename));
        } catch (IOException e) {
            throw new UncheckedIOException("No se pudo guardar la imagen en disco", e);
        }

        return publicBaseUrl + "/uploads/" + filename;
    }
}
