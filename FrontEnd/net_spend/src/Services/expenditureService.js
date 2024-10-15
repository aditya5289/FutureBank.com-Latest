// Services/expenditureService.js

const API_BASE_URL = 'http://localhost:8083/api/expenditure'; // Adjust this URL to your Spring Boot application's actual base URL.

export const fetchMonthlyExpenditures = async () => {
  const response = await fetch(`${API_BASE_URL}/monthly`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers as required, such as authorization tokens.
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchExpenditureForecast = async () => {
  const response = await fetch(`${API_BASE_URL}/forecast`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers as required.
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
