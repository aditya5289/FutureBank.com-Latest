import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BankingService from "../../Services/bankingService";
import "./AccountsSummary.css";

function AccountsSummary() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setTransactions([]);
    setIsLoading(true);
    setError(null);

    if (!user || !user.accountNumber) {
      console.error("No user or account ID available");
      setIsLoading(false);
      return;
    }

    const fetchAccountTransactions = async () => {
      try {
        const fetchedTransactions = await BankingService.fetchTransactions(user.accountNumber);
        fetchedTransactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountTransactions();
  }, [user]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="transaction-summary">
      <h2>Account Transactions</h2>
      {isLoading ? (
        <div>Loading account transactions...</div>
      ) : error ? (
        <div>Error fetching account transactions. Please try again later.</div>
      ) : transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Account Number Reference</th>
              <th>Debit (-)</th>
              <th>Credit (+)</th>
              <th>Balance</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const isCredit = transaction.toAccountId === user.accountNumber;
              return (
                <tr key={transaction.transactionId} className={isCredit ? "credit-row" : "debit-row"}>
                  <td>{formatDate(transaction.transactionDate)}</td>
                  <td>{transaction.transactionId}</td>
                  <td>{isCredit ? transaction.fromAccountId : transaction.toAccountId}</td>
                  <td>{isCredit ? "" : `- $${transaction.amount}`}</td>
                  <td>{isCredit ? `+ $${transaction.amount}` : ""}</td>
                  <td>${transaction.avlBalance?.toFixed(2) ?? 'Unavailable'}</td>
                  <td>{transaction.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}

export default AccountsSummary;
