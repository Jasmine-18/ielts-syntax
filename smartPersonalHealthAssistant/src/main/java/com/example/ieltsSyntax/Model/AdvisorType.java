package com.example.ieltsSyntax.Model;

public enum AdvisorType {
    ALL("All"),
    SUMMARY("Summary");

    private final String advisorTypeString;

    AdvisorType(String advisorTypeString) {
        this.advisorTypeString = advisorTypeString;
    }

    @Override
    public String toString() {
        return advisorTypeString;
    }
}