import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Individual");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "United States",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { accountType, ...form });
  };

  const tabs = ["Individual", "Business", "Courier"];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center px-4 py-8 sm:py-12">
      {/* Back to login */}
      <div className="w-full max-w-md mb-4 sm:mb-6">
        <button
          type="button"
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Back to login
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
            <Package size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-slate-900">DropSync</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Fill in the details to get started
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setAccountType(tab)}
              className={`flex-1 text-sm font-medium py-2.5 rounded-lg transition-all ${
                accountType === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 rounded-full transition-all"
              style={{ width: "33.33%" }}
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Step 1 of 3 <span className="mx-1">&middot;</span>
          <span className="text-slate-400">Personal details</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-semibold tracking-wide text-slate-700 mb-2"
            >
              FIRST NAME
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={handleChange("firstName")}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-xs font-semibold tracking-wide text-slate-700 mb-2"
            >
              LAST NAME
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={handleChange("lastName")}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="country"
                className="block text-xs font-semibold tracking-wide text-slate-700 mb-2"
              >
                COUNTRY
              </label>
              <select
                id="country"
                value={form.country}
                onChange={handleChange("country")}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M0%200l6%208%206-8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
              >
                <option>United States</option>
                <option>Nigeria</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Ghana</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold tracking-wide text-slate-700 mb-2"
              >
                PHONE
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(201) 555-0123"
                value={form.phone}
                onChange={handleChange("phone")}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold tracking-wide text-slate-700 mb-2"
            >
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold tracking-wide text-slate-700 mb-2"
            >
              PASSWORD
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange("password")}
                className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
          onClick={() => navigate('/verify')}
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Next
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            className="text-amber-500 font-medium hover:text-amber-600 transition-colors"
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}