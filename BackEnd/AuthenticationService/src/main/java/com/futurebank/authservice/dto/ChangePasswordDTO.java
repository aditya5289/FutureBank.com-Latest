package com.futurebank.authservice.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangePasswordDTO {
    private String currentPassword;
    private String newPassword;

    // Constructors, Getters, and Setters
}
