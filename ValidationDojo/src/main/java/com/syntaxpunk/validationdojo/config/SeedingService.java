package com.syntaxpunk.validationdojo.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.syntaxpunk.validationdojo.users.UserService;
import com.syntaxpunk.validationdojo.users.model.User;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
@Slf4j
public class SeedingService {
    private final UserService _userService;

    public SeedingService(UserService userService) {
        _userService = userService;
    }

    @PostConstruct
    public void seed() {
        seedUsers();
    }

    private void seedUsers() {
        if (_userService.isEmpty()) {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

            try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("UsersSeedData.json")) {
                if (inputStream == null) {
                    throw new FileNotFoundException("-> UsersSeedData.json not found in resources folder");
                }

                List<User> users = objectMapper.readValue(inputStream, new TypeReference<List<User>>() {});
                _userService.saveList(users);
                LoggerFactory.getLogger(SeedingService.class).info("-> users seeded - ok");
            } catch (IOException e) {
               log.error("-> Error reading UsersSeedData.json: {}", e.getMessage());
            }
        }
    }
}
