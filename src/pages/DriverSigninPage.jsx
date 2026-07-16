import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft, Mail, Lock, ShieldCheck, LogIn } from "lucide-react";

/**
 * DropSync — Sign in ("Welcome back")
 * Pixel-faithful recreation of the provided design, built responsive
 * mobile-first with Tailwind CSS. Shares the monospace type system used
 * across the DropSync auth flow.
 */

export default function DriverSigninPage() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("driver"); // "company" | "driver" | "customer"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const tabs = [
    { id: "company", label: "Company" },
    { id: "driver", label: "Driver" },
    { id: "customer", label: "Customer" },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center px-4 py-6 sm:py-10 font-mono">
      {/* Back link */}
      <div className="w-full max-w-md mb-3 sm:mb-4">
        <button
        onClick={() => navigate(-1)}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        {/* Logo / brand */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-900">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </span>
          <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
            DropSync
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1.5 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
            Enter your credentials to access the logistics dashboard.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAccountType(tab.id)}
              className={`text-[10px] sm:text-[11px] font-bold py-2 rounded-md tracking-wide transition-colors ${
                accountType === tab.id
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="email"
                className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wide"
              >
                EMAIL ADDRESS
              </label>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 tracking-wide">
                REQUIRED
              </span>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wide"
              >
                PASSWORD
              </label>
              <a
                href="#"
                className="text-[10px] sm:text-[11px] font-bold text-amber-500 hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors mt-2"
          >
            Sign in to Dashboard
            <LogIn className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Divider */}
        <div className="h-px bg-slate-100 my-5" />

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[9px] sm:text-[10px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            SSL Encryption Active
          </span>
          <span className="text-slate-300">•</span>
          <span>v2.4.0 Stable</span>
          <span className="text-slate-300">•</span>
          <span>© 2024 Waybill Logistics. Precise. Utilitarian. Verifiable.</span>
        </div>
      </div>
    </div>
  );
}