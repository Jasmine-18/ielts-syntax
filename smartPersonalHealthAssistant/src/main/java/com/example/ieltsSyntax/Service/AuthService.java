package com.example.ieltsSyntax.Service;

import com.example.ieltsSyntax.DTO.AuthenticationResponse;
import com.example.ieltsSyntax.DTO.RegisterRequest;
import com.example.ieltsSyntax.Exception.CustomException;
import com.example.ieltsSyntax.Model.User;
import com.example.ieltsSyntax.Repository.UserRepository;
import com.example.ieltsSyntax.Util.JwtTokenUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Handle user registration
    @Transactional
    public AuthenticationResponse register(RegisterRequest user) {
        // Check if the user already exists
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new CustomException("Username is already taken", HttpStatus.BAD_REQUEST);
        }

        // Create and save new user
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setFirstName(user.getFirstname());
        newUser.setLastName(user.getLastname());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);

        // Generate JWT token
        String jwtToken = jwtTokenUtil.generateToken(user.getUsername());

        return new AuthenticationResponse(user.getUsername(), jwtToken);
    }

    // Handle user login and return a JWT token
    @Transactional
    public AuthenticationResponse login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("User not found with username: " + username, HttpStatus.BAD_REQUEST));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new CustomException("Invalid password", HttpStatus.BAD_REQUEST);
        }

        // Generate JWT token
        String jwtToken = jwtTokenUtil.generateToken(user.getUsername());

        return new AuthenticationResponse(user.getUsername(), jwtToken);
    }

    // Change password for a user
    @Transactional
    public String changePassword(String password, LocalDateTime expiryDate, User user) {
        if (expiryDate.isBefore(LocalDateTime.now())) {
            throw new CustomException("Operation has expired", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        return "Password update success.";
    }
}
