import React, { useState, useEffect } from 'react';
import bankingService from '../../Services/bankingService';

const CurrentAccount = () => {
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: '',
    balance: 0,
    transactions: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setIsLoading(true);
      try {
        // Assuming fetchCurrentAccountDetails is a method in your bankingService
        const data = await bankingService.fetchCurrentAccountDetails();
        setAccountDetails({
          accountNumber: data.accountNumber,
          balance: data.balance,
          transactions: data.transactions,
        });
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch account details');
        setIsLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  if (isLoading) return <div>Loading account details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Current Account</h2>
      <p>Account Number: {accountDetails.accountNumber}</p>
      <p>Balance: ${accountDetails.balance}</p>
      <h3>Recent Transactions</h3>
      <ul>
        {accountDetails.transactions.length > 0 ? (
          accountDetails.transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.date} - {transaction.type} - ${transaction.amount}
            </li>
          ))
        ) : (
          <p>No recent transactions found.</p>
        )}
      </ul>
    </div>
  );
};

export default CurrentAccount;
