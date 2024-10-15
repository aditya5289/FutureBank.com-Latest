package com.futurebank.authservice.client;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.futurebank.authservice.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AccountClient {

    private static final Logger logger = LoggerFactory.getLogger(AccountClient.class);
    private final RestTemplate restTemplate;
    private final String accountServiceUrl = "http://localhost:8083/api/accounts"; // Adjust based on actual URL

    @Autowired
    public AccountClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Long createAccountForUser(User user, String accountType) {
        HashMap<String, Object> request = new HashMap<>();
        request.put("userId", user.getUserId());
        request.put("accountType", accountType);
        logger.info("Attempting to create account for user ID: {}", user.getUserId());

        try {
            ResponseEntity<AccountCreationResponse> response = restTemplate.postForEntity(accountServiceUrl, request, AccountCreationResponse.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                logger.info("Account successfully created for user ID: {}", user.getUserId());
                return response.getBody().getAccountNumber();
            } else {
                logger.error("Failed to create account. Response status: {}", response.getStatusCode());
            }
        } catch (Exception e) {
            logger.error("Exception occurred while creating account for user ID: {}", user.getUserId(), e);
        }
        return null; // Consider changing this to Optional<Long> for better clarity on method outcome
    }
}
