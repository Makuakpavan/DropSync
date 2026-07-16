import { useState } from "react";
import { Check, ArrowLeft, Mail, Lock, ShieldCheck, LogIn } from "lucide-react";

/**
 * DropSync — Sign in ("Welcome back") with Google option
 * Pixel-faithful recreation of the provided design, built responsive
 * mobile-first with Tailwind CSS. Shares the monospace type system used
 * across the DropSync auth flow.
 */

function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.5c-2 1.5-4.6 2.5-7.5 2.5-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.3 5.9l6.5 5.5C40.9 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function CustomerSigninPage() {
  const [accountType, setAccountType] = useState("customer"); // "company" | "driver" | "customer"
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

          {/* Google sign in */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <GoogleIcon />
            Sign in with Google
          </button>
        </form>

        {/* Sign up prompt */}
        <p className="text-center text-[11px] sm:text-xs text-slate-400 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-amber-500 font-bold hover:underline">
            Sign up
          </a>
        </p>

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