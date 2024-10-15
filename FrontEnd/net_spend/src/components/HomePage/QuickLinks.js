import React from 'react';
import { Link } from 'react-router-dom';
import "./QuickLinks.css";

const QuickLinks = () => {
  return (
    <div className="quick-links">
      <h2>Quick Access</h2>
      <ul>
        <li><Link to="/fund-transfer">Fund Transfer</Link></li>
        <li><Link to="/bill-payments">Bill Payments</Link></li>
        <li><Link to="/account-summary">Account Summary</Link></li>
        <li><Link to="/loan-application">Loan Application</Link></li>
        <li><Link to="/fixed-deposits">Fixed Deposits</Link></li>
      </ul>
    </div>
  );
};

export default QuickLinks;
