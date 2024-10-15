package com.futurebank.accountService.DTO;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ForecastDTO {
    private String category;
    private BigDecimal forecastAmount;

    // Default constructor
    public ForecastDTO() {
        // Initialize forecastAmount to BigDecimal.ZERO to avoid nulls
        this.forecastAmount = BigDecimal.ZERO;
    }

    // Constructor that handles null values for forecastAmount
    public ForecastDTO(String category, BigDecimal forecastAmount) {
        this.category = category;
        // Ensures forecastAmount is never null to avoid NullPointerException
        this.forecastAmount = forecastAmount != null ? forecastAmount : BigDecimal.ZERO;
    }

    // Ensure forecastAmount is never returned as null to avoid NullPointerException
    public BigDecimal getForecastAmount() {
        return forecastAmount != null ? forecastAmount : BigDecimal.ZERO;
    }

    // Optional: If you want to ensure forecastAmount is never set to null
    public void setForecastAmount(BigDecimal forecastAmount) {
        this.forecastAmount = forecastAmount != null ? forecastAmount : BigDecimal.ZERO;
    }

    // Additional methods if necessary
}
