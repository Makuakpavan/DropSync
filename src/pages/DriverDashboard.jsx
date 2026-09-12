import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Package,
  Send,
  Truck,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  PackageOpen,
} from "lucide-react";
import { useAuth } from "../context/useAuth";

/**
 * DropSync — Overview Dashboard
 * -------------------------------------------------
 * A responsive recreation of the DropSync delivery
 * management "Overview" screen.
 *
 * - Sidebar collapses into a slide-in drawer on mobile
 *   (toggled by a hamburger button in the top bar).
 * - Stat cards reflow from a 4-col grid on desktop
 *   down to 1-col on small screens.
 * - Empty-state "Recent activity" panel matches the
 *   original illustration + CTA layout.
 *
 * Dependencies: tailwindcss, lucide-react
 */

const navItems = [
  { label: "Overview", icon: LayoutGrid, to: "/driver-dashboard" },
  { label: "Deliveries", icon: Package, to: "/driver-deliveries" },
  { label: "Dispatches", icon: Send, to: "/available-drivers" },
  { label: "Drivers", icon: Truck, to: "/available-drivers" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

const stats = [
  {
    label: "Total Deliveries",
    value: "0",
    sub: null,
  },
  {
    label: "In Progress",
    value: "0",
    sub: "0 drivers available",
    subColor: "text-slate-400",
  },
  {
    label: "Delivery Success Rate",
    value: "0%",
    sub: "Verified with photo + signature",
    subColor: "text-emerald-500",
  },
  {
    label: "Deliveries Flagged",
    value: "0",
    sub: "All clear",
    subColor: "text-rose-500",
  },
];

function Sidebar({ open, onClose, onLogout }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col bg-[#0b1437] transition-transform duration-200 ease-in-out
        lg:sticky lg:top-0 lg:z-auto lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
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

        {/* Nav */}
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
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
          <button
          onClick={onLogout} className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white">
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

function StatCard({ label, value, sub, subColor }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      {sub && (
        <p className={`mt-1 text-xs font-medium ${subColor ?? "text-slate-400"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Recent activity
        </h2>
        <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700">
          View all
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center rounded-lg bg-slate-50 px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
          <PackageOpen className="text-orange-400" size={28} />
        </div>
        <h3 className="mt-5 text-base font-semibold text-slate-900">
          No deliveries yet
        </h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          They&apos;ll show up here once created. Once you start moving
          freight, your live feed will populate here.
        </p>
        <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition-colors hover:bg-orange-600">
          Create Your First Delivery
        </button>
      </div>
    </div>
  );
}

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (mobile hamburger + title) */}
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
              Overview
            </h1>
            <p className="text-sm text-slate-500">
              Here&apos;s how deliveries are moving today.
            </p>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Recent activity */}
          <RecentActivity />
        </main>
      </div>
    </div>
  );
}