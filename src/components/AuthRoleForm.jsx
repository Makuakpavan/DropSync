import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Package,
} from "lucide-react";

const tabs = [
  { id: "individual", label: "Individual" },
  { id: "company", label: "Company" },
  { id: "driver", label: "Driver" },
];

function getInitialFormState(role) {
  switch (role) {
    case "company":
      return {
        companyName: "",
        businessEmail: "",
        industry: "E-commerce",
        phone: "",
        address: "",
        password: "",
      };
    case "driver":
      return {
        fullName: "",
        email: "",
        phone: "",
        vehicleType: "",
        licenseNumber: "",
        password: "",
      };
    default:
      return {
        firstName: "",
        lastName: "",
        country: "United States",
        phone: "",
        email: "",
        password: "",
      };
  }
}

export default function AuthRoleForm({
  mode = "signup",
  initialRole = "individual",
  loading = false,
  error = "",
  success = "",
  onBack,
  onSubmit,
  backLabel = "Back",
  submitLabel = "Continue",
  heading = "Create your account",
  subtitle = "Choose your role and fill in the details.",
  footerText = "Already have an account?",
  footerActionText = "Sign in",
  onFooterAction,
}) {
  const [activeRole, setActiveRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(() => getInitialFormState(initialRole));

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setForm(getInitialFormState(role));
    setShowPassword(false);
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (onSubmit) {
      await onSubmit({ role: activeRole, formData: form });
    }
  };

  const renderFields = () => {
    if (mode === "login") {
      return (
        <>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="email"
                type="email"
                value={form.email || ""}
                onChange={handleChange("email")}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password || ""}
                onChange={handleChange("password")}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </>
      );
    }

    if (activeRole === "company") {
      return (
        <>
          <div>
            <label htmlFor="companyName" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Company name
            </label>
            <input
              id="companyName"
              type="text"
              value={form.companyName || ""}
              onChange={handleChange("companyName")}
              placeholder="DropSync Labs"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div>
            <label htmlFor="businessEmail" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Business email
            </label>
            <input
              id="businessEmail"
              type="email"
              value={form.businessEmail || ""}
              onChange={handleChange("businessEmail")}
              placeholder="ops@company.com"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="industry" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
                Industry
              </label>
              <div className="relative">
                <select
                  id="industry"
                  value={form.industry || "E-commerce"}
                  onChange={handleChange("industry")}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 pr-8 text-sm text-slate-900 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="E-commerce">E-commerce</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone || ""}
                onChange={handleChange("phone")}
                placeholder="(201) 555-0123"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Business address
            </label>
            <input
              id="address"
              type="text"
              value={form.address || ""}
              onChange={handleChange("address")}
              placeholder="Lagos, Nigeria"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password || ""}
                onChange={handleChange("password")}
                placeholder="Create a password"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pr-11 pl-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </>
      );
    }

    if (activeRole === "driver") {
      return (
        <>
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName || ""}
              onChange={handleChange("fullName")}
              placeholder="Jane Cooper"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={form.email || ""}
              onChange={handleChange("email")}
              placeholder="driver@example.com"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone || ""}
                onChange={handleChange("phone")}
                placeholder="802 888 3000"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            <div>
              <label htmlFor="vehicleType" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
                Vehicle type
              </label>
              <input
                id="vehicleType"
                type="text"
                value={form.vehicleType || ""}
                onChange={handleChange("vehicleType")}
                placeholder="Bike / Van"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="licenseNumber" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              License number
            </label>
            <input
              id="licenseNumber"
              type="text"
              value={form.licenseNumber || ""}
              onChange={handleChange("licenseNumber")}
              placeholder="DL-00123"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password || ""}
                onChange={handleChange("password")}
                placeholder="Create a password"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pr-11 pl-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            value={form.firstName || ""}
            onChange={handleChange("firstName")}
            placeholder="Ada"
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            value={form.lastName || ""}
            onChange={handleChange("lastName")}
            placeholder="Lovelace"
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Country
            </label>
            <select
              id="country"
              value={form.country || "United States"}
              onChange={handleChange("country")}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 pr-8 text-sm text-slate-900 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              <option>United States</option>
              <option>Nigeria</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Ghana</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone || ""}
              onChange={handleChange("phone")}
              placeholder="(201) 555-0123"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email || ""}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password || ""}
              onChange={handleChange("password")}
              placeholder="Create a password"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pr-11 pl-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-100 px-4 py-8 sm:py-12">
      {onBack ? (
        <div className="mb-4 w-full max-w-md sm:mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </button>
        </div>
      ) : null}

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900">
            {mode === "login" ? <Package size={18} className="text-white" strokeWidth={2.5} /> : <CheckCircle2 size={18} className="text-white" strokeWidth={2.5} />}
          </div>
          <span className="text-xl font-bold text-slate-900">DropSync</span>
        </div>

        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">{heading}</h1>
          <p className="text-sm text-slate-500 sm:text-base">{subtitle}</p>
        </div>

        <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleRoleChange(tab.id)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                activeRole === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFields()}

          {error ? <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}
          {success ? <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">{success}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-70"
          >
            {loading ? (mode === "login" ? "Signing in..." : "Submitting...") : submitLabel}
            <ArrowRight size={18} />
          </button>
        </form>

        {onFooterAction ? (
          <p className="mt-6 text-center text-sm text-slate-500">
            {footerText}{" "}
            <button type="button" onClick={onFooterAction} className="font-medium text-amber-500 transition-colors hover:text-amber-600">
              {footerActionText}
            </button>
          </p>
        ) : null}
      </div>
    </div>
  );
}
