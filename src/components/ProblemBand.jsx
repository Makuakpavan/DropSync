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
import ProblemItem from "./ProblemItem";

export default function ProblemBand() {
    return (
        <section className="bg-slate-900 px-6 py-14 md:px-12">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
            <ProblemItem
                icon={<AlertTriangle size={18} />}
                title="Delivery disputes"
                copy="Customers claim non-delivery, and you have no proof to fall back on when it matters most."
            />
            <ProblemItem
                icon={<ClipboardX size={18} />}
                title="Manual processes"
                copy="Paper logs and scattered photos slow your team down and go missing when you need them."
            />
            <ProblemItem
                icon={<ShieldOff size={18} />}
                title="Fraud reduction"
                copy="Without verified timestamps and signatures, fraudulent claims are hard to catch and costly."
            />
            </div>
        </section>
    );
};