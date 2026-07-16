import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Info } from "lucide-react";

export default function CompanyVerificationPage() {
  const navigate = useNavigate();
  const [role] = useState("company");
  const [code, setCode] = useState("");

  const tabs = [
    { id: "company", label: "Company" },
    { id: "driver", label: "Driver" },
    { id: "customer", label: "Customer" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#e9eaea] flex flex-col">
      {/* Back to home */}
      <div className="p-4 sm:p-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </button>
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
            <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
              Verify your details so we can activate your account.
            </p>
          </div>

          {/* Role tabs (disabled at this step, Company active) */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1 mb-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                disabled
                className={`text-xs font-medium py-1.5 rounded-md transition-colors cursor-default ${
                  role === tab.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-1.5">
            <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-slate-900" />
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-5">
            Step 2 of 3 &middot; Verify your details
          </p>

          {/* Info banner */}
          <div className="flex gap-2.5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3.5 mb-5">
            <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              We've sent a 6-digit code to{" "}
              <span className="font-medium text-slate-700">company@gmail.com</span>. Enter it
              below to verify your account — that's all we need from a business to get started.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            className="space-y-1.5"
          >
            <label htmlFor="code" className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
              Verification code
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="6-digit code"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-center tracking-[0.3em] text-slate-900 placeholder:tracking-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
            />
            <div className="text-right">
              <button type="button" className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                Resend code
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => navigate("/company-signup")}
                className="flex-1 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium py-2.5 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 transition-colors"
              >
                Create account
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <p className="text-center text-xs text-slate-500 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}