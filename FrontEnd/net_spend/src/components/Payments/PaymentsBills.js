import React, { useState } from 'react';
import './PaymentsBills.css'; // Assume you have corresponding CSS for styling

// Mock data to simulate fetched bills
const mockBills = [
  { id: 1, name: "Electricity Bill", amount: "120.50", dueDate: "2024-02-15" },
  { id: 2, name: "Water Bill", amount: "70.30", dueDate: "2024-02-20" },
  { id: 3, name: "Internet Bill", amount: "59.99", dueDate: "2024-02-22" },
  // Add more bills as needed
];

const PaymentsBills = () => {
  // State to store selected bill for payment
  const [selectedBill, setSelectedBill] = useState(null);

  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
    // In a real app, you would open a payment modal or redirect to a payment page with this bill's details
    console.log("Selected bill for payment:", bill);
    alert(`Redirecting to payment for: ${bill.name}`);
  };

  return (
    <div className="paymentsBills">
      <h2>Payments & Bills</h2>
      <ul className="billsList">
        {mockBills.map((bill) => (
          <li key={bill.id} className="billItem">
            <div>
              <h3>{bill.name}</h3>
              <p>Amount: ${bill.amount}</p>
              <p>Due Date: {bill.dueDate}</p>
            </div>
            <button onClick={() => handleSelectBill(bill)}>Pay Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsBills;
