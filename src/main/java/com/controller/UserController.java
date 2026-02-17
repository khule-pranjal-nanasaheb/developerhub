package com.controller;

import com.model.User;
import com.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    // Only ADMIN can access
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
