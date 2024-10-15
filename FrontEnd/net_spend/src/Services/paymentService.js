class PaymentService {
    static baseUrl = 'https://api.futurebank.com/payments';
  
    // Pay utility bill
    static payUtilityBill(billDetails) {
      return fetch(`${this.baseUrl}/utility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Assume authentication is required
        },
        body: JSON.stringify(billDetails),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
    }
  
    // Make a credit card payment
    static payCreditCard(cardPaymentDetails) {
      return fetch(`${this.baseUrl}/creditcard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN',
        },
        body: JSON.stringify(cardPaymentDetails),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
    }
  
    // Pay insurance premium
    static payInsurance(insurancePaymentDetails) {
      return fetch(`${this.baseUrl}/insurance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN',
        },
        body: JSON.stringify(insurancePaymentDetails),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
    }
  
    // Utility method to handle response
    static handleResponse(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    }
  
    // Utility method to handle errors
    static handleError(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }
  
  export default PaymentService;
  