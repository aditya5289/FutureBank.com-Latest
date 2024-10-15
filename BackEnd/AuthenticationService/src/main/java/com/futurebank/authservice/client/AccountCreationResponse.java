package com.futurebank.authservice.client;

import java.math.BigDecimal;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountCreationResponse {
	@Id
    private Long accountNumber; // Unique identifier for the account

    @Setter(AccessLevel.NONE) // Prevents setting balance directly, use deposit/withdraw methods instead
    private BigDecimal balance;

    private String accountType; // Type of account (e.g., savings, checking)

    private Long userId; // As
}
