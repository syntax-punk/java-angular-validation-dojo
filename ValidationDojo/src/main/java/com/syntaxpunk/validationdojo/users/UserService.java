package com.syntaxpunk.validationdojo.users;

import com.syntaxpunk.validationdojo.users.dtos.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isEmpty() {
        return userRepository.count() == 0;
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public Page<User> list(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public boolean saveUser(User user) {
        userRepository.save(user);
        return true;
    }

    public boolean saveUsers(List<User> users) {
        userRepository.saveAll(users);
        return true;
    }
}