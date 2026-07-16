import { useState } from "react";
import { Check, ArrowLeft, ChevronDown } from "lucide-react";

/**
 * DropSync — Create Account (Step 1: choose account type + sign up)
 * Pixel-faithful recreation of the provided design, built responsive
 * mobile-first with Tailwind CSS. Uses a monospace type system to match
 * the source design's distinctive typewriter-style heading and labels.
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

export default function CustomerCreateAccount() {
  const [accountType, setAccountType] = useState("customer"); // "company" | "driver" | "customer"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
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
            Create your account
          </h1>
          <p className="mt-1.5 text-[11px] sm:text-xs text-slate-400">
            Choose your account type to get started.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAccountType(tab.id)}
              className={`text-[11px] sm:text-xs font-bold py-2 rounded-md transition-colors ${
                accountType === tab.id
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Google sign up */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors mb-5"
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <span className="flex-1 h-px bg-slate-200" />
          <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-400 whitespace-nowrap">
            OR SIGN UP WITH EMAIL
          </span>
          <span className="flex-1 h-px bg-slate-200" />
        </div>

        <form className="space-y-4">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-[10px] sm:text-[11px] font-bold text-slate-500 mb-1.5 tracking-wide"
            >
              FULL NAME
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Cooper"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] sm:text-[11px] font-bold text-slate-500 mb-1.5 tracking-wide"
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
            />
          </div>

          {/* Delivery address */}
          <div>
            <label
              htmlFor="address"
              className="block text-[10px] sm:text-[11px] font-bold text-slate-500 mb-1.5 tracking-wide"
            >
              DELIVERY ADDRESS
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, City, State"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-[10px] sm:text-[11px] font-bold text-slate-500 mb-1.5 tracking-wide"
            >
              PHONE
            </label>
            <div className="flex items-stretch w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-300 transition-colors">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2.5 border-r border-slate-200 text-xs sm:text-sm text-slate-700 shrink-0"
              >
                <span aria-hidden="true">🇳🇬</span>
                <span>+234</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="803 000 0000"
                className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-[10px] sm:text-[11px] font-bold text-slate-500 mb-1.5 tracking-wide"
            >
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white text-xs sm:text-sm font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors mt-2"
          >
            Create account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[11px] sm:text-xs text-slate-400 mt-5">
          Already have an account?{" "}
          <a href="#" className="text-amber-500 font-bold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}