import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthRoleForm from "../components/AuthRoleForm";
import { signup } from "../services/api";
import { useAuth } from "../context/useAuth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login: loginUser } = useAuth();

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/login");
  };

  const handleSubmit = async ({ role, formData }) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // BACKEND REQUIRED: creates the real account record. Mock fallback is active if the API is offline.
      const response = await signup({
        accountType: role === "individual" ? "individual" : role,
        ...formData,
      });

      if (response?.token) {
        loginUser(response.token, role);
      }

      setSuccess(response?.message || "Account prepared. Please verify your email.");
      navigate("/verify");
    } catch (err) {
      setError(err.message || "Unable to create the account right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRoleForm
      mode="signup"
      initialRole="individual"
      onBack={handleBack}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
      backLabel="Back to login"
      submitLabel="Create account"
      heading="Create your account"
      subtitle="Choose your role and fill in the details."
      footerText="Already have an account?"
      footerActionText="Sign in"
      onFooterAction={() => navigate("/login")}
    />
  );
}