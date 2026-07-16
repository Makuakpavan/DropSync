import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthRoleForm from "../components/AuthRoleForm";
import { createCompanyAccount } from "../services/api";

export default function CompanySignup() {
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
      const response = await createCompanyAccount({
        role: "company",
        industry: formData.industry || "E-commerce",
        companyName: formData.companyName,
        businessEmail: formData.businessEmail,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
      });

      if (response?.token) {
        localStorage.setItem("dropsync_token", response.token);
      }

      setSuccess(response?.message || "Company account created.");
      navigate("/company-verify");
    } catch (err) {
      setError(err.message || "Unable to create the company account right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRoleForm
      mode="signup"
      initialRole="company"
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