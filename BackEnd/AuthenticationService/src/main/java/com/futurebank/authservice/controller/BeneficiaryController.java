package com.futurebank.authservice.controller;

import com.futurebank.authservice.model.Beneficiary;
import com.futurebank.authservice.service.BeneficiaryService;
import com.futurebank.authservice.service.UserService; // Make sure you have this service

import com.futurebank.authservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;
    private final UserService userService; // Assuming you have a UserService

    @Autowired
    public BeneficiaryController(BeneficiaryService beneficiaryService, UserService userService) {
        this.beneficiaryService = beneficiaryService;
        this.userService = userService; // Initialize userService
    }

    // List all beneficiaries for the authenticated user
    @GetMapping("/user")
    public ResponseEntity<List<Beneficiary>> getAllBeneficiariesForAuthenticatedUser(Authentication authentication) {
        Long userId = extractUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(beneficiaryService.findAllByUserId(userId));
    }

    // Add a new beneficiary for the authenticated user
    @PostMapping
    public ResponseEntity<Beneficiary> addBeneficiary(@RequestBody Beneficiary beneficiary, Authentication authentication) {
        Long userId = extractUserIdFromAuthentication(authentication);
        beneficiary.setUserId(userId); // Set the user ID to the authenticated user's ID
        Beneficiary savedBeneficiary = beneficiaryService.saveBeneficiary(beneficiary);
        return ResponseEntity.ok(savedBeneficiary);
    }

    // Update an existing beneficiary for the authenticated user
    @PutMapping("/{id}")
    public ResponseEntity<Beneficiary> updateBeneficiary(@PathVariable Long id, @RequestBody Beneficiary beneficiaryDetails, Authentication authentication) {
        Long userId = extractUserIdFromAuthentication(authentication);
        // You should implement logic in your service to ensure the beneficiary belongs to the user
        Beneficiary updatedBeneficiary = beneficiaryService.updateBeneficiary(id, beneficiaryDetails, userId);
        return ResponseEntity.ok(updatedBeneficiary);
    }

    // Delete a beneficiary for the authenticated user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBeneficiary(@PathVariable Long id, Authentication authentication) {
        Long userId = extractUserIdFromAuthentication(authentication);
        // Again, ensure in your service that the beneficiary belongs to the user before deletion
        beneficiaryService.deleteBeneficiary(id, userId);
        return ResponseEntity.ok().build();
    }

    // Utility method to extract user ID from Authentication object
    private Long extractUserIdFromAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // Ensuring that the user exists and retrieving user details
            User user = (User) userService.findByUsername(userDetails.getUsername())
                        .orElseThrow(() -> new IllegalStateException("User not found for username: " + userDetails.getUsername()));
            
            return user.getUserId(); // Make sure your User entity has a getId() method that returns the user ID
        }
        return null; // or throw an appropriate exception if the user is not found or not logged in
    }
}
