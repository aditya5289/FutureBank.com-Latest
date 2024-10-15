package com.futurebank.accountService.model;

public enum MyTransactionCategory {
    INCOME("General income"),
    EXPENSE("General expenses"),
    TRANSFER("Transfers between accounts"),
    SALARY("Income from salary"),
    RENT("Expenses for rent"),
    UTILITIES("Expenses for utilities like electricity, water, gas"),
    GROCERIES("Expenses for food and household supplies"),
    DINING_OUT("Expenses for eating out"),
    ENTERTAINMENT("Expenses for entertainment like movies, events"),
    HEALTHCARE("Expenses for medical services and products"),
    TRAVEL("Expenses for travel and vacations"),
    EDUCATION("Expenses for education including tuition, books"),
    SHOPPING("Expenses for clothing, electronics, other goods"),
    INSURANCE("Expenses for various insurances"),
    TAXES("Expenses for taxes"),
    DONATIONS("Expenses for donations and gifts"),
    INVESTMENTS("Transfers to investment accounts"),
    SAVINGS("Transfers to savings accounts"), // Already present, matches your new categories
    LOAN_PAYMENT("Expenses for loan repayments"),
    OTHER("Catch-all for transactions that don't fit other categories"),
    // Adding new categories that were not previously listed
    TRANSPORTATION("Costs related to personal or public transport"); // Newly added from your list

    private final String description;

    MyTransactionCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
