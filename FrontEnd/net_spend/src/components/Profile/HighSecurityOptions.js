import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateSecuritySettings } from "../../Services/authService"; // Update this import based on your project structure
import "./HighSecurityOptions.css"; // Ensure you have corresponding CSS for styling

const HighSecurityOptions = () => {
  const navigate = useNavigate();
  const [securitySettings, setSecuritySettings] = useState({
    enableOTP: false,
    transactionLimit: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace the placeholder with a call to your backend service
      await updateSecuritySettings(securitySettings); // Assume `updateSecuritySettings` is the method you have for this
      alert("High security options updated successfully.");
      navigate("/profile-management"); // Redirect to profile or another relevant page
    } catch (error) {
      // Adjust error handling as needed based on your application's error handling strategy
      console.error("Failed to update high security options:", error);
      alert("Failed to update high security options. Please try again.");
    }
  };

  return (
    <div className="highSecurityOptions">
      <h2>High Security Options</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="enableOTP">
            <input
              type="checkbox"
              id="enableOTP"
              name="enableOTP"
              checked={securitySettings.enableOTP}
              onChange={handleChange}
            />
            Enable OTP for transactions
          </label>
        </div>
        <div className="formGroup">
          <label htmlFor="transactionLimit">Set Transaction Limit:</label>
          <input
            type="number"
            id="transactionLimit"
            name="transactionLimit"
            value={securitySettings.transactionLimit}
            onChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit">Update Security Options</button>
      </form>
    </div>
  );
};

export default HighSecurityOptions;
