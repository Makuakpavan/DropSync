// export default function VerificationPage() {
//   return (
    
//   );
// }
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ShieldCheck, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { verifyAccount } from "../services/api";

export default function VerificationPage() {
  const navigate = useNavigate();
  const email = "john.doe@email.com";
  const CODE_LENGTH = 6;
  const RESEND_SECONDS = 45;

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleChange = (index) => (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      const next = [...code];
      next[index] = "";
      setCode(next);
      return;
    }
    const chars = value.split("");
    const next = [...code];
    let i = index;
    for (const ch of chars) {
      if (i >= CODE_LENGTH) break;
      next[i] = ch;
      i++;
    }
    setCode(next);
    const nextIndex = Math.min(index + chars.length, CODE_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index) => (e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const next = [...code];
      next[index - 1] = "";
      setCode(next);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setCode(next);
    const lastIndex = Math.min(pasted.length, CODE_LENGTH) - 1;
    inputRefs.current[lastIndex >= 0 ? lastIndex : 0]?.focus();
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    setCode(Array(CODE_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  const isComplete = code.every((c) => c !== "");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isComplete) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await verifyAccount({ code: code.join("") });
      setSuccess(response?.message || "Account verified successfully.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Unable to verify your account right now.");
    } finally {
      setLoading(false);
    }
  };

  const steps = ["Personal", "Verify", "Complete"];
  const activeStep = "Complete";

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center px-4 py-8 sm:py-12">
      {/* Back to home */}
      <div className="w-full max-w-md mb-4 sm:mb-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-900 hover:text-slate-700 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
            <Box size={18} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-bold text-slate-900">DropSync</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Check your identity
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            This helps keep your account secure.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {steps.map((step) => (
            <div
              key={step}
              className={`flex-1 text-center text-sm font-medium py-2.5 rounded-lg transition-all ${
                step === activeStep
                  ? "bg-white text-slate-900 font-semibold shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 rounded-full transition-all"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Step 3 of 3 <span className="mx-1">&middot;</span>
          <span className="text-slate-400">Complete verification</span>
        </p>

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={16} className="text-slate-900" />
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            We&apos;ve sent a 6-digit code to your email address
            <br />
            <span className="font-semibold text-slate-900">{email}</span>
          </p>
        </div>

        {/* Code input */}
        <form onSubmit={handleVerify}>
          <label className="block text-xs font-semibold tracking-wide text-slate-700 mb-3">
            ENTER VERIFICATION CODE
          </label>
          <div className="flex gap-2 sm:gap-3 mb-4">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={CODE_LENGTH}
                value={digit}
                onChange={handleChange(i)}
                onKeyDown={handleKeyDown(i)}
                onPaste={handlePaste}
                className="w-full aspect-square min-w-0 rounded-xl border border-slate-200 text-center text-lg font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />
            ))}
          </div>

          {/* Resend */}
          <div className="text-center mb-6">
            {secondsLeft > 0 ? (
              <p className="text-sm font-medium text-amber-500">
                Resend code in {formatTime(secondsLeft)}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-medium text-amber-500 hover:text-amber-600 transition-colors"
              >
                Resend code
              </button>
            )}
          </div>

          {error ? <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}
          {success ? <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">{success}</p> : null}

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full border border-slate-200 text-slate-900 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isComplete || loading}
              className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
            >
              {loading ? "Verifying..." : "Verify account"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Having trouble?{" "}
          <button
            type="button"
            className="text-amber-500 font-medium hover:text-amber-600 transition-colors"
          >
            Get help
          </button>
        </p>
      </div>
    </div>
  );
}
