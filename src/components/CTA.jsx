import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-900 px-6 py-20 text-center md:px-12">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Simple, pay-as-you-deliver pricing.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-400">
          No contracts, no monthly minimums. Only pay for the deliveries you
          verify.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
        >
          Start Free Trial
        </button>
      </section>
  );
}