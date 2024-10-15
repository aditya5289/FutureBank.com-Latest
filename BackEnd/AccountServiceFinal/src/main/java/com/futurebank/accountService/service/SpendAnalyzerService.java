package com.futurebank.accountService.service;

import com.futurebank.accountService.model.Transaction;
import com.futurebank.accountService.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SpendAnalyzerService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Map<String, BigDecimal> analyzeSpending() {
        Iterable<Transaction> iterableTransactions = transactionRepository.findAll();
        
        // Convert Iterable to Stream for processing
        List<Transaction> transactions = StreamSupport.stream(iterableTransactions.spliterator(), false)
                                                      .collect(Collectors.toList());

        Map<String, BigDecimal> spendingByCategory = new HashMap<>();
        
        for (Transaction transaction : transactions) {
            // Properly use the enum's toString method for the map key
            spendingByCategory.merge(transaction.getCategory().toString(), transaction.getAmount(), BigDecimal::add);
        }

        return spendingByCategory;
    }
}
