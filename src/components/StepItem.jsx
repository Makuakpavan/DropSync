function StepItem({ number, icon, title, copy }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
        {icon}
      </div>
      <span className="mt-3 text-xs font-medium text-orange-500">
        Step {number}
      </span>
      <h3 className="mt-1 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-[220px] text-sm text-slate-500">{copy}</p>
    </div>
  );
}