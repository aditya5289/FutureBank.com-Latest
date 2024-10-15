import React from 'react';
import { useHistory } from 'react-router-dom';

const SessionSummary = () => {
    const history = useHistory();

    // Placeholder data - in a real application, this would come from your application's state or a backend API
    const activities = [
        { id: 1, activity: "Logged in", timestamp: "2024-02-07 09:00" },
        { id: 2, activity: "Viewed account summary", timestamp: "2024-02-07 09:15" },
        { id: 3, activity: "Transferred funds to Savings Account", timestamp: "2024-02-07 09:30" },
        { id: 4, activity: "Paid electricity bill", timestamp: "2024-02-07 10:00" },
        { id: 5, activity: "Updated personal details", timestamp: "2024-02-07 10:30" }
    ];

    const handleLogout = () => {
        // Perform logout operations here
        console.log('User has been logged out.');
        // Redirect to the login page or home page after logout
        history.push('/login');
    };

    return (
       
        <div className="session-summary">
            <h2>Session Summary</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>{activity.activity} at {activity.timestamp}</li>
                ))}
            </ul>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default SessionSummary;
