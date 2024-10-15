import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import QuickLinks from "../HomePage/QuickLinks";
import PersonalizedOffers from "../HomePage/PersonalizedOffers";
import { getCurrentUser } from "../../Services/authService";
import bankingService from "../../Services/bankingService";
import "./Dashboard.css";
import { setCurrentUser, setLoading, setError } from "../../redux/actions/authActions";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    async function fetchUserDataAndBalance() {
      dispatch(setLoading());
      try {
        const currentUser = await getCurrentUser();
        dispatch(setCurrentUser(currentUser));

        if (currentUser?.accountNumber) {
          const initialTransactions = await bankingService.fetchTransactions(
            currentUser.accountNumber
          );
          setTransactions(initialTransactions);

          const userBalance = await bankingService.getBalance(
            currentUser.accountNumber
          );
          setBalance(userBalance);
        }
      } catch (error) {
        console.error("Error fetching user data or transactions:", error);
        dispatch(setError(error));
      }
    }

    fetchUserDataAndBalance();
  }, [dispatch]);

  const token = localStorage.getItem('accessToken'); // Get the token from local storage

  const handleAddMoney = async () => {
    const amount = parseFloat(prompt("Enter amount to add:"));
    if (!isNaN(amount) && amount > 0) {
      try {
        const response = await fetch(`http://localhost:8083/api/accounts/${user.accountNumber}/deposit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Use the token from local storage
          },
          body: JSON.stringify({ amount })
        });
  
        if (!response.ok) {
          throw new Error('Failed to add money');
        }
  
        const updatedBalance = await bankingService.getBalance(user.accountNumber);
        setBalance(updatedBalance);
      } catch (error) {
        console.error("Error adding money:", error);
      }
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const handleWithdrawMoney = async () => {
    const amount = parseFloat(prompt("Enter amount to withdraw:"));
    if (!isNaN(amount) && amount > 0) {
      try {
        const response = await fetch(`http://localhost:8083/api/accounts/${user.accountNumber}/withdraw`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Use the token from local storage
          },
          body: JSON.stringify({ amount })
        });
  
        if (!response.ok) {
          throw new Error('Failed to withdraw money');
        }
  
        const updatedBalance = await bankingService.getBalance(user.accountNumber);
        setBalance(updatedBalance);
      } catch (error) {
        console.error("Error withdrawing money:", error);
      }
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data or transactions: {error.message}</div>;
  }

  const userGreeting = `${getTimeBasedGreeting()}, ${
    user?.firstName?.trim()
      ? `${user.firstName} ${user.lastName || "User"}`
      : "User"
  }!`;

  const toggleBalanceView = () => setShowBalance(!showBalance);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Future Bank</h1>
        </div>
        <ul className="nav-links">
          <li>
            <button className="nav-button" onClick={handleAddMoney}>Add Money</button>
          </li>
          <li>
            <button className="nav-button" onClick={handleWithdrawMoney}>Withdraw Money</button>
          </li>
          <li>
            <Link to="/accounts-summary" className="nav-button">Accounts Summary</Link>
          </li>
          <li>
            <Link to="/fund-transfer" className="nav-button">Fund Transfer</Link>
          </li>
          <li>
            <Link to="/payments-bills" className="nav-button">Payments & Bills</Link>
          </li>
          <li>
            <Link to="/profile-management" className="nav-button">Profile Management</Link>
          </li>
          <li>
            <Link to="/customer-support" className="nav-button">Customer Support</Link>
          </li>
          <li>
            <Link to="/logout" className="nav-button">Logout</Link>
          </li>
        </ul>
      </nav>

      <header className="dashboard-header">
        <div className="user-greeting">{userGreeting}</div>
        <button className="view-balance-btn" onClick={toggleBalanceView}>
          {showBalance ? "Hide Balance" : "View Balance"}
        </button>
        {showBalance && (
          <div className="user-balance">Balance: ${balance.toFixed(2)}</div>
        )}
      </header>

      <div className="main-container">
        <div className="dashboard-content">
          <QuickLinks />
          <PersonalizedOffers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
