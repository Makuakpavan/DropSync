import { useState } from "react";
import {
  LayoutGrid,
  Package,
  Truck,
  UserCircle2,
  Settings as SettingsIcon,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

/**
 * Settings Page
 * -------------
 * Responsive recreation of the "Employdge" account settings screen.
 * - Desktop: fixed dark sidebar + scrollable content column
 * - Tablet/Mobile: sidebar collapses behind a hamburger drawer, form grids stack to 1 column
 */

const navItems = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Deliveries", icon: Package },
  { label: "Shipdules", icon: Truck },
  { label: "Drivers", icon: UserCircle2 },
  { label: "Settings", icon: SettingsIcon },
];

function Sidebar({ activeItem, setActiveItem, open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
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
            <span className="text-white font-semibold text-lg tracking-tight">
              Employdge
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
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5">
            <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              YC
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Your Company
              </p>
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200">
                <LogOut size={12} />
                Log out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Card({ title, description, children }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {(title || description) && (
        <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
          {title && (
            <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
      )}
      <div className="px-5 sm:px-6 py-6">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent";

export default function SettingsPage() {
  const [activeItem, setActiveItem] = useState("Settings");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({
    companyName: "Your Company",
    businessEmail: "you@yourcompany.com",
    phone: "+1 (555) 000-0000",
    industry: "E-commerce",
    address: "",
  });

  const [notifications, setNotifications] = useState({
    statusChange: true,
    deliveryDisputed: true,
  });

  const updateProfile = (key) => (e) =>
    setProfile((p) => ({ ...p, [key]: e.target.value }));

  const toggleNotification = (key) => () =>
    setNotifications((n) => ({ ...n, [key]: !n[key] }));

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
        <header className="flex items-center justify-between px-4 sm:px-8 py-5 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden text-slate-600"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
                Settings
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 truncate">
                Manage your profile and account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              className="text-slate-400 hover:text-slate-600"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>
            <button
              className="text-slate-400 hover:text-slate-600"
              aria-label="Help"
            >
              <HelpCircle size={19} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 sm:px-8 py-6 sm:py-8 max-w-4xl mx-auto space-y-6">
          {/* Company identity strip */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
              YC
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Your Company
              </p>
              <p className="text-xs text-slate-500">Company Account</p>
            </div>
          </div>

          {/* Edit profile */}
          <Card
            title="Edit profile"
            description="Update your account details"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Company Name">
                <input
                  className={inputClass}
                  value={profile.companyName}
                  onChange={updateProfile("companyName")}
                />
              </Field>
              <Field label="Business Email">
                <input
                  type="email"
                  className={inputClass}
                  value={profile.businessEmail}
                  onChange={updateProfile("businessEmail")}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  className={inputClass}
                  value={profile.phone}
                  onChange={updateProfile("phone")}
                />
              </Field>
              <Field label="Industry">
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-9`}
                    value={profile.industry}
                    onChange={updateProfile("industry")}
                  >
                    <option>E-commerce</option>
                    <option>Logistics</option>
                    <option>Retail</option>
                    <option>Manufacturing</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Business Address">
                  <input
                    className={inputClass}
                    placeholder="Enter your full business address"
                    value={profile.address}
                    onChange={updateProfile("address")}
                  />
                </Field>
              </div>
            </div>

            <button className="mt-6 w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#12142B] text-white text-sm font-medium hover:bg-[#1c1f3d] transition-colors">
              Save changes
            </button>
          </Card>

          {/* Change password */}
          <Card
            title="Change password"
            description="Choose a new password for your account"
          >
            <div className="space-y-5">
              <Field label="Current Password">
                <input type="password" className={inputClass} placeholder="••••••••" />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="New Password">
                  <input type="password" className={inputClass} placeholder="••••••••" />
                </Field>
                <Field label="Confirm New Password">
                  <input type="password" className={inputClass} placeholder="••••••••" />
                </Field>
              </div>
            </div>

            <button className="mt-6 w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium hover:bg-slate-50 transition-colors">
              Update password
            </button>
          </Card>

          {/* Notifications */}
          <Card
            title="Notifications"
            description="Choose how you'd like to hear about delivery updates"
          >
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.statusChange}
                  onChange={toggleNotification("statusChange")}
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                />
                Email me on every status change
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.deliveryDisputed}
                  onChange={toggleNotification("deliveryDisputed")}
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                />
                Alert me when a delivery is disputed
              </label>
            </div>
          </Card>

          {/* Log out */}
          <section className="bg-rose-50 rounded-xl border border-rose-100 px-5 sm:px-6 py-6">
            <h2 className="text-base font-semibold text-rose-600">Log out</h2>
            <p className="text-sm text-rose-500/80 mt-0.5 mb-4">
              Sign out of your Employdge account on this device.
            </p>
            <button className="px-5 py-2.5 rounded-lg bg-rose-100 text-rose-600 text-sm font-medium hover:bg-rose-200 transition-colors">
              Log out
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}