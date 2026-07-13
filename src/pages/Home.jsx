import React from "react";
import {
  Camera,
  PenLine,
  ShieldCheck,
  AlertTriangle,
  ClipboardX,
  ShieldOff,
  CheckCircle2,
  ArrowRight,
  Cat,
  Ban,
} from "lucide-react";
// import { Features } from "tailwindcss";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
//import ProblemSection from "../components/ProblemSection";
import ProblemBand from "../components/ProblemBand";
import Features from "../components/Features";
// import BuiltFor from "../components/BuiltFor";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemBand />
      <Features />
      {/* <BuiltFor /> */}
      <CTA />
      <Footer />
    </>
  );
}




// export default function DropSyncLanding() {
//   return (
//     <div className="min-h-screen bg-white font-sans text-slate-900">
//       {/* ---------- Nav ---------- */}
//       <Header />

//       {/* ---------- Hero ---------- */}
//       <Hero />

//       {/* ---------- Problem band ---------- */}
//       < ProblemBand />

//       {/* ---------- Three steps ---------- */}
      

//       {/* ---------- Built for e-commerce ie features---------- */}
//       <Features />

//       {/* ---------- Pricing CTA ie CTA ---------- */}
//       <CTA />

//       {/* ---------- Footer ---------- */}
//       <Footer />
//     </div>
//   );
//}

/* ---------- Sub-components ---------- */

//<ProblemItem />

//<StepItem />

//<FeatureCard />
