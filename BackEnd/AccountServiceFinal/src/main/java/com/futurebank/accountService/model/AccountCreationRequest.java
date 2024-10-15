package com.futurebank.accountService.model;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AccountCreationRequest {

    @NotNull(message = "User ID cannot be null")
    private Long userId;

    @NotEmpty(message = "Account type cannot be empty")
    private String accountType;

    // No need to manually add getters and setters due to Lombok annotations
}
