package com.syntaxpunk.validationdojo.users.dtos;

import jakarta.persistence.ElementCollection;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@NoArgsConstructor
public class CreateUserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private LocalDate dob;
}
