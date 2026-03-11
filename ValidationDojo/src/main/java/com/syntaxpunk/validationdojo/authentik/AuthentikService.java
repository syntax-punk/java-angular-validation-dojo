package com.syntaxpunk.validationdojo.authentik;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AuthentikService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${authentik.base-url}")
    private String baseUrl;

    @Value("${authentik.api-token}")
    private String apiToken;

    public void createUser(String username, String firstName, String lastName, String email, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Step 1: create the user account
        Map<String, Object> createBody = Map.of(
            "username", username,
            "name", firstName + " " + lastName,
            "email", email,
            "is_active", true,
            "type", "internal"
        );

        ResponseEntity<Map<String, Object>> createResponse = restTemplate.exchange(
            baseUrl + "/api/v3/core/users/",
            HttpMethod.POST,
            new HttpEntity<>(createBody, headers),
            new org.springframework.core.ParameterizedTypeReference<>() {}
        );

        if (createResponse.getBody() == null) {
            throw new RuntimeException("Failed to create user in Authentik: empty response");
        }

        Integer userId = (Integer) createResponse.getBody().get("pk");

        // Step 2: set the password
        Map<String, String> passwordBody = Map.of("password", password);
        restTemplate.exchange(
            baseUrl + "/api/v3/core/users/" + userId + "/set_password/",
            HttpMethod.POST,
            new HttpEntity<>(passwordBody, headers),
            Void.class
        );
    }
}
