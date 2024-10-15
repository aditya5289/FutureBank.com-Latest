import React, { useState, useEffect } from 'react';
// Assuming bankingService includes methods related to savings account operations
import { bankingService } from '../services/bankingService';

const SavingsAccount = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        // Simulate API call to fetch recent transactions for the savings account
        const response = await bankingService.fetchSavingsAccountTransactions();
        setTransactions(response);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch transactions.');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="savings-account">
      <h2>Savings Account Transactions</h2>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
      <button onClick={() => bankingService.downloadAccountStatement()}>
        Download Statement
      </button>
    </div>
  );
};

export default SavingsAccount;
