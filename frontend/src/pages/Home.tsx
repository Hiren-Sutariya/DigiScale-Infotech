import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { lenis } from "@/lib/lenis";

export default function Home() {
  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => {
        lenis.scrollTo("#contact", { offset: -100 });
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col bg-background">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Services />
      <Portfolio />
      <Process />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}