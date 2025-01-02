package com.example.ieltsSyntax.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private String token;
    private String password;
}