class ProfileService {
    static baseUrl = 'https://api.futurebank.com/profile';
  
    // Update personal details
    static updatePersonalDetails(userId, details) {
      return fetch(`${this.baseUrl}/${userId}/updateDetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Handle authentication as needed
        },
        body: JSON.stringify(details),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
    }
  
    // Change password
    static changePassword(userId, passwordDetails) {
      return fetch(`${this.baseUrl}/${userId}/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN',
        },
        body: JSON.stringify(passwordDetails),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
    }
  
    // Manage security options
    static updateSecurityOptions(userId, securityOptions) {
      return fetch(`${this.baseUrl}/${userId}/securityOptions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN',
        },
        body: JSON.stringify(securityOptions),
      })
      .then(this.handleResponse)
      .catch(this.handleError);
    }
  
    // Utility method to handle responses
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
  
  export default ProfileService;
  