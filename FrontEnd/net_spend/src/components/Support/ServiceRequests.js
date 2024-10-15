import React, { useState } from 'react';

const ServiceRequest = () => {
    const [requestType, setRequestType] = useState('');
    const [details, setDetails] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Typically, you would send this data to your backend server for processing
        console.log(`Request Type: ${requestType}, Details: ${details}`);
        setRequestType('');
        setDetails('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="service-request-form-container">
            <h2>Submit a Service Request</h2>
            {submitted ? (
                <p>Thank you for submitting your request. We will process it as soon as possible.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="requestType">Type of Request</label>
                        <select
                            id="requestType"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            required
                            className="form-control"
                        >
                            <option value="">Select a request type</option>
                            <option value="newChequeBook">New Cheque Book</option>
                            <option value="cardIssue">Report Lost/Stolen Card</option>
                            <option value="accountIssue">Account Issues</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="details">Details</label>
                        <textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            className="form-control"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Submit Request</button>
                </form>
            )}
        </div>
    );
};

export default ServiceRequest;
