package DH.back_integrador.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /*
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://0521ptc6n2-grupo03-dev-frontend.s3-website.us-east-2.amazonaws.com")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "PATCH","DELETE", "OPTIONS")
                .allowCredentials(true);
    }

     */



}
