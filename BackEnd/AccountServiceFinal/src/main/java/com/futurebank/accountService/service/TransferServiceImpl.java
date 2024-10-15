package com.futurebank.accountService.service;

import com.futurebank.accountService.model.Account;
import com.futurebank.accountService.model.MyTransactionCategory;
import com.futurebank.accountService.model.Transaction;
import com.futurebank.accountService.repository.AccountRepository;
import com.futurebank.accountService.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TransferServiceImpl implements TransferService {

    private static final Logger logger = LoggerFactory.getLogger(TransferServiceImpl.class);  // Logger instance

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransferServiceImpl(AccountRepository accountRepository, TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    @Transactional
    public Transaction transferFunds(Long fromAccountId, Long toAccountId, BigDecimal amount, MyTransactionCategory category) {
        try {
            logger.info("Initiating transfer of {} from account {} to account {}. Category: {}", amount, fromAccountId, toAccountId, category);

            validateTransferAmount(amount);
            Account fromAccount = findAccountById(fromAccountId, "From");
            Account toAccount = findAccountById(toAccountId, "To");
            validateSufficientFunds(fromAccount, amount);
            
            logger.info("Validated transfer details: From Account Balance - {}, To Account Balance - {}", fromAccount.getBalance(), toAccount.getBalance());

            updateAccountBalances(fromAccount, toAccount, amount);

            Transaction transaction = createAndSaveTransaction(fromAccountId, toAccountId, amount, category, fromAccount.getBalance());
            
            logger.info("Transfer successful. Transaction ID: {}, From Account New Balance: {}", transaction.getId(), fromAccount.getBalance());
            return transaction;
        } catch (Exception e) {
            logger.error("Error occurred during fund transfer from account {} to account {}: {}", fromAccountId, toAccountId, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public Transaction transferFunds(Long fromAccountId, Long toAccountId, Double amount, String category) {
        BigDecimal transferAmount = BigDecimal.valueOf(amount);
        MyTransactionCategory transactionCategory = MyTransactionCategory.valueOf(category.toUpperCase());
        
        logger.info("Initiating transfer with amount: {} and category: {}.", transferAmount, category);
        
        return transferFunds(fromAccountId, toAccountId, transferAmount, transactionCategory);
    }

    private void validateTransferAmount(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            logger.error("Invalid transfer amount: {}. Amount must be positive.", amount);
            throw new IllegalArgumentException("Transfer amount must be positive");
        }
        logger.info("Transfer amount validated: {}", amount);
    }

    private Account findAccountById(Long accountId, String accountType) {
        logger.info("Looking for {} account with ID: {}", accountType, accountId);
        return accountRepository.findById(accountId)
                .orElseThrow(() -> {
                    logger.error("{} account not found with ID: {}", accountType, accountId);
                    return new IllegalArgumentException(accountType + " account not found");
                });
    }

    private void validateSufficientFunds(Account fromAccount, BigDecimal amount) {
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            logger.error("Insufficient funds in account {}. Available: {}, Required: {}", fromAccount.getId(), fromAccount.getBalance(), amount);
            throw new IllegalArgumentException("Insufficient funds in the from account");
        }
        logger.info("Sufficient funds validated for account {}. Balance: {}, Transfer amount: {}", fromAccount.getId(), fromAccount.getBalance(), amount);
    }

    private void updateAccountBalances(Account fromAccount, Account toAccount, BigDecimal amount) {
        logger.info("Updating balances. Deducting {} from account {} and adding to account {}", amount, fromAccount.getId(), toAccount.getId());
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
        logger.info("Account balances updated successfully.");
    }

    private Transaction createAndSaveTransaction(Long fromAccountId, Long toAccountId, BigDecimal amount, MyTransactionCategory category, BigDecimal balance) {
        logger.info("Creating transaction record for transfer. From account: {}, To account: {}, Amount: {}, Category: {}", fromAccountId, toAccountId, amount, category);
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(fromAccountId);
        transaction.setToAccountId(toAccountId);
        transaction.setAmount(amount);
        transaction.setCategory(category);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setAvlBalance(balance);

        transaction = transactionRepository.save(transaction);
        logger.info("Transaction saved successfully. Transaction ID: {}", transaction.getId());
        
        return transaction;
    }
}
