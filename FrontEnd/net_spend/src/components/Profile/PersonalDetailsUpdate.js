import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './PersonalDetailsUpdate.css'; // Adjust the path if necessary

const PersonalDetailsUpdate = () => {
    const user = useSelector((state) => state.user.currentUser);
    const loading = useSelector((state) => state.user.isLoading);
    const error = useSelector((state) => state.user.error);

    const [userDetails, setUserDetails] = useState({
        userId: '', // These will be populated from the Redux store
        firstName: '',
        lastName: '',
        email: '', // User input
        phoneNumber: '', // User input, can be pre-filled and then edited
    });

    // Effect to populate userId when user data is available
    useEffect(() => {
        if (user) {
            setUserDetails((details) => ({
                ...details,
                userId: user.userId, // Ensure this matches your user object property name
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
            }));
        }
    }, [user]); // Depend on user to repopulate form when user data changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Retrieve the user token from localStorage
        const token = localStorage.getItem('userToken');
        if (!token) {
            alert('No token found. Please log in again.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8082/api/auth/update-details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update details');
            }

            const data = await response.json();
            console.log('Success:', data);
            alert('Details updated successfully!');
        } catch (error) {
            console.error('Error updating details:', error);
            alert('Failed to update details. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data: {error.message}</div>;

    return (
        <div className="personalDetailsUpdate">
            <h2>Update Personal Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Details</button>
            </form>
        </div>
    );
};

export default PersonalDetailsUpdate;
