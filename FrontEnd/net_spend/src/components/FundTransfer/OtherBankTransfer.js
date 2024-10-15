import React, { useState } from 'react';
import { transferService } from '../../Services/transferService';

const OtherBankTransfer = () => {
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toBank: '',
    toAccount: '',
    amount: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({
      ...transferData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Assume transferService.transferToOtherBank is an async function
      const response = await transferService.transferToOtherBank(transferData);
      alert(`Transfer Successful: ${response.message}`);
      // Reset form or handle success (redirect, show message, etc.)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to complete the transfer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Transfer to Other Bank</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fromAccount">From Account:</label>
          <input
            type="text"
            id="fromAccount"
            name="fromAccount"
            value={transferData.fromAccount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="toBank">To Bank:</label>
          <input
            type="text"
            id="toBank"
            name="toBank"
            value={transferData.toBank}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="toAccount">To Account Number:</label>
          <input
            type="text"
            id="toAccount"
            name="toAccount"
            value={transferData.toAccount}
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
            value={transferData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="note">Note (Optional):</label>
          <textarea
            id="note"
            name="note"
            value={transferData.note}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>Transfer</button>
      </form>
    </div>
  );
};

export default OtherBankTransfer;
