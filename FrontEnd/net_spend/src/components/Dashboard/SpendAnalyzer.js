import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMonthlyExpenditures, fetchExpenditureForecast } from '../../Services/expenditureService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./SpendAnalyzer.css";

function SpendAnalyzer() {
  const [monthlyExpenditures, setMonthlyExpenditures] = useState([]);
  const [forecast, setForecast] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    if (user) {
      const loadExpendituresAndForecast = async () => {
        try {
          const monthlyData = await fetchMonthlyExpenditures();
          setMonthlyExpenditures(monthlyData);
          const forecastData = await fetchExpenditureForecast();
          setForecast(Array.isArray(forecastData) ? forecastData : [forecastData]);
        } catch (error) {
          console.error('Error fetching expenditure data:', error);
        }
      };

      loadExpendituresAndForecast();
    }
  }, [user]);

  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  const getNextMonthName = () => {
    if (monthlyExpenditures.length === 0) {
      let today = new Date();
      return `Forecasted: ${monthNames[(today.getMonth() + 1) % 12]} ${today.getFullYear() + (today.getMonth() + 1 === 12 ? 1 : 0)}`;
    }
    const recentExpenditure = monthlyExpenditures.reduce((a, b) => new Date(a.month) > new Date(b.month) ? a : b);
    const recentDate = new Date(recentExpenditure.month);
    const nextMonth = new Date(recentDate.getFullYear(), recentDate.getMonth() + 1, 1);
    return `Forecasted: ${monthNames[nextMonth.getMonth()]} ${nextMonth.getFullYear()}`;
  };

  const forecastMonthName = getNextMonthName();

  const transformDataForChart = (expenditures, forecast) => {
    let dataByMonth = {};
    let forecastData = {};

    expenditures.forEach(({ month, category, totalAmount }) => {
      const monthDate = new Date(month);
      const formattedMonth = `${monthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}`;
      if (!dataByMonth[formattedMonth]) {
        dataByMonth[formattedMonth] = {};
      }
      dataByMonth[formattedMonth][category] = totalAmount;
    });

    if (forecast.length > 0) {
      forecast.forEach(({ category, forecastAmount }) => {
        if (!forecastData[forecastMonthName]) {
          forecastData[forecastMonthName] = {};
        }
        forecastData[forecastMonthName][category] = forecastAmount;
      });
    }

    const sortedData = Object.keys(dataByMonth).map(month => ({
      month,
      ...dataByMonth[month],
    })).sort((a, b) => {
      const yearA = parseInt(a.month.slice(-4)), monthA = monthNames.indexOf(a.month.split(' ')[0]);
      const yearB = parseInt(b.month.slice(-4)), monthB = monthNames.indexOf(b.month.split(' ')[0]);
      return yearA !== yearB ? yearA - yearB : monthA - monthB;
    });

    // Append forecast data at the end
    if (Object.keys(forecastData).length > 0) {
      sortedData.push({
        month: forecastMonthName,
        ...forecastData[forecastMonthName]
      });
    }

    return sortedData;
  };

  const chartData = transformDataForChart(monthlyExpenditures, forecast);

  const renderCharts = () => {
    return chartData.map((data, index) => (
      <div className="SpendAnalyzer" key={index}>
        <h3>{data.month}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[data]}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data).filter(key => key !== 'month').map((key, idx) => (
              <Bar key={idx} dataKey={key} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    ));
  };

  return (
    <div className="SpendAnalyzer-label">
      <h2>Monthly Expenditures and Forecast</h2>
      {renderCharts()}
    </div>
  );
}

export default SpendAnalyzer;
