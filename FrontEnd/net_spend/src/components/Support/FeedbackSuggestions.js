import React, { useState } from 'react';

const FeedbackSuggestions = () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the feedback to the server
        console.log(feedback);
        setFeedback('');
        setSubmitted(true);
        // Reset submission state after a delay
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="feedback-form-container">
            <h2>We Value Your Feedback</h2>
            {submitted ? (
                <p>Thank you for your feedback!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="feedback">Your Feedback or Suggestions:</label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                            className="form-control"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            )}
        </div>
    );
};

export default FeedbackSuggestions;
