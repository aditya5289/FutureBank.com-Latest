import React from "react";
import { Link } from "react-router-dom";
import './CustomerSupport.css';


const CustomerSupport = () => {
  return (
    <div className="customerSupport">
      <h1>Customer Support</h1>
      <p id="para1">Welcome to Future Bank Customer Support. How can we help you today?</p>
      <div className="supportSections">
        <section>
          <h2>FAQs</h2>
          <p>
            Find answers to common questions about accounts, services, and more.
          </p>
          <Link to="/faqs">View FAQs</Link>
        </section>
        <section>
          <h2>Troubleshooting Guides</h2>
          <p>Having issues? Check out our guides for step-by-step solutions.</p>
          <Link to="/troubleshooting">Troubleshooting Guides</Link>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>
            Can't find what you're looking for? Get in touch with our support
            team.
          </p>
          <Link to="/contact-information">Contact Information</Link>
        </section>
        <section>
          <h2>Feedback and Suggestions</h2>
          <p>We value your feedback. Share your suggestions with us.</p>
          <Link to="/feedback-suggestions">Provide Feedback</Link>
        </section>
        <section>
          <h2>Service Requests</h2>
          <p>Need assistance? Submit a service request here.</p>
          <Link to="/service-requests">Submit Service Request</Link>
        </section>
      </div>
    </div>
  );
};

export default CustomerSupport;
