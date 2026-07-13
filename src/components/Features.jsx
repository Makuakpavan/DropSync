import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="bg-slate-50 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Built for e-commerce businesses
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Operations & Business"
              items={[
                "Reduce delivery disputes and chargebacks",
                "Centralize proof records across all carriers",
              ]}
            />
            <FeatureCard
              title="Hold Downs"
              items={[
                "Flag high-risk deliveries automatically",
                "Enforce signature requirements by order value",
              ]}
            />
            <FeatureCard
              title="Final Customers"
              items={[
                "Give customers instant access to delivery proof",
                "Faster resolution when questions come up",
              ]}
            />
          </div>
        </div>
      </section>
  );
}