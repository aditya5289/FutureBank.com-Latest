package com.futurebank.accountService.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "accounts") // Specify table name for clarity
@Getter // Lombok annotation to generate all getters
@Setter // Lombok annotation to generate all setters Lombok annotation to generate a no-arg constructor
public class Account {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountNumber; // Unique identifier for the account

    // Prevents setting balance directly, use deposit/withdraw methods instead
    private BigDecimal balance;

    private String accountType; // Type of account (e.g., savings, checking)

    private Long userId; // Associated user identifier

    // Custom constructor to initialize balance with ZERO
    public Account() {
        this.balance = BigDecimal.valueOf(10000);
    }

    // Method to deposit amount to account
    public void deposit(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) > 0) { // Check if amount is positive
            this.balance = this.balance.add(amount);
        } else {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
    }

    // Method to withdraw amount from account
    public boolean withdraw(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) > 0 && this.balance.compareTo(amount) >= 0) { // Check if amount is positive and available
            this.balance = this.balance.subtract(amount);
            return true;
        } else {
            return false; // Withdrawal not possible due to insufficient funds or negative amount
        }
    }

	public Long  getId() {
		// TODO Auto-generated method stub
		return accountNumber;
	}

	
}
