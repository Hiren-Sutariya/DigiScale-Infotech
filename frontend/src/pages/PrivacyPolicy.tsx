import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "collection",
    title: "Information Collection",
    content: `We collect information you provide directly to us when you fill out forms on our website, contact us via email, or engage with our services. This includes your name, email address, phone number, company name, and any project details you share.\n\nWe also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data is collected through cookies and similar tracking technologies.`,
  },
  {
    id: "cookies",
    title: "Cookies",
    content: `We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us understand how you interact with our site.\n\nWe use essential cookies (necessary for the website to function), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings). You can control cookie settings through your browser preferences. Disabling certain cookies may affect website functionality.`,
  },
  {
    id: "usage",
    title: "Data Usage",
    content: `We use the information we collect to provide, maintain, and improve our services; respond to inquiries and provide customer support; send administrative and promotional communications (with your consent); analyze usage patterns to enhance user experience; and comply with legal obligations.\n\nWe do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share aggregate, anonymized data for industry analysis and research.`,
  },
  {
    id: "third-party",
    title: "Third Party Services",
    content: `We may use third-party service providers to assist in delivering our services, including cloud hosting providers, analytics platforms, email marketing tools, and customer relationship management systems. These third parties are bound by confidentiality agreements and are permitted to use your data only to provide services on our behalf.\n\nOur website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.`,
  },
  {
    id: "rights",
    title: "User Rights",
    content: `Depending on your location, you may have certain rights regarding your personal data, including the right to access the personal information we hold about you; the right to request correction of inaccurate data; the right to request deletion of your personal data; the right to object to or restrict certain processing activities; and the right to data portability.\n\nTo exercise any of these rights, please contact us at hello@digiscaleinfotech.com. We will respond to your request within 30 days.`,
  },
  {
    id: "contact",
    title: "Contact Information",
    content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us:\n\nDigiScale Infotech\nEmail: hello@digiscaleinfotech.com\nPhone: +91 98982 13183\nAddress: Surat, Gujarat, India\n\nThis Privacy Policy was last updated in July 2026. We reserve the right to modify this policy at any time. We will notify you of material changes by posting the updated policy on our website.`,
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | DigiScale Infotech";
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col bg-background">
      <Navbar />

      <section className="pt-28 pb-10 lg:pt-36 bg-accent/20 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-3"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Last updated: 6 July 2026
          </motion.p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-3 pb-3 border-b border-border">
                  {s.title}
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {s.content.split("\n\n").map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
