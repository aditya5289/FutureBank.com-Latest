package com.futurebank.authservice.controller;

import com.futurebank.authservice.model.User;
import com.futurebank.authservice.dto.ChangePasswordDTO;
import com.futurebank.authservice.dto.UpdatePersonalDetailsDTO;
import com.futurebank.authservice.dto.UserDto; // Ensure this import is correct
import com.futurebank.authservice.security.TokenProvider;
import com.futurebank.authservice.service.UserService;
import org.springframework.http.MediaType;
import net.bytebuddy.dynamic.DynamicType.Builder.FieldDefinition.Optional;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager, TokenProvider tokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            System.out.println("Attempting to register user with email: " + user.getEmail());
            logger.info("Attempting to register user with email: {}", user.getEmail());
            User registeredUser = userService.registerUser(user);
            System.out.println("Returning to front "+registeredUser.toString());
            UserDto userDto = toUserDto(registeredUser); // Assuming conversion to UserDto excludes sensitive info
            System.out.println("Returning to front2"+userDto.toString());
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            logger.error("Registration failed: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Registration failed due to internal server error."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info("Authentication successful for user: {}", loginRequest.getUsername());
            String jwt = tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new LoginResponse(true, "Login successful", jwt));
        } catch (BadCredentialsException e) {
            logger.error("Login failed: Invalid username or password", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(false, "Error: Invalid username or password", null));
        } catch (Exception e) {
            logger.error("Login process encountered an internal error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LoginResponse(false, "Internal server error", null));
        }
    }
    @GetMapping("/current_user")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        System.out.println("Checking authentication status...");

        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println("Authenticated username: " + username);

            // Use userService to fetch the user details
            java.util.Optional<User> userOpt = userService.findByUsername(username);
            System.out.println("Sending useropt: " + userOpt.toString());
            if (userOpt.isPresent()) {
                UserDto userDto = toUserDto(userOpt.get());
                // Here, consider overriding the toString method in your UserDto to print meaningful information
                System.out.println("Sending UserDto to front end: " + userDto.toString());
                return ResponseEntity.ok(userDto);
            } else {
                System.out.println("User not found for username: " + username);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "User not found"));
            }
        } else {
            System.out.println("No authentication found or user is not authenticated.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "No authentication found or user is not authenticated"));
        }
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO, Authentication authentication) {
        try {
            logger.info("Attempting to change password for authenticated user");

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            
            // Ensuring that the user exists and retrieving user details
            User user = userService.findByUsername(username)
                        .orElseThrow(() -> new IllegalStateException("User not found for username: " + username));
            
            logger.info("Changing password for userId: {}", user.getUserId());
            System.out.println("New Password "+changePasswordDTO.toString());
            // Delegating the password change operation to the service layer
            userService.changePassword(user.getUserId(), changePasswordDTO);

            logger.info("Password changed successfully for userId: {}", user.getUserId());
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Password changed successfully"));
        } catch (IllegalStateException | IllegalArgumentException e) {
            logger.error("Error changing password: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error during password change: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "An unexpected error occurred."));
        }
    }


    @PostMapping("/update-details")
    public ResponseEntity<?> updatePersonalDetails(@RequestBody UpdatePersonalDetailsDTO updatePersonalDetailsDTO, Authentication authentication) {
        try {
            logger.info("In update-details");
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            logger.info("Printing User Details: {}", userDetails);
            String username = userDetails.getUsername();
            logger.info("Printing User name: {}", username);

            // Find the user by username to get the userId
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new IllegalStateException("User not found"));

            // Pass the userId and updatePersonalDetailsDTO to the service
            System.out.println("USER :"+user);
            userService.updatePersonalDetails(user.getUserId(), updatePersonalDetailsDTO);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Personal details updated successfully"));
        } catch (Exception e) {
            logger.error("Error in update-details catch block", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        }
    }
    
    // Utility method to convert a User entity to a DTO
 // Utility method to convert a User entity to a DTO
    private UserDto toUserDto(User user) {
        // Example implementation - adjust fields as needed
        return new UserDto(
                user.getUserId(),
                user.getAccountType(),
                user.getCurrencyType(),
                user.getPrefix(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getDob(),
                user.getStreetAddress(),
                user.getStreetAddress2(),
                user.getCity(),
                user.getStateProvince(),
                user.getPostalZipCode(),
                user.getAdhaarNumber(),
                user.getCountry(),
                user.getCitizenship(),
                user.getMaritalStatus(),
                user.getOccupation(),
                user.getEmployerName(),
                user.getUsername(),
                user.getEmail(),
                user.getAccountNumber()
             
        );
    }

    // Assuming this method is within the same class that has access to User and UserDto
    // If convertRolesToStrings method is not present in this class, you might need to implement it here as well
  

}
