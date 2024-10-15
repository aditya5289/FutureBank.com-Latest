package com.futurebank.authservice.service;

import com.futurebank.authservice.model.Beneficiary;
import com.futurebank.authservice.repository.BeneficiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BeneficiaryService {

    private final BeneficiaryRepository beneficiaryRepository;

    @Autowired
    public BeneficiaryService(BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }

    @Transactional(readOnly = true)
    public List<Beneficiary> findAllByUserId(Long userId) {
        return beneficiaryRepository.findAllByUserId(userId);
    }

    @Transactional
    public Beneficiary saveBeneficiary(Beneficiary beneficiary) {
        return beneficiaryRepository.save(beneficiary);
    }

    @Transactional
    public Beneficiary updateBeneficiary(Long id, Beneficiary beneficiaryDetails) {
        Beneficiary beneficiary = beneficiaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beneficiary not found with id " + id));

        beneficiary.setName(beneficiaryDetails.getName());
        beneficiary.setAccountNumber(beneficiaryDetails.getAccountNumber());
        beneficiary.setEmail(beneficiaryDetails.getEmail());
        beneficiary.setPhoneNumber(beneficiaryDetails.getPhoneNumber());
        beneficiary.setBankName(beneficiaryDetails.getBankName());
        beneficiary.setUserId(beneficiaryDetails.getUserId());

        return beneficiaryRepository.save(beneficiary);
    }

    @Transactional
    public void deleteBeneficiary(Long id) {
        Beneficiary beneficiary = beneficiaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beneficiary not found with id " + id));
        beneficiaryRepository.delete(beneficiary);
    }

	public Beneficiary updateBeneficiary(Long id, Beneficiary beneficiaryDetails, Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteBeneficiary(Long id, Long userId) {
		// TODO Auto-generated method stub
		
	}
}
