package com.futurebank.accountService.service;

import java.util.List;

import com.futurebank.accountService.DTO.ForecastDTO;
import com.futurebank.accountService.DTO.MonthlyExpenditureDTO;

public interface ExpenditureService {
    List<MonthlyExpenditureDTO> getMonthlyExpenditures();
    List<ForecastDTO> getExpenditureForecast();
}
