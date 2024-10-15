import React, { useState } from 'react';
import { transferService } from '../../Services/transferService';

const QuickTransfer = () => {
  const [transferDetails, setTransferDetails] = useState({
    toAccount: '',
    amount: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferDetails({
      ...transferDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Assuming transferService.quickTransfer is an async function
      const response = await transferService.quickTransfer(transferDetails);
      alert(`Transfer Successful: ${response.message}`);
      // Reset form or handle success (redirect, show message, etc.)
      setTransferDetails({ toAccount: '', amount: '' });
    } catch (error) {
      setErrorMessage(error.message || 'Failed to complete the quick transfer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Quick Transfer</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="toAccount">To Account Number:</label>
          <input
            type="text"
            id="toAccount"
            name="toAccount"
            value={transferDetails.toAccount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transferDetails.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>Transfer</button>
      </form>
    </div>
  );
};

export default QuickTransfer;
