package com.futurebank.accountService.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.futurebank.accountService.model.MyTransactionCategory;
import com.futurebank.accountService.model.Transaction;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    // Fetch transactions for a specific account, either as sender or receiver
    @Query("SELECT t FROM Transaction t WHERE t.fromAccountId = :accountId OR t.toAccountId = :accountId")
    List<Transaction> findByAccountId(@Param("accountId") Long accountId);

    // Fetch transactions by category, leveraging EnumType.STRING for category field
    List<Transaction> findByCategory(MyTransactionCategory category);

	List<Transaction> findByTransactionDateBetween(LocalDateTime startOfYear, LocalDateTime now);

    // Additional Queries can be added as needed
}
