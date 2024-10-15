package com.futurebank.accountService.service;

import com.futurebank.accountService.DTO.ForecastDTO;
import com.futurebank.accountService.DTO.MonthlyExpenditureDTO;
import com.futurebank.accountService.model.MyTransactionCategory;
import com.futurebank.accountService.model.Transaction;
import com.futurebank.accountService.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExpenditureServiceImpl implements ExpenditureService {

    private static final Logger logger = LoggerFactory.getLogger(ExpenditureServiceImpl.class);

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<MonthlyExpenditureDTO> getMonthlyExpenditures() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDateTime = now.minusMonths(4).withDayOfMonth(1).toLocalDate().atStartOfDay();
        logger.debug("Fetching transactions from {} to {}", startDateTime, now);

        List<Transaction> transactions = transactionRepository.findByTransactionDateBetween(startDateTime, now);
        if (transactions.isEmpty()) {
            logger.info("No transactions found between {} and {}", startDateTime, now);
            return new ArrayList<>();
        }

        Map<YearMonth, Map<MyTransactionCategory, BigDecimal>> monthlyExpenditures = transactions.stream()
                .collect(Collectors.groupingBy(
                        transaction -> YearMonth.from(transaction.getTransactionDate()),
                        Collectors.groupingBy(Transaction::getCategory,
                                Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add))));

        List<MonthlyExpenditureDTO> results = new ArrayList<>();
        monthlyExpenditures.forEach((yearMonth, categoryMap) -> categoryMap.forEach((category, total) -> {
            logger.debug("Processing YearMonth: {}, Category: {}, Total: {}", yearMonth, category, total);
            results.add(new MonthlyExpenditureDTO(category, total, yearMonth.toString())); // Adjusted constructor to match your DTO
        }));

        logger.info("Returning monthly expenditures for the last 4 months: {}", results);
        return results;
    }

    @Override
    public List<ForecastDTO> getExpenditureForecast() {
        try {
            // Assuming getMonthlyExpenditures() is implemented elsewhere
            List<MonthlyExpenditureDTO> expenditures = getMonthlyExpenditures();
            
            Map<String, List<Map<String, Object>>> requestPayload = new HashMap<>();
            List<Map<String, Object>> expenditureList = new ArrayList<>();
            
            for (MonthlyExpenditureDTO expenditure : expenditures) {
                Map<String, Object> expenditureMap = new HashMap<>();
                String category = expenditure.getCategory() == null ? "Unknown" : expenditure.getCategory().toString();
                expenditureMap.put("category", category);
                expenditureMap.put("totalAmount", expenditure.getTotalAmount());
                expenditureMap.put("month", expenditure.getMonth());
                expenditureList.add(expenditureMap);
            }
            
            requestPayload.put("data", expenditureList);
            
            System.out.println("Payload: " + requestPayload);
            
            String forecastApiUrl = "http://127.0.0.1:5000/forecast";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, List<Map<String, Object>>>> entity = new HttpEntity<>(requestPayload, headers);

            // Note the change here to use exchange with ParameterizedTypeReference
            ResponseEntity<List<ForecastDTO>> response = restTemplate.exchange(
                forecastApiUrl,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<List<ForecastDTO>>(){}); // Correctly parameterized to expect List<ForecastDTO>

            logger.info("Forecast result: {}", response.getBody());
            return response.getBody(); // Correctly returning List<ForecastDTO>
        } catch (Exception ex) {
            logger.error("Error during forecasting: {}", ex.getMessage());
            return new ArrayList<>(); // Return empty list in case of error
        }
    }



    private Map<String, Object> prepareForecastingPayload() {
        LocalDate now = LocalDate.now();
        LocalDate fourMonthsAgo = now.minusMonths(4).withDayOfMonth(1);

        List<MonthlyExpenditureDTO> recentExpenditures = getMonthlyExpendituresBetween(fourMonthsAgo, now);

        Map<MyTransactionCategory, BigDecimal> categoryWiseSum = recentExpenditures.stream()
                .collect(Collectors.groupingBy(
                        MonthlyExpenditureDTO::getCategory,
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                MonthlyExpenditureDTO::getTotalAmount,
                                BigDecimal::add)
                ));

        Map<String, Object> payload = new HashMap<>();
        payload.put("data", categoryWiseSum);
        return payload;
    }

    private List<MonthlyExpenditureDTO> getMonthlyExpendituresBetween(LocalDate start, LocalDate end) {
        YearMonth startMonth = YearMonth.from(start);
        YearMonth endMonth = YearMonth.from(end);
        List<MonthlyExpenditureDTO> expenditures = new ArrayList<>();

        for (YearMonth month = startMonth; !month.isAfter(endMonth); month = month.plusMonths(1)) {
            expenditures.addAll(getMonthlyExpendituresForMonth(month));
        }

        return expenditures;
    }

    private List<MonthlyExpenditureDTO> getMonthlyExpendituresForMonth(YearMonth month) {
        LocalDateTime start = month.atDay(1).atStartOfDay();
        LocalDateTime end = month.atEndOfMonth().atTime(23, 59, 59);
        List<Transaction> transactions = transactionRepository.findByTransactionDateBetween(start, end);

        Map<MyTransactionCategory, BigDecimal> categoryTotals = transactions.stream()
                .collect(Collectors.groupingBy(Transaction::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)));

        List<MonthlyExpenditureDTO> results = new ArrayList<>();
        categoryTotals.forEach((category, total) -> results.add(new MonthlyExpenditureDTO(category, total, month.toString()))); // Adjusted constructor to match your DTO
        logger.info("Monthly expenditures for month {}: {}", month, results);
        return results;
    }
}
