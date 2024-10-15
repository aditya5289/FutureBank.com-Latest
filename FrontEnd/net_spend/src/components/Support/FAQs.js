import React, { useState } from 'react';
import './FAQ.css';

// Sample FAQ data
const faqs = [
    {
        question: 'How do I open a new bank account?',
        answer: 'You can open a new bank account by visiting our nearest branch or applying online through our website.'
    },
    {
        question: 'What should I do if my card is lost or stolen?',
        answer: 'If your card is lost or stolen, please report it immediately through our mobile app or call our 24/7 customer service hotline.'
    },
    {
        question: 'How can I set up online banking?',
        answer: 'To set up online banking, register through our website using your account number and follow the verification process.'
    },
    {
        question: 'Can I transfer funds to an international bank account?',
        answer: 'Yes, you can transfer funds internationally through our online banking service or mobile app. Additional fees and exchange rates may apply.'
    },
];

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = index => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="faqs">
            <h1>Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${index === activeIndex ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
                    <h2 className="faq-question">{faq.question}</h2>
                    <p className="faq-answer">{index === activeIndex && faq.answer}</p>
                </div>
            ))}
        </div>
    );
};

export default FAQs;
