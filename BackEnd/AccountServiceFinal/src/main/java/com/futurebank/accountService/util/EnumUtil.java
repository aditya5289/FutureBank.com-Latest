package com.futurebank.accountService.util;

import java.util.Optional;

public class EnumUtil {

    // Generic method to safely convert string values to enum constants
    public static <E extends Enum<E>> Optional<E> getEnumSafe(Class<E> enumClass, String name) {
        try {
            return Optional.of(Enum.valueOf(enumClass, name));
        } catch (IllegalArgumentException | NullPointerException e) {
            return Optional.empty();
        }
    }

    // Specific method for MyTransactionCategory enum
    public static Optional<com.futurebank.accountService.model.MyTransactionCategory> getTransactionCategorySafe(String name) {
        return getEnumSafe(com.futurebank.accountService.model.MyTransactionCategory.class, name.toUpperCase());
    }
}
