import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import Services from "@/components/Services";
import VisionMission from "@/components/VisionMission";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-background overflow-x-clip">
      <SEO
        title="Web Development, AI Automation & Digital Solutions"
        description="DigiScale Infotech builds modern websites, scalable software, AI automation solutions and digital products that help businesses grow."
        path="/"
      />
      <Navbar />
      <Hero />
      <div className="relative z-10 bg-background shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <ScrollTextReveal value="YES, WE CUSTOMIZE SOFTWARE & AI SOLUTIONS TAILORED TO YOUR TECH STACK AND SCALING GOALS." />
        <Services />
        <Portfolio />
        <Process />
        <TechStack />
        <VisionMission />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}