import React, { useState } from 'react';
import './InsurancePremiums.css'; // Make sure to create a corresponding CSS file for styling

const InsurancePremiums = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    policyNumber: '',
    amount: '',
    paymentMethod: 'creditCard', // Assuming 'creditCard' as default; could also be 'debitCard', 'netBanking', etc.
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you would send this information to your backend for processing
    console.log(paymentDetails);
    alert('Insurance Premium Payment Submitted (check console for details)');
    // Reset form fields
    setPaymentDetails({
      policyNumber: '',
      amount: '',
      paymentMethod: 'creditCard',
    });
  };

  return (
    <div className="insurancePremiumPaymentForm">
      <form onSubmit={handleSubmit}>
        <h2>Pay Insurance Premium</h2>
        <div className="form-group">
          <label>Policy Number:</label>
          <input
            type="text"
            name="policyNumber"
            value={paymentDetails.policyNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Method:</label>
          <select
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="netBanking">Net Banking</option>
          </select>
        </div>
        <button type="submit" className="submitBtn">Submit Payment</button>
      </form>
    </div>
  );
};

export default InsurancePremiums;
