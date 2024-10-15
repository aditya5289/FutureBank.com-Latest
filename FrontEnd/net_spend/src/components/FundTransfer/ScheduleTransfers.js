import React, { useState } from 'react';
import { transferService } from '../../Services/transferService';

const ScheduleTransfer = () => {
  const [transferData, setTransferData] = useState({
    toAccount: '',
    amount: '',
    transferDate: '',
    recurrence: 'none', // Options: 'none', 'daily', 'weekly', 'monthly'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({
      ...transferData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Assuming transferService.scheduleTransfer is an async function
      const response = await transferService.scheduleTransfer(transferData);
      alert(`Transfer Scheduled Successfully: ${response.message}`);
      // Reset form or handle success (redirect, show message, etc.)
      setTransferData({ toAccount: '', amount: '', transferDate: '', recurrence: 'none' });
    } catch (error) {
      setErrorMessage(error.message || 'Failed to schedule the transfer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Schedule Transfer</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="transferDate">Transfer Date:</label>
          <input
            type="date"
            id="transferDate"
            name="transferDate"
            value={transferData.transferDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="recurrence">Recurrence:</label>
          <select
            id="recurrence"
            name="recurrence"
            value={transferData.recurrence}
            onChange={handleInputChange}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>Schedule Transfer</button>
      </form>
    </div>
  );
};

export default ScheduleTransfer;
