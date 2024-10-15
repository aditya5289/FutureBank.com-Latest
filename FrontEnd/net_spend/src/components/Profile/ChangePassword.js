import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChangePassword.css"; // Adjust the path as necessary

const ChangePassword = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    if (!user || !user.userId) {
      setError('User information is missing. Please log in again.');
      return;
    }

    const token = localStorage.getItem('userToken'); // Assume token is still in localStorage
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      alert("Password successfully changed.");
      navigate("/profile-management"); // Adjust according to your routing setup
    } catch (error) {
      setError(error.message || "Failed to change password. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    await handleChangePassword({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="changePassword">
      <h2>Change Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
