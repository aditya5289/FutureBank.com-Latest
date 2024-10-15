import React from 'react';
import './ContactInformation.css';


const ContactInformation = () => {
    return (
        <div className="contactInformation">
            <h1>Contact Information</h1>
            <div className="contactOptions">
                <section>
                    <h2>Customer Service</h2>
                    <p>For any queries or issues with your account:</p>
                    <ul>
                        <li>Phone: 1-800-FUTURE-BANK (1-800-387-837-2265)</li>
                        <li>Email: support@futurebank.com</li>
                    </ul>
                </section>
                <section>
                    <h2>Technical Support</h2>
                    <p>For problems accessing your account online or with mobile banking:</p>
                    <ul>
                        <li>Phone: 1-800-TECH-FB (1-800-832-4322)</li>
                        <li>Email: techsupport@futurebank.com</li>
                    </ul>
                </section>
                <section>
                    <h2>Corporate Office</h2>
                    <p>Visit or send mail to our headquarters:</p>
                    <address>
                        Future Bank Corporate Office<br/>
                        123 Bank Street,<br/>
                        Financial District,<br/>
                        Metropolis, 45678
                    </address>
                </section>
            </div>
        </div>
    );
};

export default ContactInformation;
