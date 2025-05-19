package com.syntaxpunk.validationdojo.users;

import com.syntaxpunk.validationdojo.users.dtos.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
