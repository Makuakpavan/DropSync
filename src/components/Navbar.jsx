// //navbar / header component

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate("/");
  };

  return (
    <header
      className={`flex fixed top-0 left-0 right-0 items-center justify-between px-6 py-3 md:px-12 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-slate-900/7"
      }`}
    >
      <button onClick={() => navigate("/")} className="text-left text-lg font-bold tracking-tight text-slate-900">
        DropSync
      </button>

      <nav
        className={`hidden items-center gap-8 text-sm md:flex transition-colors duration-300 ${
          scrolled ? "text-slate-700" : "text-slate-600"
        }`}
      >
        <button onClick={() => scrollToSection("product")} className="hover:text-slate-900">
          how it works
        </button>
        <button onClick={() => scrollToSection("pricing")} className="hover:text-slate-900">
          who its for
        </button>
        <button onClick={() => navigate("/delivery-tracker")} className="hover:text-slate-900">
          Track
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className={`hidden text-sm hover:text-slate-900 md:inline transition-colors duration-300 ${
            scrolled ? "text-slate-700" : "text-slate-600"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}