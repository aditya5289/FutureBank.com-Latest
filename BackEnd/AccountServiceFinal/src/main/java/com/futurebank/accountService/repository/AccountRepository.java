package com.futurebank.accountService.repository;

import com.futurebank.accountService.model.Account;

import net.bytebuddy.dynamic.DynamicType.Builder.FieldDefinition.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

    // Corrected the method signature to match the Account model's accountNumber field type
    boolean existsByAccountNumber(Long accountNumber);
    
    // Optionally, if you need to find an account by its number, you can add:
    Optional<Account> findByAccountNumber(Long accountNumber);
}
