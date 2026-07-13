export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-slate-400 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-base font-bold text-white">DropSync</span>
            <p className="mt-1 text-xs">
              © {new Date().getFullYear()} DropSync. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#product" className="hover:text-white">Product</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#privacy" className="hover:text-white">Privacy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
  );
}