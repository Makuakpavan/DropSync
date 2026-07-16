import { useState } from "react";
import {
  CheckCircle2,
  LayoutGrid,
  Package,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  PackageSearch,
} from "lucide-react";


//Dashboard
export default function CustomerOverview() {
  const [navOpen, setNavOpen] = useState(false);

  const navItems = [
    { label: "Overview", icon: LayoutGrid, active: true },
    { label: "My Deliveries", icon: Package, active: false },
    { label: "Track a Delivery", icon: MapPin, active: false },
    { label: "Settings", icon: Settings, active: false },
  ];

  const stats = [
    { label: "Active shipments", value: 0 },
    { label: "Delivered", value: 0 },
    { label: "Total shipments", value: 0 },
    { label: "Saved addresses", value: 0 },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-20 flex items-center justify-between bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
            <CheckCircle2 className="h-4 w-4 text-slate-900" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-semibold text-white tracking-tight">DropSync</span>
        </div>
        <button onClick={() => setNavOpen(!navOpen)} className="text-white p-1">
          {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-10 h-full w-60 shrink-0 bg-slate-900 flex flex-col justify-between transition-transform duration-200 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 pt-14 md:pt-0`}
      >
        <div>
          {/* Logo (desktop) */}
          <div className="hidden md:flex items-center gap-2 px-5 py-5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
              <CheckCircle2 className="h-4 w-4 text-slate-900" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold text-white tracking-tight">DropSync</span>
          </div>

          {/* Nav */}
          <nav className="px-3 mt-2 md:mt-0 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold text-slate-900">
              YN
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-white">Your Name</p>
              <p className="text-xs text-slate-400">Customer</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors">
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile nav */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[5] md:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        <div className="px-5 sm:px-8 py-6 sm:py-8 max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Overview</h1>
            <p className="text-sm text-slate-500 mt-0.5">Your delivery activity.</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-slate-200/80 px-4 py-4"
              >
                <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1.5">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Shipments panel */}
          <div className="bg-white rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Your shipments</h2>
              <button className="text-xs font-medium text-amber-600 hover:text-amber-700">
                View all
              </button>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
              <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <PackageSearch className="h-5 w-5 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No deliveries yet</p>
              <p className="text-xs text-slate-400 mt-1">
                They'll show up here once created.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}