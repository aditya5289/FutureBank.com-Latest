package com.futurebank.authservice.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.futurebank.authservice.model.User;
import com.futurebank.authservice.repository.UserRepository;
import com.futurebank.authservice.client.AccountClient;
import com.futurebank.authservice.dto.ChangePasswordDTO;
import com.futurebank.authservice.dto.UpdatePersonalDetailsDTO;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountClient accountClient; // Ensure this matches your actual AccountClient implementation

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AccountClient accountClient) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountClient = accountClient;
    }

    /**
     * Registers a new user with the specified details.
     * 
     * @param user The user details to register.
     * @return The registered user.
     * @throws Exception If the user registration or account creation fails.
     */
    public User registerUser(User user) throws Exception {
        // Check if the username already exists to ensure username uniqueness
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new Exception("A user already exists with the username: " + user.getUsername());
        }

        // Encrypt the user's password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Attempt to create an account for the user using AccountClient
        // and set the account number
        User savedUser = userRepository.save(user);
        try {
            Long accountNumber = accountClient.createAccountForUser(user, user.getAccountType());
            user.setAccountNumber(accountNumber); // Assuming User class has this field with appropriate setter
        } catch (Exception e) {
            // Handle account creation failure
            throw new Exception("Failed to create an account for the user: " + e.getMessage(), e);
        }
        savedUser = userRepository.save(user);
        // Save the user with the account number set
        System.out.println(savedUser.toString());
        return savedUser;
    }

    /**
     * Finds a user by username.
     * 
     * @param username The username to search for.
     * @return An Optional containing the found user or empty if not found.
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

 // Existing methods...

    /**
     * Changes the password of a user.
     * 
     * @param userId The ID of the user whose password is to be changed.
     * @param dto The DTO containing the old and new password.
     * @return A boolean indicating if the password change was successful.
     * @throws Exception If the old password does not match or the user is not found.
     */
    public boolean changePassword(Long userId, ChangePasswordDTO dto) throws Exception {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new Exception("User not found"));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid old password");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
        return true;
    }

    /**
     * Updates the personal details of a user.
     * 
     * @param userId The ID of the user whose details are to be updated.
     * @param dto The DTO containing the updated personal details.
     * @return A boolean indicating if the update was successful.
     * @throws Exception If the user is not found.
     */
    public boolean updatePersonalDetails(Long userId, UpdatePersonalDetailsDTO dto) throws Exception {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new Exception("User not found"));

        // Update user details
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        // Add other fields as necessary

        userRepository.save(user);
        return true;
    }

}
