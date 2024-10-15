package com.futurebank.accountService.service;

import com.futurebank.accountService.model.MyTransactionCategory;
import com.futurebank.accountService.model.Transaction;
import com.futurebank.accountService.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

  
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction createTransaction(Transaction transaction, MyTransactionCategory category) {
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setCategory(category);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByCategory(MyTransactionCategory category) {
        return transactionRepository.findByCategory(category);
    }

    public List<Transaction> getTransactionHistoryByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    // Ensure there are no duplicated methods
    // Implement additional service logic as needed
}
