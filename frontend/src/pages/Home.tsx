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
        title="DigiScale Infotech | Web Development, Shopify & AI Automation"
        description="DigiScale Infotech is a leading web development & software company in Surat, India. Custom websites, Shopify stores, AI automations, and mobile apps. Think Digital, Scale Smart."
        path="/"
        keywords="web development company surat, software company surat, shopify developer surat, AI automation surat, custom website design, mobile app development gujarat, digiscale infotech"
        customSchema={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://digiscaleinfotech.com/#localbusiness",
            name: "DigiScale Infotech",
            image: "https://digiscaleinfotech.com/og-image.jpg",
            logo: "https://digiscaleinfotech.com/logo.png",
            description: "DigiScale Infotech builds modern websites, scalable software, custom Shopify stores, AI automation solutions and mobile apps for startups and businesses.",
            url: "https://digiscaleinfotech.com",
            telephone: "+919898213183",
            email: "hello@digiscaleinfotech.com",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Surat",
              addressLocality: "Surat",
              addressRegion: "Gujarat",
              postalCode: "395007",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 21.1702,
              longitude: 72.8311,
            },
            sameAs: [
              "https://www.linkedin.com/company/digiscale-infotech/",
              "https://www.instagram.com/digiscaleinfotech/",
              "https://github.com/DigiScaleInfotech",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What services does DigiScale Infotech offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DigiScale Infotech offers web development, Shopify store development, custom software engineering, AI automation, mobile app development, and UI/UX design.",
                },
              },
              {
                "@type": "Question",
                name: "Where is DigiScale Infotech located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DigiScale Infotech is located in Surat, Gujarat, India. We serve clients locally across India and globally.",
                },
              },
              {
                "@type": "Question",
                name: "Does DigiScale Infotech specialize in AI Automation and Shopify?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we specialize in custom Shopify theme/app development and AI workflow automations tailored for business scaling.",
                },
              },
            ],
          },
        ]}
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