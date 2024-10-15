import React, { useState } from 'react';
import './TaxPayments.css'; // Assume you have corresponding CSS for styling

const TaxPayments = () => {
  // State to store form data
  const [taxDetails, setTaxDetails] = useState({
    taxType: 'incomeTax', // Default to income tax
    taxpayerId: '',
    amount: '',
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxDetails({
      ...taxDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit these details to the backend for processing
    console.log("Tax Payment Details:", taxDetails);
    alert(`Payment of $${taxDetails.amount} for ${taxDetails.taxType} is being processed.`);
    // Reset form after submission
    setTaxDetails({
      taxType: 'incomeTax',
      taxpayerId: '',
      amount: '',
    });
  };

  return (
    <div className="taxPayments">
      <h2>Make a Tax Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="taxType">Tax Type:</label>
          <select name="taxType" id="taxType" value={taxDetails.taxType} onChange={handleChange}>
            <option value="incomeTax">Income Tax</option>
            <option value="gst">GST</option>
            <option value="propertyTax">Property Tax</option>
            <option value="vehicleTax">Vehicle Tax</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="taxpayerId">Taxpayer ID:</label>
          <input
            type="text"
            id="taxpayerId"
            name="taxpayerId"
            value={taxDetails.taxpayerId}
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
            value={taxDetails.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default TaxPayments;
