import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthRoleForm from "../components/AuthRoleForm";
import { login } from "../services/api";

export default function LoginPage({ initialRole = "individual" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async ({ role, formData }) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await login({ role, ...formData });
      if (response?.token) {
        localStorage.setItem("dropsync_token", response.token);
      }

      setSuccess(response?.message || "Signed in successfully.");
      navigate(role === "driver" ? "/driver-dashboard" : "/customer-overview");
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