package com.syntaxpunk.validationdojo.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${app.oidc.revoke-uri}")
    private String revokeUri;

    @Value("${app.oidc.client-id}")
    private String clientId;

    private final RestClient restClient = RestClient.builder()
            .requestFactory(new SimpleClientHttpRequestFactory())
            .build();

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal Jwt jwt) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("token", jwt.getTokenValue());
        body.add("client_id", clientId);

        try {
            restClient.post()
                    .uri(revokeUri)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
        } catch (Exception e) {
            log.warn("Token revocation failed: {}", e.getMessage());
        }

        return ResponseEntity.ok().build();
    }
}
