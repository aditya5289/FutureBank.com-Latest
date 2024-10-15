import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBeneficiary.css'; // Ensure you have the corresponding CSS

const AddBeneficiary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    bankName: '',
    bankBranch: '',
    ifscCode: '',
    email: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Add more sophisticated validation as needed
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        setError(`Please fill out the ${key} field.`);
        return false;
      }
    }
    // Reset error state if validation passes
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8082/api/beneficiaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add beneficiary');
      }

      alert('Beneficiary added successfully!');
      navigate('/manage-beneficiaries'); // Adjust the route as necessary
    } catch (error) {
      console.error('Failed to add beneficiary:', error);
      setError(error.message || 'Failed to add beneficiary. Please try again.');
    }
  };

  return (
    <div className="addBeneficiary">
      <h2>Add Beneficiary</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGrid"> {/* Use grid layout here */}
          <div className="formGroup">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="accountNumber">Account Number:</label>
            <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="bankName">Bank Name:</label>
            <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="bankBranch">Bank Branch:</label>
            <input type="text" id="bankBranch" name="bankBranch" value={formData.bankBranch} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="ifscCode">IFSC Code:</label>
            <input type="text" id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit">Add Beneficiary</button>
      </form>
    </div>
  );
};


export default AddBeneficiary;
