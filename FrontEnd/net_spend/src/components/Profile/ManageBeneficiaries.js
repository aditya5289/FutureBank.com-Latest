import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageBeneficiaries.css'; // Ensure corresponding CSS is in place

const ManageBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    setLoading(true);
    try {
      // Adjust the URL to your actual API endpoint
      const response = await fetch('/api/beneficiaries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed, e.g., 'Authorization': 'Bearer yourTokenHere'
        },
      });
      if (!response.ok) throw new Error('Failed to fetch beneficiaries.');
      const data = await response.json();
      setBeneficiaries(data);
    } catch (error) {
      console.error('Failed to fetch beneficiaries:', error);
      setError('Failed to fetch beneficiaries.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBeneficiary = async (beneficiaryId) => {
    setLoading(true);
    try {
      // Adjust the URL and method according to your API
      const response = await fetch(`/api/beneficiaries/${beneficiaryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed
        },
      });
      if (!response.ok) throw new Error('Failed to delete beneficiary.');
      setBeneficiaries(beneficiaries.filter(b => b.id !== beneficiaryId));
      setSuccessMessage('Beneficiary removed successfully.');
    } catch (error) {
      console.error('Failed to remove beneficiary:', error);
      setError('Failed to remove beneficiary.');
    } finally {
      setLoading(false);
    }
  };

  // To avoid inline function creation on each render
  const createRemoveHandler = (beneficiaryId) => () => handleRemoveBeneficiary(beneficiaryId);

  return (
    <div className="manageBeneficiaries">
      <h2>Manage Beneficiaries</h2>
      <Link to="/add-beneficiary">Add New Beneficiary</Link>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <div className="beneficiaryList">
        {beneficiaries.length > 0 ? (
          beneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="beneficiaryItem">
              <p>{beneficiary.name} - {beneficiary.accountNumber}</p>
              <button onClick={createRemoveHandler(beneficiary.id)} aria-label={`Remove ${beneficiary.name}`}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No beneficiaries added.</p>
        )}
      </div>
    </div>
  );
};

export default ManageBeneficiaries;
