package com.futurebank.accountService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor // Generates a no-argument constructor
@AllArgsConstructor // Generates a constructor with all arguments
public class TransferResponse {
    private String message;
    // The Lombok annotations eliminate the need for explicit getters, setters, and constructors.
}
