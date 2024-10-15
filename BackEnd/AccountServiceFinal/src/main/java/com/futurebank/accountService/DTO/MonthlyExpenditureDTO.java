package com.futurebank.accountService.DTO;

import java.math.BigDecimal;
import java.time.YearMonth;
import com.futurebank.accountService.model.MyTransactionCategory;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MonthlyExpenditureDTO {

    private MyTransactionCategory category;
    private BigDecimal totalAmount;
    private YearMonth month;

    // Constructor for initializing all fields
    public MonthlyExpenditureDTO(YearMonth month, MyTransactionCategory category, BigDecimal totalAmount) {
        this.month = month;
        this.category = category;
        // Ensures totalAmount is never null to avoid NullPointerException
        this.totalAmount = totalAmount != null ? totalAmount : BigDecimal.ZERO;
    }

    // Default constructor
    public MonthlyExpenditureDTO() {
        // Initialize totalAmount to BigDecimal.ZERO to avoid nulls in arithmetic or comparison operations
        this.totalAmount = BigDecimal.ZERO;
    }

    public MonthlyExpenditureDTO(MyTransactionCategory category2, BigDecimal totalAmount, String month2) {
    	 this.month = YearMonth.parse(month2);
         this.category = category2;
         // Ensures totalAmount is never null to avoid NullPointerException
         this.totalAmount = totalAmount != null ? totalAmount : BigDecimal.ZERO;
	}

	// Ensure totalAmount is never returned as null to avoid NullPointerException in arithmetic operations
    public BigDecimal getTotalAmount() {
        return totalAmount != null ? totalAmount : BigDecimal.ZERO;
    }

    // Setter method for totalAmount ensuring non-null value
    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount != null ? totalAmount : BigDecimal.ZERO;
    }
}
