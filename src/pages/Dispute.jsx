import { useState } from "react";
import {
  LayoutGrid,
  Package,
  Send,
  Truck,
  Settings,
  LogOut,
  Menu,
  X,
  AlertTriangle,
} from "lucide-react";

/**
 * DropSync — Disputes page
 * -------------------------------------------------
 * Responsive recreation of the DropSync "Disputes"
 * screen: page header + a single empty-state panel.
 *
 * Reuses the same sidebar shell as the other pages
 * (Disputes marked active here).
 *
 * Dependencies: tailwindcss, lucide-react
 */

const navItems = [
  { label: "Overview", icon: LayoutGrid, active: false },
  { label: "Deliveries", icon: Package, active: false },
  { label: "Disputes", icon: Send, active: true },
  { label: "Drivers", icon: Truck, active: false },
  { label: "Settings", icon: Settings, active: false },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0b1437] transition-transform duration-200 ease-in-out
        lg:static lg:z-auto lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 text-sm font-bold text-white">
              ✓
            </span>
            <span className="text-lg font-semibold text-white">
              DropSync
            </span>
          </div>
          <button
            className="text-slate-400 hover:text-white lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
              ${
                active
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-400 text-sm font-semibold text-white">
              YC
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                Your Company
              </p>
              <p className="truncate text-xs text-slate-400">Company</p>
            </div>
          </div>
          <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white">
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <AlertTriangle className="text-slate-400" size={26} />
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-900">
        No disputes
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Disputes show up here when a delivery is marked incomplete or a
        customer reports a problem.
      </p>
    </div>
  );
}

export default function DropSyncDisputes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur sm:px-8">
          <button
            className="text-slate-500 hover:text-slate-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Disputes
            </h1>
            <p className="text-sm text-slate-500">
              Delivery disputes flagged by customers.
            </p>
          </div>
        </header>

        <main className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <EmptyState />
        </main>
      </div>
    </div>
  );
}