package com.syntaxpunk.validationdojo.users.dtos;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private LocalDate dob;

    @ElementCollection
    private List<String> followers;
    @ElementCollection
    private List<String> following;
}
