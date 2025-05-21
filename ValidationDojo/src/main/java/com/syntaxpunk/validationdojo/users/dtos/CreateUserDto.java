package com.syntaxpunk.validationdojo.users.dtos;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CreateUserDto {
    @NotBlank
    @Pattern(regexp ="^\\p{L}+([\\s\\-']?\\p{L}+)*$")
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private LocalDate dob;

    @NotBlank
    private String gender;

    @NotBlank
    private String username;

    @Email
    private String email;

    private String phone;

    @Size(max = 20)
    private String bio;
}
