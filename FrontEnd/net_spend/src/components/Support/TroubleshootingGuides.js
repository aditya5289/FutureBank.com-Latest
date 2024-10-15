import React from 'react';
import './TroubleShootingGuides.css';


const TroubleshootingGuides = () => {
    const guides = [
        {
            id: 1,
            title: 'Resetting Your Online Banking Password',
            steps: [
                'Go to the login page.',
                'Click on the "Forgot Password" link.',
                'Follow the instructions to reset your password.',
            ],
        },
        {
            id: 2,
            title: 'What to Do If You Suspect Fraudulent Activity',
            steps: [
                'Immediately contact Future Bank customer service.',
                'Review your recent transactions for any discrepancies.',
                'Change your online banking password and security questions.',
            ],
        },
        {
            id: 3,
            title: 'Setting Up Mobile Banking',
            steps: [
                'Download the Future Bank app from the App Store or Google Play.',
                'Open the app and select "Register".',
                'Follow the on-screen instructions to set up your account.',
            ],
        },
    ];

    return (
        <div className="troubleshooting-guides">
            <h2>Troubleshooting Guides</h2>
            {guides.map((guide) => (
                <div key={guide.id} className="guide">
                    <h3>{guide.title}</h3>
                    <ol>
                        {guide.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            ))}
        </div>
    );
};

export default TroubleshootingGuides;
