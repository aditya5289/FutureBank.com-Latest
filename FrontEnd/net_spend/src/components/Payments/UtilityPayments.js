import React, { useState } from 'react';
import './UtilityPayments.css'; // Assume you have corresponding CSS for styling

const UtilityPayments = () => {
  // Initial state for utility payment form
  const [paymentDetails, setPaymentDetails] = useState({
    utilityType: 'electricity', // Default selection
    accountNumber: '',
    amount: '',
  });

  // Update state upon form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to process utility payment goes here
    // For demonstration, just logging to console and showing an alert
    console.log("Utility Payment Details:", paymentDetails);
    alert(`Payment for ${paymentDetails.utilityType} of $${paymentDetails.amount} is being processed.`);
    // Reset form fields after submission
    setPaymentDetails({
      utilityType: 'electricity',
      accountNumber: '',
      amount: '',
    });
  };

  return (
    <div className="utilityPayments">
      <h2>Utility Payments</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="utilityType">Utility Type:</label>
          <select name="utilityType" id="utilityType" value={paymentDetails.utilityType} onChange={handleChange}>
            <option value="electricity">Electricity</option>
            <option value="water">Water</option>
            <option value="gas">Gas</option>
            <option value="internet">Internet</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={paymentDetails.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="amount">Amount ($):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default UtilityPayments;
