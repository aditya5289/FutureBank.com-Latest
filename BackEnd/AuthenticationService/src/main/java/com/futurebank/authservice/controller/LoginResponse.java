package com.futurebank.authservice.controller;

public class LoginResponse {

    private boolean success;
    private String message;
    private String token; // Optional, only if you're using JWT or similar

    // Default constructor
    public LoginResponse() {
    }

    // Constructor for success or failure without a token
    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Constructor for success with a token
    public LoginResponse(boolean success, String message, String token) {
        this.success = success;
        this.message = message;
        this.token = token;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
