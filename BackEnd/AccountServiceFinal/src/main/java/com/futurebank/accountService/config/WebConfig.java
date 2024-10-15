package com.futurebank.accountService.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Inject CORS configuration from application properties
    @Value("${cors.allowedOrigins:http://localhost:3000}")
    private String[] allowedOrigins;

    @Value("${cors.allowedMethods:GET,POST,PUT,DELETE,OPTIONS}")
    private String[] allowedMethods;

    @Value("${cors.allowedHeaders:*}")
    private String[] allowedHeaders;

    @Value("${cors.allowCredentials:false}")
    private boolean allowCredentials;

    @Value("${cors.maxAge:3600}") // 1 hour
    private long maxAge;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(allowedOrigins)
            .allowedMethods(allowedMethods)
            .allowedHeaders(allowedHeaders)
            .allowCredentials(allowCredentials)
            .maxAge(maxAge);
    }
}
