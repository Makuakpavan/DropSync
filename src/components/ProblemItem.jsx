export default function ProblemItem({ icon, title, copy }) {
  return (
    <div>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-orange-400">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy}</p>
    </div>
  );
}