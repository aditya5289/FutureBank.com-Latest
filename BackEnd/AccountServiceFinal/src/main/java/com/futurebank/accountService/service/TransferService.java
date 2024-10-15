package com.futurebank.accountService.service;

import com.futurebank.accountService.model.MyTransactionCategory;
import com.futurebank.accountService.model.Transaction;

import java.math.BigDecimal;

public interface TransferService {

    Transaction transferFunds(Long fromAccountId, Long toAccountId, BigDecimal amount, MyTransactionCategory category);

    // Assuming these methods should be declared in the interface based on your previous message
    Transaction transferFunds(Long fromAccountId, Long toAccountId, Double amount, String category);
}
