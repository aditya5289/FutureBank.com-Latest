package com.futurebank.accountService.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futurebank.accountService.DTO.ForecastDTO;
import com.futurebank.accountService.DTO.MonthlyExpenditureDTO;
import com.futurebank.accountService.service.ExpenditureService;

@RestController
@RequestMapping("/api/expenditure")
public class ExpenditureController {

    private final ExpenditureService expenditureService;

    @Autowired
    public ExpenditureController(ExpenditureService expenditureService) {
        this.expenditureService = expenditureService;
    }

    @GetMapping("/monthly")
    public ResponseEntity<List<MonthlyExpenditureDTO>> getMonthlyExpenditures() {
        List<MonthlyExpenditureDTO> monthlyExpenditures = expenditureService.getMonthlyExpenditures();
        return ResponseEntity.ok(monthlyExpenditures);
    }

    @GetMapping("/forecast")
    public ResponseEntity<List<ForecastDTO>> getExpenditureForecast() {
        List<ForecastDTO> forecast = expenditureService.getExpenditureForecast();
        return ResponseEntity.ok(forecast);
    }
}
