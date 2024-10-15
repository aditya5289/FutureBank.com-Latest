class SupportService {
    static baseUrl = 'https://api.futurebank.com/support';
  
    // Fetch FAQs
    static async getFAQs() {
      try {
        const response = await fetch(`${this.baseUrl}/faqs`);
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        throw error;
      }
    }
  
    // Submit a service request
    static async submitServiceRequest(userId, requestDetails) {
      try {
        const response = await fetch(`${this.baseUrl}/serviceRequests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_AUTH_TOKEN`, // Authentication token if required
          },
          body: JSON.stringify({
            userId,
            ...requestDetails,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to submit service request');
        }
        return await response.json();
      } catch (error) {
        console.error("Error submitting service request:", error);
        throw error;
      }
    }
  
    // Submit feedback
    static async submitFeedback(userId, feedback) {
      try {
        const response = await fetch(`${this.baseUrl}/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_AUTH_TOKEN`,
          },
          body: JSON.stringify({
            userId,
            feedback,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to submit feedback');
        }
        return await response.json();
      } catch (error) {
        console.error("Error submitting feedback:", error);
        throw error;
      }
    }
  
    // Additional methods for troubleshooting guides, contact information, etc., can be added here
  }
  
  export default SupportService;
  