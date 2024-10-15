import React, { useState, useEffect } from 'react';
import './Announcements.css';

// Mock function to simulate fetching announcements from a backend
const fetchAnnouncements = () => {
  return Promise.resolve([
    { id: 1, title: "Scheduled Maintenance", content: "Our online banking will be undergoing scheduled maintenance on Sunday, 10 PM to Monday, 2 AM. We apologize for any inconvenience." },
    { id: 2, title: "New Savings Account Rates", content: "We've updated our savings account interest rates. Visit our accounts page to learn more." },
    { id: 3, title: "Security Alert", content: "Beware of phishing emails posing as Future Bank. Remember, we never ask for your password or PIN via email." },
  ]);
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements().then(setAnnouncements);
  }, []);

  return (
    <div>
      <h2>Announcements</h2>
      {announcements.length > 0 ? (
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <h3>{announcement.title}</h3>
              <p>{announcement.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements at this time.</p>
      )}
    </div>
  );
};

export default Announcements;
