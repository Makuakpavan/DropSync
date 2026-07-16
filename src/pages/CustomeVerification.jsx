import { useRef, useState } from "react";
import { Check, ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * DropSync — Create Account (Step 2 of 2: Verify your details)
 * Pixel-faithful recreation of the provided design, built responsive
 * mobile-first with Tailwind CSS. Shares the monospace type system used
 * across the DropSync sign-up flow, with a real 6-box OTP input.
 */

export default function VerifyAccount() {
  const navigate = useNavigate();
  const [accountType] = useState("customer"); // "company" | "driver" | "customer"
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const tabs = [
    { id: "company", label: "Company" },
    { id: "driver", label: "Driver" },
    { id: "customer", label: "Customer" },
  ];

  const handleChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(6).fill("");
    pasted.split("").forEach((d, i) => (next[i] = d));
    setDigits(next);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

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
            Create your account
          </h1>
          <p className="mt-1.5 text-[11px] sm:text-xs text-slate-400">
            Verify your details so we can activate your account.
          </p>
        </div>

        {/* Tabs (read-only at this step) */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1 mb-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`text-center text-[11px] sm:text-xs font-bold py-2 rounded-md ${
                accountType === tab.id
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-400"
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-3">
          <span className="flex-1 h-1 rounded-full bg-slate-900" />
          <span className="flex-1 h-1 rounded-full bg-slate-900" />
        </div>

        {/* Step indicator */}
        <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-4 tracking-wide">
          STEP 2 OF 2 — VERIFY YOUR DETAILS
        </p>

        {/* Info banner */}
        <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 mb-5">
          <Info className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
            We've sent a 6-digit code to your email. Enter it below to verify
            your account.
          </p>
        </div>

        <form>
          {/* Verification code */}
          <div className="mb-2">
            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 mb-1.5 tracking-wide">
              VERIFICATION CODE
            </label>
            <div className="flex items-center justify-between gap-2 border border-slate-200 rounded-lg px-3 py-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  aria-label={`Digit ${index + 1} of verification code`}
                  className="w-8 sm:w-9 text-center text-base sm:text-lg font-bold text-slate-900 bg-transparent border-b-2 border-slate-200 focus:outline-none focus:border-slate-900 transition-colors"
                  placeholder="0"
                />
              ))}
            </div>
          </div>

          {/* Resend code */}
          <div className="text-center mb-5">
            <button
              type="button"
              className="text-[11px] sm:text-xs font-bold text-amber-500 hover:underline"
            >
              Resend code
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white text-xs sm:text-sm font-bold py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Create account
            </button>
          </div>
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