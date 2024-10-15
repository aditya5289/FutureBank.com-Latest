import React, { useState } from 'react';
import './Recharges.css'; // Assume you have corresponding CSS for styling

const Recharges = () => {
  // State to store form data
  const [rechargeDetails, setRechargeDetails] = useState({
    serviceType: 'mobile', // Default to mobile recharge
    phoneNumber: '',
    amount: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRechargeDetails({
      ...rechargeDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, submit these details to the backend to process the recharge
    console.log("Recharge Details:", rechargeDetails);
    alert(`Recharge of ${rechargeDetails.amount} for ${rechargeDetails.phoneNumber} is being processed.`);
    // Reset form
    setRechargeDetails({
      serviceType: 'mobile',
      phoneNumber: '',
      amount: '',
    });
  };

  return (
    <div className="recharges">
      <h2>Recharge Services</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="serviceType">Service Type:</label>
          <select name="serviceType" id="serviceType" value={rechargeDetails.serviceType} onChange={handleChange}>
            <option value="mobile">Mobile</option>
            <option value="dth">DTH</option>
            <option value="datacard">Data Card</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="phoneNumber">Phone Number/DTH Account:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={rechargeDetails.phoneNumber}
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
            value={rechargeDetails.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Recharge Now</button>
      </form>
    </div>
  );
};

export default Recharges;
