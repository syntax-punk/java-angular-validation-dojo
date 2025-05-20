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

    public User getById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> all() {
        return userRepository.findAll();
    }

    public Page<User> page(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public void save(User user) {
        var existing = userRepository.findByEmail(user.getEmail());

        if (existing.isPresent()) {
            throw new UnsupportedOperationException("User with this email already exists");
        }

        userRepository.save(user);
    }

    public void saveList(List<User> users) {
        userRepository.saveAll(users);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }
}