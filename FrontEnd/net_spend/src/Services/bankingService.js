class BankingService {
  // Base URL for your banking API
  static baseUrl = 'http://localhost:8083/api/accounts';

  // Token management for demonstration purposes
  // In a real application, consider using a more secure and dynamic way to manage tokens
  static authToken = localStorage.getItem('userToken');

  // Method to update the authToken
  static updateAuthToken(token) {
    localStorage.setItem('userToken', token); // Update token in local storage as well
    this.authToken = token;
  }

  // Create a new account
  static async createAccount(accountData) {
    const url = `${this.baseUrl}/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
      body: JSON.stringify(accountData),
    };

    return this.performFetch(url, options);
  }

  // Update account information
  static async updateAccountInfo(accountId, accountInfo) {
    const url = `${this.baseUrl}/${accountId}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
      body: JSON.stringify(accountInfo),
    };

    return this.performFetch(url, options);
  }

  // Fetch single account summary
  static async getAccountSummary(accountId) {
    const url = `${this.baseUrl}/transactions/${accountId}`;
    return this.performFetch(url, this.getOptions('GET'));
  }

  // Delete an account
  static async deleteAccount(accountId) {
    const url = `${this.baseUrl}/${accountId}`;
    return this.performFetch(url, this.getOptions('DELETE'));
  }

  // Initiate a fund transfer
  static async transferFunds(transferDetails) {
    const url = `${this.baseUrl}/transfers`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
      body: JSON.stringify(transferDetails),
    };

    return this.performFetch(url, options);
  }

  // Fetch the transactions for an account
  static async fetchTransactions(accountId) {
    const url = `${this.baseUrl}/transactions/${accountId}`;
    return this.performFetch(url, this.getOptions('GET'));
  }

  // Get all accounts
  static async getAllAccounts() {
    const url = `${this.baseUrl}/`;
    return this.performFetch(url, this.getOptions('GET'));
  }

  // New method to get account balance
  static async getBalance(accountId) {
    const url = `${this.baseUrl}/balance/${accountId}`;
    return this.performFetch(url, this.getOptions('GET'));
  }

  // Method to add money to an account
  static async addMoney(accountId, amount) {
    const url = `${this.baseUrl}/${accountId}/deposit`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
      body: JSON.stringify(amount), // Direct numeric value as suggested
    };

    return this.performFetch(url, options);
  }

  // Method to withdraw money from an account
  static async withdrawMoney(accountId, amount) {
    const url = `${this.baseUrl}/${accountId}/withdraw`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
      body: JSON.stringify(amount), // Direct numeric value as suggested
    };

    return this.performFetch(url, options);
  }

  // Utility method to handle fetch operations
  static async performFetch(url, options) {
    try {
      const response = await fetch(url, options);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Generate options object for fetch calls
  static getOptions(method) {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
    };
  }

  // Utility method to handle response
  static async handleResponse(response) {
    if (!response.ok) {
      if (response.status === 404) {
        // Handle 404 error specifically for fetchTransactions
        return [];
      }
      const error = await response.text();
      throw new Error(`Network response was not ok: ${error}`);
    }
    return response.json();
  }

  // Utility method to handle errors
  static handleError(error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Rethrow the error so it can be caught by the calling code
  }
}

export default BankingService;
