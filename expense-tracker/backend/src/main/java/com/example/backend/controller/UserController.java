package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            List<String> validationErrors = bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.toList());
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "Validation failed");
            responseBody.put("errors", validationErrors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Check if the user's role already contains "ROLE_ADMIN"
        if (!(user.getRole() == null) && user.getRole().contains("ADMIN")) {
            // If user has "ROLE_ADMIN", append "ROLE_USER" to the existing role
            user.setRole(user.getRole() + "USER");
        } else {
            // If user doesn't have "ROLE_ADMIN", assign "ROLE_USER" as the sole role
            user.setRole("USER");
        }

        // Save user to repository and return ResponseEntity
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
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
