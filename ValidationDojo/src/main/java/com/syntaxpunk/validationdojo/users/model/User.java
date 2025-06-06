package com.syntaxpunk.validationdojo.users.model;

import com.syntaxpunk.validationdojo.users.dtos.CreateUserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Accessors(chain = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String phone;
    private String bio;
    private String photoUrl;

    @ElementCollection
    private List<String> followers;
    @ElementCollection
    private List<String> following;

    public static User from(CreateUserDto createUserDto) {
         return new User()
            .setId(UUID.randomUUID().toString())
            .setFirstName(createUserDto.getFirstName())
            .setLastName(createUserDto.getLastName())
            .setDob(createUserDto.getDob())
            .setGender(createUserDto.getGender())
            .setUsername(createUserDto.getUsername())
            .setEmail(createUserDto.getEmail())
            .setPhone(createUserDto.getPhone())
            .setBio(createUserDto.getBio());
    };
}
