import React, { useState, useEffect } from 'react';
// Assume bankingService has a method to fetch fixed deposits which returns a promise
import  bankingService  from '../../Services/bankingService';

const FixedDeposit = () => {
  const [fixedDeposits, setFixedDeposits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate fetching fixed deposit details
    const fetchFixedDeposits = async () => {
      try {
        setIsLoading(true);
        // Replace the below line with actual API call through bankingService
        const response = await bankingService.fetchFixedDeposits();
        setFixedDeposits(response);
        setIsLoading(false);
      } catch (error) {
        setError('Unable to fetch fixed deposit details.');
        setIsLoading(false);
      }
    };

    fetchFixedDeposits();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fixed-deposits">
      <h2>Fixed Deposits</h2>
      {fixedDeposits.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Deposit Amount</th>
              <th>Interest Rate</th>
              <th>Maturity Date</th>
            </tr>
          </thead>
          <tbody>
            {fixedDeposits.map((deposit, index) => (
              <tr key={index}>
                <td>{deposit.accountNumber}</td>
                <td>{deposit.amount}</td>
                <td>{deposit.interestRate}%</td>
                <td>{new Date(deposit.maturityDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No fixed deposits found.</p>
      )}
    </div>
  );
};

export default FixedDeposit;
