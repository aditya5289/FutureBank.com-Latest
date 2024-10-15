import React from 'react';
import Announcements from './Announcements';
import QuickLinks from './QuickLinks';
import PersonalizedOffers from './PersonalizedOffers';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Future Bank</h1>
      <Announcements />
      <QuickLinks />
      <PersonalizedOffers />
      {/* You can add more components here as needed */}
    </div>
  );
};

export default HomePage;
