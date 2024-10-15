package com.futurebank.accountService.controller;

import com.futurebank.accountService.service.SpendAnalyzerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/spend-analyzer")
public class SpendAnalyzerController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpendAnalyzerController.class);
    private final SpendAnalyzerService spendAnalyzerService;

    public SpendAnalyzerController(SpendAnalyzerService spendAnalyzerService) {
        this.spendAnalyzerService = spendAnalyzerService;
    }

    @GetMapping("/analyze")
    public ResponseEntity<Map<String, BigDecimal>> analyzeSpending() {
        LOGGER.info("Starting spend analysis");
        Map<String, BigDecimal> spendAnalysis = spendAnalyzerService.analyzeSpending();
        if (spendAnalysis.isEmpty()) {
            LOGGER.info("No spending data found");
            return ResponseEntity.noContent().build();
        }
        LOGGER.info("Spend analysis completed successfully");
        return ResponseEntity.ok(spendAnalysis);
    }
}
