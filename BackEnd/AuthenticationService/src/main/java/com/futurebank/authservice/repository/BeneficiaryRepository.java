package com.futurebank.authservice.repository;

import com.futurebank.authservice.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    // Find all beneficiaries for a given user ID
    List<Beneficiary> findByUserId(Long userId);

	List<Beneficiary> findAllByUserId(Long userId);
    
    // Add any additional custom query methods you might need
}
