package com.syntaxpunk.validationdojo.users.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CreateUserDto {
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String username;
    private String email;
    private String phone;
    private String bio;
}
