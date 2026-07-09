"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CollarScrollAnimation from "@/components/CollarScrollAnimation";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import LiveDashboard from "@/components/LiveDashboard";
import Veterinary from "@/components/Veterinary";
import MobileApp from "@/components/MobileApp";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="relative">
      <ScrollIndicator />
      <Navbar />
      <Hero />
      <CollarScrollAnimation />
      <div style={{ overflowX: "clip" }}>
        <Features />
        <HowItWorks />
        <LiveDashboard />
        <Veterinary />
        <MobileApp />
        <Pricing />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
