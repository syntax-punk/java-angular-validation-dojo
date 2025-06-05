package com.syntaxpunk.validationdojo.users.dtos;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CreateUserDto {
    @NotBlank
    @Pattern(regexp ="^\\p{L}+([\\s\\-']?\\p{L}+)*$", message = "First name format is invalid")
    private String firstName;

    @NotBlank
    @Pattern(regexp ="^\\p{L}+([\\s\\-']?\\p{L}+)*$", message = "Last name format is invalid")
    private String lastName;

    private LocalDate dob;

    @NotBlank
    private String gender;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Username can only contain letters, numbers, and .-_")
    private String username;

    @Email
    private String email;

    private String phone;

    @Size(max = 256)
    private String bio;
}
