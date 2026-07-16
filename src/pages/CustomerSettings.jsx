import { useState } from "react";
import {
  CheckCircle2,
  LayoutGrid,
  Package,
  MapPin,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function CustomerSettings() {
  const [navOpen, setNavOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(true);

  const navItems = [
    { label: "Overview", icon: LayoutGrid, active: false },
    { label: "My Deliveries", icon: Package, active: false },
    { label: "Track a Delivery", icon: MapPin, active: false },
    { label: "Settings", icon: SettingsIcon, active: true },
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
          <div className="hidden md:flex items-center gap-2 px-5 py-5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
              <CheckCircle2 className="h-4 w-4 text-slate-900" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold text-white tracking-tight">DropSync</span>
          </div>

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

      {navOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[5] md:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        <div className="px-5 sm:px-8 py-6 sm:py-8 max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Settings</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage your profile and account.</p>
          </div>

          {/* Profile summary */}
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-slate-900 shrink-0">
              YN
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Your Name</p>
              <p className="text-xs text-slate-500">Customer Account</p>
            </div>
          </div>

          {/* Edit profile */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-slate-900">Edit profile</h2>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">Update your account details.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
                  Full name
                </label>
                <input
                  defaultValue="Your Name"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
                  Delivery address
                </label>
                <textarea
                  rows={1}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                />
              </div>
            </div>

            <button className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 transition-colors">
              Save changes
            </button>
          </div>

          {/* Change password */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-slate-900">Change password</h2>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Choose a new password for your account.
            </p>

            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
                  Current password
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
                    New password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-wide text-slate-600 uppercase mb-1.5">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
                  />
                </div>
              </div>
            </div>

            <button className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 transition-colors">
              Update password
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Choose how you'd like to hear about delivery updates.
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={() => setNotifyEmail(!notifyEmail)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
                />
                Email me on every status change
              </label>
              <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifySms}
                  onChange={() => setNotifySms(!notifySms)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
                />
                Text me when my delivery is out for delivery
              </label>
            </div>
          </div>

          {/* Log out (danger) */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-red-600">Log out</h2>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Sign out of your DropSync account on this device.
            </p>
            <button className="rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-5 py-2.5 transition-colors">
              Log out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}