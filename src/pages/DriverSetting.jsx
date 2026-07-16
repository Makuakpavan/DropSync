import { useState } from "react";
import {
  FiGrid,
  FiMap,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiCamera,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* ================= Sidebar ================= */}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#16203B] text-white transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col`}
      >
        <div className="px-6 py-7 border-b border-slate-700">
          <h1 className="font-bold text-xl">DropSync</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-700 text-slate-300">
            <FiGrid />
            Overview
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-700 text-slate-300">
            <FiMap />
            My Route
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 bg-amber-400 text-black font-semibold">
            <FiSettings />
            Settings
          </button>
        </nav>

        <div className="border-t border-slate-700 p-5">
          <div className="flex items-center gap-3">
            <FaUserCircle size={40} />
            <div>
              <h3 className="font-semibold">Your Name</h3>
              <p className="text-sm text-slate-300">Driver</p>
            </div>
          </div>

          <button className="mt-6 flex items-center gap-2 text-slate-300 hover:text-white">
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}

      {/* ================= Main ================= */}

      <main className="flex-1">
        {/* Mobile Header */}

        <header className="md:hidden bg-white px-5 py-4 flex justify-between items-center shadow">
          <h2 className="font-bold">Settings</h2>

          <button onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {/* Page Header */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Settings
            </h1>

            <p className="text-slate-500">
              Manage your account settings.
            </p>
          </div>

          {/* ================= Profile ================= */}

          <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <FaUserCircle
                  className="text-yellow-400"
                  size={80}
                />

                <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full">
                  <FiCamera size={14} />
                </button>
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  Your Name
                </h2>

                <p className="text-slate-500">
                  Driver
                </p>
              </div>
            </div>

            {/* Form */}

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div>
                <label className="text-sm font-medium">
                  First Name
                </label>

                <input
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  defaultValue="John"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Last Name
                </label>

                <input
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  defaultValue="Doe"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Email
                </label>

                <input
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  defaultValue="john@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Phone
                </label>

                <input
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  defaultValue="+234..."
                />
              </div>
            </div>

            <button className="mt-6 px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
              Save Changes
            </button>
          </div>

          {/* ================= Password ================= */}

          <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
            <h2 className="font-semibold text-lg mb-5">
              Change Password
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium">
                  Current Password
                </label>

                <input
                  type="password"
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium">
                    New Password
                  </label>

                  <input
                    type="password"
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                  />
                </div>
              </div>
            </div>

            <button className="mt-6 px-5 py-3 bg-slate-900 rounded-lg text-white hover:bg-slate-800">
              Update Password
            </button>
          </div>

          {/* ================= Notifications ================= */}

          <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
            <h2 className="font-semibold text-lg mb-5">
              Notifications
            </h2>

            <div className="space-y-4">
              <label className="flex justify-between items-center">
                <span>Email Notifications</span>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5"
                />
              </label>

              <label className="flex justify-between items-center">
                <span>SMS Notifications</span>

                <input
                  type="checkbox"
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>

          {/* ================= Danger Zone ================= */}

          <div className="bg-white rounded-xl border border-red-300 p-6">
            <h2 className="text-red-600 font-semibold text-lg">
              Danger Zone
            </h2>

            <p className="text-slate-500 mt-2">
              Permanently delete your account.
            </p>

            <button className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg">
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}