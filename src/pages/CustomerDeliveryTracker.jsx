import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { useAuth } from "../context/useAuth";
import { trackDelivery } from "../services/api";

export default function CustomerDeliveryTracker() {
  const [navOpen, setNavOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Overview", icon: LayoutGrid, to: "/customer-overview" },
    { label: "My Deliveries", icon: Package, to: "/customer-delivery" },
    { label: "Track a Delivery", icon: MapPin, to: "/customer-delivery-tracker" },
    { label: "Settings", icon: Settings, to: "/customer-settings" },
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
        className={`fixed md:sticky top-0 left-0 z-10 h-screen w-60 shrink-0 bg-slate-900 flex flex-col justify-between transition-transform duration-200 ${
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
            {navItems.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
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
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors">
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
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Track a Delivery</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Look up proof of delivery by tracking number.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number, e.g. WB-3829"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
            />
            <button
              onClick={async () => {
                setError("");
                setDelivery(null);
                setLoading(true);

                try {
                  // BACKEND REQUIRED: live tracking lookup for shipment status.
                  const response = await trackDelivery(trackingNumber);
                  setDelivery(response?.data || response || null);
                } catch (err) {
                  setError(err.message || "Unable to retrieve tracking information right now.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || !trackingNumber.trim()}
              className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 transition-colors whitespace-nowrap disabled:opacity-70"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </div>

          {error ? <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}

          <div className="bg-white rounded-xl border border-slate-200/80">
            {delivery ? (
              <div className="p-6 text-sm text-slate-600">
                <p className="text-sm font-semibold text-slate-900">Tracking result</p>
                <p className="mt-2">{delivery.status || "Delivery received"}</p>
                <p className="mt-1">Tracking number: {delivery.trackingNumber || trackingNumber}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <PackageSearch className="h-5 w-5 text-slate-300" />
                </div>
                <p className="text-sm font-semibold text-slate-700">No delivery found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Double-check the tracking number and try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}