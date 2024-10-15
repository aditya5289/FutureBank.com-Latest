import React, { useState, useEffect } from 'react';
// Import the banking service which should include a method to get loan account details
import  bankingService  from '../../Services/bankingService';

const LoanAccount = () => {
  const [loanAccounts, setLoanAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoanAccounts = async () => {
      try {
        setIsLoading(true);
        // Simulate API call to get loan account details
        const response = await bankingService.fetchLoanAccounts();
        setLoanAccounts(response);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch loan account details.');
        setIsLoading(false);
      }
    };

    fetchLoanAccounts();
  }, []);

  if (isLoading) {
    return <div>Loading loan account details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="loan-accounts">
      <h2>Loan Account Details</h2>
      {loanAccounts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Loan Account Number</th>
              <th>Outstanding Amount</th>
              <th>Interest Rate</th>
              <th>EMI Due Date</th>
              <th>EMI Amount</th>
            </tr>
          </thead>
          <tbody>
            {loanAccounts.map((account, index) => (
              <tr key={index}>
                <td>{account.accountNumber}</td>
                <td>{account.outstandingAmount}</td>
                <td>{account.interestRate}%</td>
                <td>{new Date(account.emiDueDate).toLocaleDateString()}</td>
                <td>{account.emiAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loan accounts found.</p>
      )}
    </div>
  );
};

export default LoanAccount;
