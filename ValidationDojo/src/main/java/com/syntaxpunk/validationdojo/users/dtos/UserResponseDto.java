package com.syntaxpunk.validationdojo.users.dtos;

import com.syntaxpunk.validationdojo.users.model.User;
import lombok.Data;
import lombok.experimental.Accessors;
import java.time.LocalDate;

@Accessors(chain = true)
@Data
public class UserResponseDto {
    private String id;
    private String username;
    private LocalDate dob;
    private String gender;
    private String photoUrl;
    private String bio;

    public static UserResponseDto from(User user) {
        return new UserResponseDto()
            .setId(user.getId())
            .setUsername(user.getUsername())
            .setDob(user.getDob())
            .setGender(user.getGender())
            .setPhotoUrl(user.getPhotoUrl())
            .setBio(user.getBio());
    }
}
