import React from 'react';
import "./PersonalizedOffers.css";

const PersonalizedOffers = () => {
  // Placeholder for personalized offers, replace with actual data fetching logic
  const offers = [
    { id: 1, title: "Exclusive Loan Offer", description: "Get a personal loan with a special interest rate of just 5.99% p.a." },
    { id: 2, title: "High-Yield Savings Account", description: "Open a high-yield savings account and enjoy an interest rate of up to 4% p.a." },
    { id: 3, title: "Credit Card Cashback", description: "Apply for our Platinum Credit Card and get 5% cashback on all your purchases." },
    { id: 4, title: "Mortgage Refinancing Deal", description: "Refinance your mortgage with us and receive a $500 credit towards closing costs." },
    { id: 5, title: "Premium Checking Account", description: "Upgrade to our Premium Checking Account and receive a complimentary safety deposit box for one year" },
    { id: 6, title: "Investment Portfolio Review", description:"Sign up for a complimentary investment portfolio review with one of our financial advisors." },
  ];

  return (
    <div className="personalized-offers">
      <h2>Personalized Offers for You</h2>
      <div className="offers-list">
        {offers.map((offer) => (
          <div  key={offer.id} className="offer">
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedOffers;
