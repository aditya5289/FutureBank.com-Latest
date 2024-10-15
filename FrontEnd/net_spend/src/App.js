import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Auth Imports
import LoginPage from "./components/Auth/LoginPage";
import Register from "./components/Auth/Register";
import OtpPage from "./components/Auth/OtpPage";
// Dashboard Imports
import Dashboard from "./components/Dashboard/Dashboard";
import QuickLinks from "./components/HomePage/QuickLinks";
// Accounts Imports
import AccountsSummary from "./components/Accounts/AccountsSummary";
import LoanAccount from "./components/Accounts/LoanAccount";
import FixedDeposit from "./components/Accounts/FixedDeposit";

// FundTransfer Imports
import FundTransfer from "./components/FundTransfer/FundTransfer";
// Payments Imports
import PaymentsBills from "./components/Payments/PaymentsBills";
// Profile Imports
import ProfileManagement from "./components/Profile/ProfileManagement";
import PersonalDetailsUpdate from "./components/Profile/PersonalDetailsUpdate";
import ChangePassword from "./components/Profile/ChangePassword";
import ManageBeneficiaries from "./components/Profile/ManageBeneficiaries";
import HighSecurityOptions from "./components/Profile/HighSecurityOptions";
// Support Imports
import CustomerSupport from "./components/Support/CustomerSupport";
import FAQs from "./components/Support/FAQs";
import ContactInformation from "./components/Support/ContactInformation";
import TroubleshootingGuides from "./components/Support/TroubleshootingGuides";
import FeedbackSuggestions from "./components/Support/FeedbackSuggestions";
import ServiceRequests from "./components/Support/ServiceRequests";
// Logout Imports
import Logout from "./components/Logout/Logout";
// HomePage Imports
import HomePage from "./components/HomePage/HomePage";
import AddBeneficiary from "./components/Profile/AddBeneficiary";

function App() {
  return (
    <Router>
      <Routes>
        {/* HomePage & Auth Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpPage />} />
        
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Accounts */}
        <Route path="/accounts-summary" element={<AccountsSummary />} />
        
        {/* FundTransfer */}
        <Route path="/fund-transfer" element={<FundTransfer />} />
        
        {/* Payments */}
        <Route path="/payments-bills" element={<PaymentsBills />} />
        
        {/* Profile Management */}
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/profile/personal-details-update" element={<PersonalDetailsUpdate />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        <Route path="/profile/manage-beneficiaries" element={<ManageBeneficiaries />} />
        <Route path="/profile/high-security-options" element={<HighSecurityOptions />} />
        
        {/* Support */}
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact-information" element={<ContactInformation />} />
        <Route path="/troubleshooting" element={<TroubleshootingGuides />} />
        <Route path="/feedback-suggestions" element={<FeedbackSuggestions />} />
        <Route path="/service-requests" element={<ServiceRequests />} />
        <Route path="/add-beneficiary" element={<AddBeneficiary />} />
        

          <Route path="/fund-transfer" element={<FundTransfer />} />
          <Route path="/bill-payments" element={<PaymentsBills />} />
          <Route path="/account-summary" element={<AccountsSummary />} />
          <Route path="/loan-application" element={<LoanAccount />} />
          <Route path="/fixed-deposits" element={<FixedDeposit />} />




        {/* Logout */}
        <Route path="/logout" element={<Logout />} />
        
        {/* Additional routes for new components can be added here */}
      </Routes>
    </Router>
  );
}

export default App;
