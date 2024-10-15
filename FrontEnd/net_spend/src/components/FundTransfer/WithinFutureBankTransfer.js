import React, { useState } from 'react';
import { transferService } from '../../Services/transferService';

const WithinFutureBankTransfer = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!accountNumber || !amount) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Assuming transferService.withinBankTransfer is an async function that handles the transfer logic
      await transferService.withinBankTransfer({
        accountNumber,
        amount,
        description,
      });
      setSuccess(true);
      // Reset form
      setAccountNumber('');
      setAmount('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'An error occurred during the transfer. Please try again.');
    }
  };

  return (
    <div>
      <h2>Transfer Within Future Bank</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Transfer successful!</p>}
      <form onSubmit={handleTransfer}>
        <div>
          <label>Recipient Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description (Optional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default WithinFutureBankTransfer;
