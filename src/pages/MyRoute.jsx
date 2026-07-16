import {
  FiGrid,
  FiMap,
  FiSettings,
  FiLogOut,
  FiInfo,
  FiPackage,
  FiMenu,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function MyRoute() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* ================= Sidebar ================= */}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#16203B] text-white transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col`}
      >
        {/* Logo */}

        <div className="px-6 py-7 border-b border-slate-700">
          <h1 className="text-xl font-bold">DropSync</h1>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-700">
            <FiGrid />
            Overview
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 bg-amber-400 text-black font-semibold">
            <FiMap />
            My Route
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-700">
            <FiSettings />
            Settings
          </button>
        </nav>

        {/* User */}

        <div className="border-t border-slate-700 p-5">
          <div className="flex items-center gap-3">
            <FaUserCircle size={42} />

            <div>
              <h3 className="font-semibold">Your Name</h3>
              <p className="text-sm text-slate-300">Driver</p>
            </div>
          </div>

          <button className="mt-6 flex items-center gap-3 text-slate-300 hover:text-white">
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= Main ================= */}

      <main className="flex-1 md:ml-0">
        {/* Mobile Header */}

        <header className="md:hidden bg-white px-5 py-4 shadow flex justify-between items-center">
          <h2 className="font-bold text-lg">DropSync</h2>

          <button onClick={() => setOpen(true)}>
            <FiMenu size={24} />
          </button>
        </header>

        <div className="p-6 md:p-10">
          {/* Heading */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              My Route
            </h1>

            <p className="text-slate-500 mt-1">
              Deliver assigned packages to pick up
            </p>
          </div>

          {/* Cards */}

          <div className="space-y-6">
            {/* Card 1 */}

            <div className="bg-white rounded-xl border shadow-sm">
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h2 className="font-semibold">
                  Available to pick up
                </h2>

                <FiInfo className="text-slate-400" />
              </div>

              <div className="py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border flex items-center justify-center text-slate-400">
                  <FiPackage size={28} />
                </div>

                <h3 className="mt-5 font-semibold text-slate-700">
                  No open jobs right now
                </h3>

                <p className="mt-2 text-sm text-slate-400 text-center max-w-md">
                  New scavenger deliveries from your company will show up here.
                </p>
              </div>
            </div>

            {/* Card 2 */}

            <div className="bg-white rounded-xl border shadow-sm">
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h2 className="font-semibold">
                  Completed
                </h2>

                <FiInfo className="text-slate-400" />
              </div>

              <div className="py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border flex items-center justify-center text-slate-400">
                  <FiPackage size={28} />
                </div>

                <h3 className="mt-5 font-semibold text-slate-700">
                  Nothing delivered yet
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Completed jobs will show up here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}