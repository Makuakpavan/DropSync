import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Package,
  Send,
  Truck,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  FolderOpen,
} from "lucide-react";
import { fetchDeliveries } from "../services/api";

/**
 * DropSync — Deliveries page
 * -------------------------------------------------
 * Responsive recreation of the DropSync "Deliveries"
 * screen: filter tabs, "New Delivery" action, and an
 * empty-state panel.
 *
 * Reuses the same sidebar shell as the Overview page
 * (Deliveries marked active here).
 *
 * Dependencies: tailwindcss, lucide-react
 */

const navItems = [
  { label: "Overview", icon: LayoutGrid, active: false },
  { label: "Deliveries", icon: Package, active: true },
  { label: "Dispatches", icon: Send, active: false },
  { label: "Drivers", icon: Truck, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const tabs = [
  { label: "All", count: 0 },
  { label: "Unassigned", count: null },
  { label: "Assigned", count: null },
  { label: "Out for delivery", count: null },
  { label: "Delivered", count: null },
  { label: "Days out", count: null },
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

function FilterTabs() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-wrap items-center gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1.5">
      {tabs.map(({ label, count }) => {
        const isActive = activeTab === label;
        return (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors
            ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            {label}
            {count !== null && (
              <span
                className={`ml-1.5 ${
                  isActive ? "text-white/80" : "text-slate-400"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <FolderOpen className="text-slate-400" size={28} />
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-900">
        No deliveries yet
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        They&apos;ll show up here once created.
      </p>
    </div>
  );
}

export default function DropSyncDeliveries() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadDeliveries = async () => {
      setLoading(true);
      try {
        const response = await fetchDeliveries();
        if (active) {
          setDeliveries(Array.isArray(response) ? response : []);
        }
      } catch {
        if (active) {
          setDeliveries([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDeliveries();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              className="text-slate-500 hover:text-slate-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Deliveries
              </h1>
              <p className="text-sm text-slate-500">
                Every shipment, tracked end to end.
              </p>
            </div>
          </div>

          <button className="hidden shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition-colors hover:bg-orange-600 sm:flex">
            <Plus size={16} />
            New Delivery
          </button>
        </header>

        {/* Mobile-only New Delivery button */}
        <div className="px-4 pt-4 sm:hidden">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition-colors hover:bg-orange-600">
            <Plus size={16} />
            New Delivery
          </button>
        </div>

        <main className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <FilterTabs />
          {loading ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
              Loading deliveries...
            </div>
          ) : deliveries.length > 0 ? (
            <div className="mt-4 space-y-3">
              {deliveries.map((delivery) => (
                <div key={delivery.id || delivery._id || delivery.trackingNumber} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">{delivery.title || delivery.name || "Delivery"}</p>
                  <p className="mt-1 text-sm text-slate-600">{delivery.status || "Pending"}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </div>
  );
}