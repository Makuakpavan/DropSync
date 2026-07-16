import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const goToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate("/");
  };

  return (
    <footer className="bg-slate-950 px-6 py-10 text-slate-400 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-base font-bold text-white">DropSync</span>
            <p className="mt-1 text-xs">
              © {new Date().getFullYear()} DropSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}