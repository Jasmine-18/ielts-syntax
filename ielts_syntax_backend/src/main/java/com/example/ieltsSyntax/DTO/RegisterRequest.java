package com.example.ieltsSyntax.DTO;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
