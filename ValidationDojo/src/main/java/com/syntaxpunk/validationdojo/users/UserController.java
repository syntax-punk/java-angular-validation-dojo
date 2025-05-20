package com.syntaxpunk.validationdojo.users;

import com.syntaxpunk.validationdojo.users.dtos.CreateUserDto;
import com.syntaxpunk.validationdojo.users.dtos.IdResposeDto;
import com.syntaxpunk.validationdojo.users.dtos.User;
import com.syntaxpunk.validationdojo.users.dtos.UserResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/users")
public class UserController {
    private final UserService _userService;

    public UserController(UserService userService) {
        _userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(_userService.all());
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
    public ResponseEntity<IdResposeDto> createUser(@RequestBody CreateUserDto createUserDto) {
        var user = User.from(createUserDto);
        _userService.save(user);

        var response = new IdResposeDto(user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        _userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
