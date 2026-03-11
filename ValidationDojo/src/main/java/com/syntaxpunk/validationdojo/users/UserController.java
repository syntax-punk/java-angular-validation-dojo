package com.syntaxpunk.validationdojo.users;

import com.syntaxpunk.validationdojo.authentik.AuthentikService;
import com.syntaxpunk.validationdojo.users.dtos.CreateUserDto;
import com.syntaxpunk.validationdojo.users.dtos.IdResposeDto;
import com.syntaxpunk.validationdojo.users.model.User;
import com.syntaxpunk.validationdojo.users.dtos.UserResponseDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;

@RestController()
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private final UserService _userService;
    private final AuthentikService _authentikService;

    @GetMapping()
    public ResponseEntity<List<UserResponseDto>> getUsers() {
        var users = _userService.all();

        if (users.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        var results = users.stream()
                .map(UserResponseDto::from)
                .toList();

        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable String id) {
        var user = _userService.getById(id);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(UserResponseDto.from(user));
    }

    @PostMapping()
    public ResponseEntity<IdResposeDto> createUser(@Valid @RequestBody CreateUserDto createUserDto) {
        var user = User.from(createUserDto);
        _userService.save(user);

        _authentikService.createUser(
            createUserDto.getUsername(),
            createUserDto.getFirstName(),
            createUserDto.getLastName(),
            createUserDto.getEmail(),
            createUserDto.getPassword()
        );

        var response = new IdResposeDto(user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        _userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
