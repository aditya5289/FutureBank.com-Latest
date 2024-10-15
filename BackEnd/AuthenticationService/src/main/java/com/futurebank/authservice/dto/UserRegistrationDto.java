package com.futurebank.authservice.dto;

public class UserRegistrationDto {
    private String name;
    private String email;
    // You can add other fields as needed, such as address, phone number, etc.

    public UserRegistrationDto() {
        // Default constructor
    }

    // Constructor with fields
    public UserRegistrationDto(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // You might want to override toString(), equals(), and hashCode() methods as well.

    @Override
    public String toString() {
        return "UserRegistrationDto{" +
               "name='" + name + '\'' +
               ", email='" + email + '\'' +
               '}';
    }
}
