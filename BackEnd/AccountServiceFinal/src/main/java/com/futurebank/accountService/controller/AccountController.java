package com.futurebank.accountService.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.futurebank.accountService.model.Account;
import com.futurebank.accountService.model.AccountCreationRequest;
import com.futurebank.accountService.model.MyTransactionCategory;
import com.futurebank.accountService.model.Transaction;
import com.futurebank.accountService.model.TransferRequest;
import com.futurebank.accountService.service.AccountService;
import com.futurebank.accountService.service.TransactionService;
import com.futurebank.accountService.service.TransferService;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*") // Adjust the origins as per your requirements
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    private final AccountService accountService;
    private final TransactionService transactionService;
    private final TransferService transferService;
    private static final Long SYSTEM_ACCOUNT_ID = 1L; // Default sender account number
    public AccountController(AccountService accountService, TransactionService transactionService, TransferService transferService) {
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.transferService = transferService;
    }

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody AccountCreationRequest request) {
        try {
            Account account = accountService.createAccount(request.getUserId(), request.getAccountType());
            return new ResponseEntity<>(account, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Failed to create account: {}", e.getMessage(), e);
            return new ResponseEntity<>("Account creation failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<?> updateAccount(@PathVariable Long accountId, @RequestBody Account accountDetails) {
        try {
            Account updatedAccount = accountService.updateAccount(accountId, accountDetails);
            return ResponseEntity.ok(updatedAccount);
        } catch (Exception e) {
            logger.error("Failed to update account {}: {}", accountId, e.getMessage(), e);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        if (!accounts.isEmpty()) {
            return new ResponseEntity<>(accounts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getAccountById(@PathVariable Long accountId) {
        try {
            Account account = accountService.getAccountById(accountId);
            return ResponseEntity.ok(account);
        } catch (Exception e) {
            logger.error("Failed to retrieve account {}: {}", accountId, e.getMessage(), e);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long accountId) {
        boolean isDeleted = accountService.deleteAccount(accountId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            logger.error("Failed to delete account {}", accountId);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/transfers")
    public ResponseEntity<?> transferFunds(@RequestBody TransferRequest transferRequest) {
        try {
            Transaction transaction = transferService.transferFunds(
                transferRequest.getFromAccount(),
                transferRequest.getToAccount(),
                transferRequest.getAmount(),
                transferRequest.getCategory());
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            logger.error("Failed to transfer funds: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/balance/{accountId}")
    public ResponseEntity<?> getAccountBalance(@PathVariable Long accountId) {
        try {
            Account account = accountService.getAccountById(accountId);
            if (account != null) {
                return ResponseEntity.ok(account.getBalance());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Failed to fetch balance for account {}: {}", accountId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching account balance: " + e.getMessage());
        }
    }

    @GetMapping("/transactions/{accountId}")
    public ResponseEntity<?> getTransactionsByAccountId(@PathVariable Long accountId) {
        List<Transaction> transactions = transactionService.getTransactionHistoryByAccountId(accountId);
        if (!transactions.isEmpty()) {
            return ResponseEntity.ok(transactions);
        } else {
            logger.info("No transactions found for account {}", accountId);
            return ResponseEntity.notFound().build();
        }
    }

    
    @PostMapping("/{accountId}/deposit")
    public ResponseEntity<?> addMoney(@PathVariable Long accountId, @RequestBody MoneyRequest request) {
       BigDecimal amount =request.getAmount();
        logger.info("Request to deposit {} to account {}", amount, accountId);

        try {
            // Create a TransferRequest with the system account as the sender
            TransferRequest transferRequest = new TransferRequest();
            transferRequest.setFromAccount(SYSTEM_ACCOUNT_ID);  // Default sender account
            transferRequest.setToAccount(accountId);  // Destination account
            transferRequest.setAmount(amount.doubleValue());
            transferRequest.setCategory("OTHER");  // Example category, you can adjust as needed

            // Use the transfer service to handle the deposit and transaction creation
            Transaction transaction = transferService.transferFunds(
                transferRequest.getFromAccount(),
                transferRequest.getToAccount(),
                transferRequest.getAmount(),
                transferRequest.getCategory());

            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            logger.error("Failed to deposit funds: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/{accountId}/withdraw")
    public ResponseEntity<?> withdrawMoney(@PathVariable Long accountId, @RequestBody MoneyRequest request) {
        BigDecimal amount = request.getAmount();
        logger.info("Request to withdraw {} from account {}", amount, accountId);
        
        try {
            // Create a TransferRequest with the system account as the sender
            TransferRequest transferRequest = new TransferRequest();
            transferRequest.setFromAccount(accountId);  // Default sender account
            transferRequest.setToAccount(SYSTEM_ACCOUNT_ID);  // Destination account
            transferRequest.setAmount(amount.doubleValue());
            transferRequest.setCategory("OTHER");  // Example category, you can adjust as needed

            // Use the transfer service to handle the deposit and transaction creation
            Transaction transaction = transferService.transferFunds(
                transferRequest.getFromAccount(),
                transferRequest.getToAccount(),
                transferRequest.getAmount(),
                transferRequest.getCategory());

            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            logger.error("Failed to deposit funds: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
