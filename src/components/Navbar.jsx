//navbar / header component
export default function Navbar() {
  return (
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <span className="text-lg font-bold tracking-tight">DropSync</span>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a href="#product" className="hover:text-slate-900">how it works</a>
          <a href="#pricing" className="hover:text-slate-900">who its for</a>
          <a href="#team" className="hover:text-slate-900">Track</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#signin" className="hidden text-sm text-slate-600 hover:text-slate-900 md:inline">
            Sign In
          </a>
          <a
            href="#get-started"
            className="rounded-full bg-orange-300 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            Get Started
          </a>
        </div>
      </header>
  );
}