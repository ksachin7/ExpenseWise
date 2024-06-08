package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Check if the user's role already contains "ROLE_ADMIN"
        if (user.getRole().contains("ROLE_ADMIN")) {
            // If user has "ROLE_ADMIN", append "ROLE_USER" to the existing role
            user.setRole(user.getRole() + " ROLE_USER");
        } else {
            // If user doesn't have "ROLE_ADMIN", assign "ROLE_USER" as the sole role
            user.setRole("ROLE_USER");
        }
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(userDetails.getUsername());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        user.setEmail(userDetails.getEmail());
        // Preserve the existing role or assign a new role from userDetails
        user.setRole(userDetails.getRole() != null ? userDetails.getRole() : user.getRole());

        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
