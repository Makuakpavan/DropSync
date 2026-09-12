import { Navigate, Routes, Route } from "react-router-dom";
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
import { useAuth } from './context/useAuth';
import { getDashboardPathForRole } from './utils/auth';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPathForRole(role)} replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={getDashboardPathForRole(role)} replace />;
  }

  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
        <Route path="/verify" element={<PublicOnlyRoute><VerificationPage /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/company-login" element={<PublicOnlyRoute><LoginPage initialRole="company" /></PublicOnlyRoute>} />
        <Route path="/driver-login" element={<PublicOnlyRoute><LoginPage initialRole="driver" /></PublicOnlyRoute>} />
        <Route path="/customer-login" element={<PublicOnlyRoute><LoginPage initialRole="customer" /></PublicOnlyRoute>} />
        <Route path="/company-signup" element={<PublicOnlyRoute><CompanySignUp /></PublicOnlyRoute>} />
        <Route path="/driver-signup" element={<PublicOnlyRoute><DriverSignup /></PublicOnlyRoute>} />
        <Route path="/customer-signup" element={<PublicOnlyRoute><CustomerCreateAccount /></PublicOnlyRoute>} />
        <Route path="/customer-overview" element={<ProtectedRoute allowedRoles={['customer', 'individual']}><CustomerOverview /></ProtectedRoute>} />
        <Route path="/customer-delivery" element={<ProtectedRoute allowedRoles={['customer', 'individual']}><CustomerDelivery /></ProtectedRoute>} />
        <Route path="/customer-delivery-tracker" element={<ProtectedRoute allowedRoles={['customer', 'individual']}><CustomerDeliveryTracker /></ProtectedRoute>} />
        <Route path="/customer-settings" element={<ProtectedRoute allowedRoles={['customer', 'individual']}><CustomerSettings /></ProtectedRoute>} />
        <Route path="/customer-signin" element={<PublicOnlyRoute><CustomerSigninPage /></PublicOnlyRoute>} />
        <Route path="/customer-create-account" element={<PublicOnlyRoute><CustomerCreateAccount /></PublicOnlyRoute>} />
        <Route path="/driver-dashboard" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
        <Route path="/driver-deliveries" element={<ProtectedRoute allowedRoles={['driver']}><DriverDeliveries /></ProtectedRoute>} />
        <Route path="/driver-overview" element={<ProtectedRoute allowedRoles={['driver']}><DriverOverview /></ProtectedRoute>} />
        <Route path="/driver-settings" element={<ProtectedRoute allowedRoles={['driver']}><DriverSetting /></ProtectedRoute>} />
        <Route path="/driver-signin" element={<PublicOnlyRoute><DriverSigninPage /></PublicOnlyRoute>} />
        <Route path="/delivery-tracker" element={<ProtectedRoute><DeliveryTracker /></ProtectedRoute>} />
        <Route path="/available-drivers" element={<ProtectedRoute><AvailableDrivers /></ProtectedRoute>} />
        <Route path="/company-verify" element={<PublicOnlyRoute><CompanyVerificationPage /></PublicOnlyRoute>} />
        <Route path="/customer-verify" element={<PublicOnlyRoute><CustomeVerification /></PublicOnlyRoute>} />
        <Route path="/disputes" element={<ProtectedRoute><Dispute /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="*" element={<div className="flex min-h-screen items-center justify-center px-6 text-center text-slate-600">Page not found.</div>} />
      </Routes>
    </div>
  );
}

