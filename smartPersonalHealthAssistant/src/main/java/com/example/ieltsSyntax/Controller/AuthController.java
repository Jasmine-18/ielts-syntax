package com.example.ieltsSyntax.Controller;

import com.example.ieltsSyntax.DTO.*;
import com.example.ieltsSyntax.Exception.CustomException;
import com.example.ieltsSyntax.Model.ResetToken;
import com.example.ieltsSyntax.Model.User;
import com.example.ieltsSyntax.Repository.ResetTokenRepository;
import com.example.ieltsSyntax.Repository.UserRepository;
import com.example.ieltsSyntax.Service.AuthService;
import com.example.ieltsSyntax.Service.EmailService;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest user) {
        AuthenticationResponse response = authService.register(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        AuthenticationResponse response = authService.login(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/recover")
    public ResponseEntity requestRecoverPassword(@RequestBody PasswordRecoveryRequest request) throws Exception {
        User registeredUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException("User not found with email "+request.getEmail(), HttpStatus.BAD_REQUEST));

        Map<String, Object> model = new HashMap<>();
        model.put("name", registeredUser.getFirstName());

        Map<String, String> response = new HashMap<>();

        try {
            // Call the email service to send the email with the template
            String resetLink = emailService.sendPasswordRecoveryEmail(registeredUser, model);
            response.put("message", "Email sent successfully!");
            response.put("resetLink", resetLink);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (MessagingException | IOException | TemplateException e) {
            response.put("message", "Error while sending email: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/recover/password")
    public ResponseEntity recoverPassword(@RequestBody ChangePasswordRequest request) throws Exception {
        ResetToken resetToken = resetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new CustomException("Operation not found", HttpStatus.BAD_REQUEST));
        String response = authService.changePassword(request.getPassword(), resetToken.getExpiryDate(), resetToken.getUser());

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", response);

        return ResponseEntity.ok(responseBody);
    }
}