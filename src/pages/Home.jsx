import Hero from "../components/Hero";
import ProblemBand from "../components/ProblemBand";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <>
      <Layout>
      <Hero />
      <div id="product">
        <ProblemBand />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <CTA />
      </div>
      </Layout>
    </>
  );
}

