import React, { useState } from 'react';
import './CreditCardPayments.css'; // Ensure you have the CSS for styling

const CreditCardPayments = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send the card details to your server for processing
    // For this example, we'll just log to the console
    console.log(cardDetails);
    alert('Payment Submitted (check console for details)');
    // Reset form fields
    setCardDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: '',
    });
  };

  return (
    <div className="creditCardPaymentForm">
      <form onSubmit={handleSubmit}>
        <h2>Credit Card Payment</h2>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="text"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Card Holder Name:</label>
          <input
            type="text"
            name="cardHolderName"
            value={cardDetails.cardHolderName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submitBtn">Submit Payment</button>
      </form>
    </div>
  );
};

export default CreditCardPayments;
