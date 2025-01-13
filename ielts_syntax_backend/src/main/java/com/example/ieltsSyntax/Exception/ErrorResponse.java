package com.example.ieltsSyntax.Exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ErrorResponse {
    private int statusCode;
    private String message;

    public ErrorResponse(HttpStatus status, String message) {
        this.statusCode = status.value();
        this.message = message;
    }
}

