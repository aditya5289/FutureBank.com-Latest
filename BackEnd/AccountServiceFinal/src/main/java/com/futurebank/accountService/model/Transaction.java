package com.futurebank.accountService.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@ToString
@Getter
@Setter
@Entity
@Table(name = "transactions") // Specify table name for clarity
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private Long fromAccountId;

    @Column(nullable = false)
    private Long toAccountId;

    @Column(nullable = false, precision = 19, scale = 4) // Define precision and scale if necessary
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50) // Specify length according to the longest enum value
    private MyTransactionCategory category;

    @Column(nullable = false)
    private LocalDateTime transactionDate;

    @Column(nullable = false, precision = 19, scale = 4) // Ensure this matches your database column specifications
    private BigDecimal avlBalance;

    // No-args constructor for JPA
    public Transaction() {
        // Default constructor
    }

    // Full constructor for creating a Transaction with all fields
    public Transaction(Long fromAccountId, Long toAccountId, BigDecimal amount, MyTransactionCategory category, LocalDateTime transactionDate, BigDecimal avlBalance) {
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
        this.category = category;
        this.transactionDate = transactionDate;
        this.avlBalance = avlBalance;
    }

	public Long getId() {
		// TODO Auto-generated method stub
		return transactionId;
	}

}
