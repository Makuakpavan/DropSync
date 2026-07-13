import {
  Camera,
  PenLine,
  ShieldCheck,
  AlertTriangle,
  ClipboardX,
  ShieldOff,
  CheckCircle2,
  ArrowRight,
  Cat,
  Ban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
   <section className="mx-auto max-w-3xl px-6 pt-14 pb-16 text-center md:pt-20">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
          Every delivery, signed, sealed, and{" "}
          <span className="text-orange-500 underline decoration-2 underline-offset-4">
            verified.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-slate-500 md:text-lg">
          Tamper-proof proof of delivery for high-value shipments. Capture, sign
          and verify every drop with structured, time-stamped records your
          customers can trust.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            // href="#get-started"
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Get Started <ArrowRight size={16} />
          </a>
          <a
            href="#demo"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Book Demo
          </a>
        </div>
      </section>
  );
}