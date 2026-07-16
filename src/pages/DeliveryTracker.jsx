import { useState } from "react";
import {
  CheckCircle2,
  Search,
  MapPin,
  Camera,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function DeliveryTracker() {
  const [trackingNumber, setTrackingNumber] = useState("WB-38291");

  const timeline = [
    { label: "Order placed", done: true },
    { label: "Out for delivery", done: true },
    { label: "Delivered", done: true },
  ];

  const info = [
    { label: "Sender", value: "A***a P*****si" },
    { label: "Receiver", value: "Ikeja, Lagos" },
    { label: "Package", value: "C*****g T***e L**p" },
    { label: "Driver", value: "Sam Rivers" },
    { label: "Distance", value: "13 km" },
    { label: "Delivery fee", value: "₦2,650" },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">
      {/* Nav */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900">
              <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-base font-semibold text-slate-900 tracking-tight">DropSync</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-700 hidden sm:inline">
              Sign In
            </a>
            <button className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 transition-colors">
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Track a delivery</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter the tracking number from your order confirmation — no account needed.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-8 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
            />
          </div>
          <button className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 transition-colors whitespace-nowrap">
            Track
          </button>
        </div>

        {/* Status card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100">
            <span className="text-sm font-semibold text-slate-900">{trackingNumber}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium px-2.5 py-1">
              Delivered
            </span>
          </div>

          {/* Timeline */}
          <div className="px-5 sm:px-6 py-6">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1.5 h-px bg-emerald-200" />
              {timeline.map((step) => (
                <div key={step.label} className="relative flex flex-col items-center gap-2 z-10 flex-1">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                  <span className="text-[11px] text-slate-500 text-center whitespace-nowrap">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100 border-y border-slate-100">
            {info.map((item) => (
              <div key={item.label} className="bg-white px-5 sm:px-6 py-3.5">
                <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-white px-5 sm:px-6 py-3.5 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Delivered</p>
            <p className="text-sm font-medium text-slate-900">Jul 1, 2026 &middot; 2:14 PM</p>
          </div>

          {/* Verified proof */}
          <div className="px-5 sm:px-6 pt-5">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 mb-4">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified with 4 of 4 proof methods (1 required)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {/* Signature */}
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-2">Signature</p>
                <div className="h-16 rounded-lg bg-slate-50 flex items-center justify-center">
                  <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
                    <path
                      d="M2 20 Q 10 5, 18 20 T 34 20 T 50 20 T 66 20 T 82 15 T 98 20"
                      stroke="#334155"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Photo */}
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-2">Photo</p>
                <div className="h-16 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Camera className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {/* GPS pin */}
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-2">GPS pin</p>
                <div className="h-16 rounded-lg bg-slate-50 flex flex-col items-center justify-center gap-1">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span className="text-[11px] text-slate-500">Lagos, Nigeria</span>
                </div>
              </div>

              {/* Recipient verified */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 flex items-center justify-center">
                <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Recipient verified
                </p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="px-5 sm:px-6 pb-6">
            <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1.5">Delivery rating</p>
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 italic">
              "Arrived earlier than expected and in perfect condition."
            </p>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-slate-400 mt-6 max-w-lg mx-auto leading-relaxed">
          Once your delivery arrives, you'll be able to rate the driver or report a problem right on this
          page. If your order is linked to a DropSync account, you'll be able to{" "}
          <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
            Sign in
          </a>{" "}
          to keep it tied to your profile.
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            Verified delivery platform
          </span>
          <span className="hidden sm:inline">&middot;</span>
          <span>&copy; 2024 Waybill Logistics. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}