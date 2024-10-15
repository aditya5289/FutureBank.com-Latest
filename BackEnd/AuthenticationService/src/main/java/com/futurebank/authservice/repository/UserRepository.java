package com.futurebank.authservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futurebank.authservice.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username); // Corrected to return boolean
    Optional<User> findByUsername(String username);
	
   
}
