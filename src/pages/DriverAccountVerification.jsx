import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

/**
 * DropSync — Create Account (Step 2 of 3: Verify your details)
 * Pixel-faithful recreation of the provided design, built responsive
 * mobile-first with Tailwind CSS.
 */

export default function CreateAccount() {
    const navigate = useNavigate();
  const [accountType, setAccountType] = useState("broker"); // "company" | "broker" | "customer"
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const tabs = [
    { id: "company", label: "Company" },
    { id: "broker", label: "Broker" },
    { id: "customer", label: "Customer" },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center px-4 py-6 sm:py-10">
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        {/* Logo / brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-900">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </span>
          <span className="font-semibold text-slate-900 text-sm sm:text-base tracking-tight">
            DropSync
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
            Create your account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Verify your details so we can activate your account
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAccountType(tab.id)}
              className={`text-[11px] sm:text-xs font-medium py-2 rounded-md transition-colors ${
                accountType === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Step indicator */}
        <p className="text-[11px] sm:text-xs font-medium text-slate-400 mb-4 tracking-wide">
          STEP 2 OF 3 — VERIFY YOUR DETAILS
        </p>

        <form className="space-y-4">
          {/* Email verification code */}
          <div>
            <label
              htmlFor="emailCode"
              className="block text-[11px] sm:text-xs font-medium text-slate-600 mb-1.5"
            >
              Email verification code
            </label>
            <input
              id="emailCode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              placeholder="••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
            />
            <p className="mt-1 text-[10px] sm:text-[11px] text-slate-400">
              Enter the code sent to your email
            </p>
          </div>

          {/* Phone verification code */}
          <div>
            <label
              htmlFor="phoneCode"
              className="block text-[11px] sm:text-xs font-medium text-slate-600 mb-1.5"
            >
              Phone verification code
            </label>
            <input
              id="phoneCode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              placeholder="••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
            />
            <p className="mt-1 text-[10px] sm:text-[11px] text-slate-400">
              Enter the code sent to your phone
            </p>
          </div>

          {/* License + Plate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="license"
                className="block text-[11px] sm:text-xs font-medium text-slate-600 mb-1.5"
              >
                Driver's license number
              </label>
              <input
                id="license"
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="DL-XXXXXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="plate"
                className="block text-[11px] sm:text-xs font-medium text-slate-600 mb-1.5"
              >
                Plate number
              </label>
              <input
                id="plate"
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="ABC-123-XY"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Verify and Create Account
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-slate-900 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}