package com.futurebank.accountService.controller;

import java.math.BigDecimal;

public class MoneyRequest {
    private BigDecimal amount;

    // Default constructor
    public MoneyRequest() {
    }

    // Constructor with amount parameter
    public MoneyRequest(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
