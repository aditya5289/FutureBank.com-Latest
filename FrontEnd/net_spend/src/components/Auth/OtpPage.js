// src/components/Auth/OtpPage.js
import React, { useState } from 'react';

function OtpPage({ onOtpSubmit, onOtpSuccess, onOtpFail }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assume verifyOtp is a function that sends the OTP to the server for verification
      // You would need to implement this function based on your backend API
      const response = await verifyOtp(otp);
      if (response.success) {
        onOtpSuccess(); // Callback for successful OTP verification
      } else {
        onOtpFail(response.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      onOtpFail('An error occurred during OTP verification.');
    }
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength="6" // Assuming OTP is 6 digits
            autoFocus
          />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

// Placeholder for the actual OTP verification function
// This function should make an HTTP request to your backend API
async function verifyOtp(otp) {
  // Implementation depends on your API
  // Example:
  /*
  const response = await fetch('your-api-endpoint/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp }),
  });
  return response.json();
  */
  console.log('Verifying OTP:', otp);
  // Simulate OTP verification
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
}

export default OtpPage;
