import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisionMission from "@/components/VisionMission";
import SEO from "@/components/SEO";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us | Web Development & AI Automation Company Surat"
        description="DigiScale Infotech is a leading web development and AI software agency in Surat, Gujarat. Learn about our vision, mission, team, and digital solutions."
        path="/about"
        keywords="about digiscale infotech, web development agency surat, software team surat, shopify developers india"
      />
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <VisionMission />
      </main>
      <Footer />
    </div>
  );
}
