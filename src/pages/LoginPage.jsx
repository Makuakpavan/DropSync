import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthRoleForm from "../components/AuthRoleForm";
import { login } from "../services/api";
import { getDashboardPathForRole } from "../utils/auth";
import { useAuth } from "../context/useAuth";

export default function LoginPage({ initialRole = "individual" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleSubmit = async ({ role, formData }) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // BACKEND REQUIRED: real auth check, but api.js includes a mock fallback until the backend is ready.
      const response = await login({ role, ...formData });
      if (response?.token) {
        loginUser(response.token, role);
      }

      setSuccess(response?.message || "Signed in successfully.");
      navigate(getDashboardPathForRole(role));
    } catch (err) {
      setError(err.message || "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRoleForm
      mode="login"
      initialRole={initialRole}
      onBack={() => navigate("/")}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
      backLabel="Back to home"
      submitLabel="Sign in to Dashboard"
      heading="Welcome back"
      subtitle="Choose your role and enter your credentials to access the dashboard."
      footerText="Need an account?"
      footerActionText="Create one"
      onFooterAction={() => navigate("/signup")}
    />
  );
}