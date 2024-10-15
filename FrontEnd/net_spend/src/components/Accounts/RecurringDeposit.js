import React, { useState, useEffect } from 'react';
// Assuming bankingService includes a method to get RD account details
import { bankingService } from '../services/bankingService';

const RecurringDeposit = () => {
  const [rdAccounts, setRdAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRdAccounts = async () => {
      try {
        setIsLoading(true);
        // Simulate API call to get RD account details
        const response = await bankingService.fetchRecurringDeposits();
        setRdAccounts(response);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch recurring deposit account details.');
        setIsLoading(false);
      }
    };

    fetchRdAccounts();
  }, []);

  if (isLoading) {
    return <div>Loading recurring deposit account details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recurring-deposits">
      <h2>Recurring Deposit Account Details</h2>
      {rdAccounts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Monthly Installment</th>
              <th>Interest Rate</th>
              <th>Maturity Date</th>
              <th>Maturity Amount</th>
            </tr>
          </thead>
          <tbody>
            {rdAccounts.map((account, index) => (
              <tr key={index}>
                <td>{account.accountNumber}</td>
                <td>{account.monthlyInstallment}</td>
                <td>{account.interestRate}%</td>
                <td>{new Date(account.maturityDate).toLocaleDateString()}</td>
                <td>{account.maturityAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recurring deposit accounts found.</p>
      )}
    </div>
  );
};

export default RecurringDeposit;
