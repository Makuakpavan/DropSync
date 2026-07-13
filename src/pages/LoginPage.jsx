import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Mail, Lock, ArrowRight, ShieldCheck, Tag, Copyright } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState("company");
  const navigate = useNavigate();

  const tabs = [
    { id: "company", label: "Company" },
    { id: "driver", label: "Driver" },
    { id: "customer", label: "Customer" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#eceeec] flex flex-col">
      {/* Back to home */}
      <div className="p-4 sm:p-6">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </a>
      </div>

      {/* Card container */}
      <div className="flex-1 flex items-start sm:items-center justify-center px-4 pb-10 sm:pb-16">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900">
              <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-semibold text-slate-900 tracking-tight">DropSync</span>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
              Enter your credentials to access the logistics
              <br className="hidden sm:block" /> dashboard.
            </p>
          </div>

          {/* Role tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRole(tab.id)}
                className={`text-xs font-medium py-1.5 rounded-md transition-colors ${
                  role === tab.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="email" className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                  Email address
                </label>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide">Required</span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                  Password
                </label>
                <a href="#" className="text-xs text-amber-600 hover:text-amber-700">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 transition-colors"
            >
              Sign in to Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] uppercase tracking-wide text-slate-400 whitespace-nowrap">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <GoogleIcon />
            Sign in with Google
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-6 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            SSL Encryption Active
          </span>
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3 w-3" />
            v2.4.0 Stable
          </span>
          <span className="inline-flex items-center gap-1">
            <Copyright className="h-3 w-3" />
            2024 Waybill Logistics. Precise. Utilitarian. Verifiable.
          </span>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.1-5.1l-6.5-5.5C29.6 35.4 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.9 39.7 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4 5.5l6.5 5.5C41.9 35.9 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}