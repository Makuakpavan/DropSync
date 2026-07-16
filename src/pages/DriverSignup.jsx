import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthRoleForm from "../components/AuthRoleForm";
import { signup } from "../services/api";

export default function DriverSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  const handleSubmit = async ({ formData }) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await signup({
        accountType: "driver",
        ...formData,
      });

      if (response?.token) {
        localStorage.setItem("dropsync_token", response.token);
      }

      setSuccess(response?.message || "Driver account prepared. Please verify your email.");
      navigate("/verify");
    } catch (err) {
      setError(err.message || "Unable to create the driver account right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRoleForm
      mode="signup"
      initialRole="driver"
      onBack={handleBack}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
      backLabel="Back to home"
      submitLabel="Continue"
      heading="Create your account"
      subtitle="Choose your role and fill in the details."
      footerText="Already have an account?"
      footerActionText="Sign in"
      onFooterAction={() => navigate("/login")}
    />
  );
}