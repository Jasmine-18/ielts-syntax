package com.example.ieltsSyntax.Exception;

public class MissingRequestBodyException extends RuntimeException {
    public MissingRequestBodyException(String message) {
        super(message);
    }
}


