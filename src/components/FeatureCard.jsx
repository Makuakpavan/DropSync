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

export default function FeatureCard({ title, items }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}