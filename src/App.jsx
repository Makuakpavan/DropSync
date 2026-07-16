import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import VerificationPage from './pages/VerificationPage';
import LoginPage from './pages/LoginPage';
import CompanySignUp from './pages/CompanySignUp';
import CustomerOverview from './pages/CustomerOverview';
import CustomerDelivery from './pages/CustomerDelivery';
import CustomerDeliveryTracker from './pages/CustomerDeliveryTracker';
import CustomerSettings from './pages/CustomerSettings';
import CustomerSigninPage from './pages/CustomerSigninPage';
import CustomerCreateAccount from './pages/CustomerCreateAccount';
import DriverDashboard from './pages/DriverDashboard';
import DriverDeliveries from './pages/DriverDeliveries';
import DriverOverview from './pages/DriverOverview';
import DriverSetting from './pages/DriverSetting';
import DriverSigninPage from './pages/DriverSigninPage';
import DeliveryTracker from './pages/DeliveryTracker';
import AvailableDrivers from './pages/AvailableDrivers';
import DriverSignup from './pages/DriverSignup';
import CompanyVerificationPage from './pages/CompanyVerificationPage';
import CustomeVerification from './pages/CustomeVerification';
import Dispute from './pages/Dispute';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/company-login" element={<LoginPage initialRole="company" />} />
        <Route path="/driver-login" element={<LoginPage initialRole="driver" />} />
        <Route path="/customer-login" element={<LoginPage initialRole="customer" />} />
        <Route path="/company-signup" element={<CompanySignUp />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/customer-signup" element={<CustomerCreateAccount />} />
        <Route path="/customer-overview" element={<CustomerOverview />} />
        <Route path="/customer-delivery" element={<CustomerDelivery />} />
        <Route path="/customer-delivery-tracker" element={<CustomerDeliveryTracker />} />
        <Route path="/customer-settings" element={<CustomerSettings />} />
        <Route path="/customer-signin" element={<CustomerSigninPage />} />
        <Route path="/customer-create-account" element={<CustomerCreateAccount />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/driver-deliveries" element={<DriverDeliveries />} />
        <Route path="/driver-overview" element={<DriverOverview />} />
        <Route path="/driver-settings" element={<DriverSetting />} />
        <Route path="/driver-signin" element={<DriverSigninPage />} />
        <Route path="/delivery-tracker" element={<DeliveryTracker />} />
        <Route path="/available-drivers" element={<AvailableDrivers />} />
        <Route path="/company-verify" element={<CompanyVerificationPage />} />
        <Route path="/customer-verify" element={<CustomeVerification />} />
        <Route path="/disputes" element={<Dispute />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<div className="flex min-h-screen items-center justify-center px-6 text-center text-slate-600">Page not found.</div>} />
      </Routes>
    </div>
  );
}

