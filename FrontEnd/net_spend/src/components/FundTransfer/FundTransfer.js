import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './FundTransfer.css';
import { fundTransferService } from "../../Services/fundTransfer";

const transactionCategories = [
  { key: "SALARY", description: "Salary" },
  { key: "RENT", description: "Rent" },
  { key: "GROCERIES", description: "Groceries" },
  { key: "UTILITIES", description: "Utilities" },
  { key: "DINING_OUT", description: "Dining Out" },
  { key: "TRANSPORTATION", description: "Transportation" },
  { key: "HEALTHCARE", description: "Healthcare" },
  { key: "ENTERTAINMENT", description: "Entertainment" },
  { key: "SAVINGS", description: "Savings" },
  { key: "OTHER", description: "Other" },
];

const transferTypes = [
  { key: "withinBank", description: "Within Bank" },
  { key: "otherBank", description: "To Other Bank" },
  { key: "quickTransfer", description: "Quick Transfer" },
  { key: "scheduleTransfer", description: "Schedule Transfer" },
];

const FundTransfer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const [transferDetails, setTransferDetails] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    category: "SALARY",
    transferType: "withinBank",
  });

  const [transactionResponse, setTransactionResponse] = useState(null);

  useEffect(() => {
    if (user && user.accountNumber) {
      setTransferDetails((prevDetails) => ({
        ...prevDetails,
        fromAccount: user.accountNumber,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferDetails({ ...transferDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      switch (transferDetails.transferType) {
        case "withinBank":
          response = await fundTransferService.transferWithinBank(transferDetails);
          break;
        case "otherBank":
          response = await fundTransferService.transferToOtherBank(transferDetails);
          break;
        case "quickTransfer":
          response = await fundTransferService.quickTransfer(transferDetails);
          break;
        case "scheduleTransfer":
          response = await fundTransferService.scheduleTransfer(transferDetails);
          break;
        default:
          throw new Error("Invalid transfer type");
      }
      alert("Transfer successful");
      setTransactionResponse(response);
    } catch (error) {
      alert("Transfer failed: " + error.message);
    }
  };

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div>Error fetching user details: {error.message}</div>;

  return (
    <div className="fund-transfer-container">
      <h2>Fund Transfer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fromAccount">From Account:</label>
          <input
            type="text"
            className="form-control"
            id="fromAccount"
            name="fromAccount"
            value={transferDetails.fromAccount}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="toAccount">To Account:</label>
          <input
            type="text"
            className="form-control"
            id="toAccount"
            name="toAccount"
            value={transferDetails.toAccount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={transferDetails.amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <div>
            {transactionCategories.map((category, index) => (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id={category.key}
                  value={category.key}
                  checked={transferDetails.category === category.key}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={category.key}>
                  {category.description}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Transfer Type:</label>
          <div>
            {transferTypes.map((type, index) => (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="transferType"
                  id={type.key}
                  value={type.key}
                  checked={transferDetails.transferType === type.key}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={type.key}>
                  {type.description}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {transactionResponse && (
        <div className="transaction-details">
          <h4>Transaction Details</h4>
          <p><b>Status:</b> Transaction Successful</p>
          <p><b>Transaction ID:</b> {transactionResponse.transactionId}</p>
          <p><b>From Account:</b> {transactionResponse.fromAccountId}</p>
          <p><b>To Account:</b> {transactionResponse.toAccountId}</p>
          <p><b>Amount:</b> {transactionResponse.amount}</p>
          <p><b>Category:</b> {transactionResponse.category}</p>
          <p><b>Date:</b> {transactionResponse.transactionDate ? transactionResponse.transactionDate : 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default FundTransfer;
