package com.futurebank.accountService.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.futurebank.accountService.model.MyTransactionCategory;
import com.futurebank.accountService.model.Transaction;
import com.futurebank.accountService.service.TransactionService;
import com.futurebank.accountService.util.EnumUtil; // Make sure to create this utility class

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TransactionController.class);
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<?> createTransaction(@Valid @RequestBody Transaction transaction, @RequestParam String category) {
        Optional<MyTransactionCategory> categoryOpt = EnumUtil.getTransactionCategorySafe(category);
        if (!categoryOpt.isPresent()) {
            LOGGER.error("Invalid category: {}", category);
            return ResponseEntity.badRequest().body("Invalid category: " + category);
        }

        try {
            Transaction createdTransaction = transactionService.createTransaction(transaction, categoryOpt.get());
            return ResponseEntity.ok(createdTransaction);
        } catch (Exception e) {
            LOGGER.error("Error creating transaction", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating transaction");
        }
    }

    @GetMapping
    public ResponseEntity<?> getTransactionsByCategory(@RequestParam String category) {
        Optional<MyTransactionCategory> categoryOpt = EnumUtil.getTransactionCategorySafe(category);
        if (!categoryOpt.isPresent()) {
            LOGGER.error("Invalid category: {}", category);
            return ResponseEntity.badRequest().body("Invalid category: " + category);
        }

        try {
            List<Transaction> transactions = transactionService.getTransactionsByCategory(categoryOpt.get());
            return transactions.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(transactions);
        } catch (Exception e) {
            LOGGER.error("Error retrieving transactions", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving transactions");
        }
    }

    // Add other endpoints as needed...
}
