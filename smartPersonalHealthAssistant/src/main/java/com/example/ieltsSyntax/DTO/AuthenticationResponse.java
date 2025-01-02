package com.example.ieltsSyntax.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {

    private final String username;
    private final String jwt;

    public AuthenticationResponse(String username, String jwt) {

        this.username = username;
        this.jwt = jwt;

    }
}
