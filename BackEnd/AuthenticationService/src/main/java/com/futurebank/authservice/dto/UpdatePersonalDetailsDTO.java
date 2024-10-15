package com.futurebank.authservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePersonalDetailsDTO {
    private Long userId;
	private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    // Add other fields that can be updated

    // Constructors, Getters, and Setters
}
