package com.futurebank.accountService.service;

import com.futurebank.accountService.model.Account;
import com.futurebank.accountService.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Account createAccount(Long userId, String accountType) {
        Account account = new Account();
        account.setUserId(userId);
        account.setAccountType(accountType);
        account.setBalance(BigDecimal.ZERO); // Ensure new accounts start with a zero balance unless specified
        return accountRepository.save(account);
    }

    @Override
    @Transactional
    public Account updateAccount(Long accountId, Account accountDetails) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found for this id :: " + accountId));

        // Check what fields from accountDetails should be updated
        if (accountDetails.getAccountNumber() != null) {
            account.setAccountNumber(accountDetails.getAccountNumber());
        }
        if (accountDetails.getBalance() != null) {
            account.setBalance(accountDetails.getBalance());
        }
        if (accountDetails.getAccountType() != null) {
            account.setAccountType(accountDetails.getAccountType());
        }
        return accountRepository.save(account);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found for this id :: " + accountId));
    }

    @Override
    public boolean deleteAccount(Long accountId) {
        Account account = getAccountById(accountId);  // Utilizing existing method to handle not found exception
        accountRepository.delete(account);
        return true;
    }

    @Override
    @Transactional
    public Account deposit(Long accountId, BigDecimal amount) {
        Account account = getAccountById(accountId);  // Utilizing existing method to handle not found exception
        account.setBalance(account.getBalance().add(amount));
        return accountRepository.save(account);
    }

    @Override
    @Transactional
    public Account withdraw(Long accountId, BigDecimal amount) {
        Account account = getAccountById(accountId);  // Utilizing existing method to handle not found exception
        BigDecimal newBalance = account.getBalance().subtract(amount);
        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        account.setBalance(newBalance);
        return accountRepository.save(account);
    }
}
