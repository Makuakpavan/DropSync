import { useState } from "react";
import {
  CheckCircle2,
  LayoutGrid,
  Route,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Package,
} from "lucide-react";

/**
 * Overview Page ("DropSync")
 * ---------------------------
 * Responsive recreation of the driver overview / dashboard screen.
 * - Desktop: fixed dark sidebar + scrollable content column
 * - Tablet/Mobile: sidebar collapses behind a hamburger drawer,
 *   stat grids reflow from 4 -> 2 -> 1 columns as the viewport narrows
 */

const navItems = [
  { label: "Overview", icon: LayoutGrid },
  { label: "My Route", icon: Route },
  { label: "Settings", icon: SettingsIcon },
];

function Sidebar({ activeItem, setActiveItem, open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#12142B] text-slate-300 flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between px-6 py-6">
            <span className="flex items-center gap-2 text-white font-semibold text-lg tracking-tight">
              <CheckCircle2 size={18} className="text-orange-500" />
              DropSync
            </span>
            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-2 px-3 space-y-1">
            {navItems.map(({ label, icon: Icon }) => {
              const isActive = activeItem === label;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setActiveItem(label);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-3 pb-6">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 mb-2">
            <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              YN
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Your Name
              </p>
              <p className="text-xs text-slate-400 truncate">Driver</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-slate-300 text-sm hover:bg-white/5">
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-2xl font-semibold text-slate-900 mt-1.5">{value}</p>
      {hint && <p className="text-xs text-emerald-600 mt-1">{hint}</p>}
    </div>
  );
}

export default function OverviewPage() {
  const [activeItem, setActiveItem] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [available, setAvailable] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 sm:px-8 py-5 bg-white border-b border-slate-200 sticky top-0 z-20">
          <button
            className="lg:hidden text-slate-600"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
              Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              Today's route at a glance
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-8 py-6 sm:py-8 max-w-5xl mx-auto space-y-5">
          {/* Availability */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Availability
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Set whether you're available to be assigned new deliveries,
                or toggle your route as unavailable.
              </p>
            </div>
            <button
              onClick={() => setAvailable((a) => !a)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors
                ${
                  available
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  available ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
              {available ? "Available — go offline" : "Offline — go available"}
            </button>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Delivered today" value="0" />
            <StatCard label="Remaining stops" value="0" />
            <StatCard label="Completed" value="0" hint="No missed stops yet" />
            <StatCard label="Income" value="$0.00" />
          </section>

          {/* Next stops */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">
                Next stops
              </h2>
              <button className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Open route
              </button>
            </div>
            <div className="flex flex-col items-center justify-center text-center py-12 px-6">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Package size={20} className="text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                No deliveries yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                They'll show up here once new ones arrive
              </p>
            </div>
          </section>

          {/* Bottom stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard label="Available to pick up" value="0" />
            <StatCard label="New assignments" value="0" />
          </section>
        </main>
      </div>
    </div>
  );
}