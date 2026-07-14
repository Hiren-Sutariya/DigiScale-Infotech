import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "services",
    title: "Services",
    content: `DigiScale Infotech provides custom software development, UI/UX design, web and mobile application development, AI automation, SEO, and SaaS development services. All services are performed according to the scope of work defined in a signed project agreement or statement of work.\n\nWe reserve the right to refuse service to anyone for any reason. The scope, timeline, and deliverables of each project are outlined in a separate agreement executed between DigiScale Infotech and the client.`,
  },
  {
    id: "liability",
    title: "Liability",
    content: `DigiScale Infotech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of our services or any third-party services we integrate.\n\nOur total liability for any claims arising under these terms shall not exceed the total fees paid by you to DigiScale Infotech in the three months preceding the claim. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of our services.`,
  },
  {
    id: "payments",
    title: "Payments",
    content: `Payment terms are specified in each project agreement. Standard payment terms require a 50% upfront deposit before project commencement, with the remaining balance due upon project completion or as specified in milestone-based agreements.\n\nAll invoices are due within 14 days of issuance. Late payments may incur interest charges of 1.5% per month on the outstanding balance. DigiScale Infotech reserves the right to suspend work on projects with overdue payments until the account is settled.`,
  },
  {
    id: "ip",
    title: "Intellectual Property",
    content: `Upon receipt of full payment, the client receives full ownership rights to all custom-developed code, designs, and deliverables created specifically for their project. DigiScale Infotech retains ownership of pre-existing tools, frameworks, libraries, and methodologies used in the development process.\n\nDigiScale Infotech reserves the right to display work in its portfolio unless explicitly restricted by a signed non-disclosure agreement. Any third-party components used in the project are subject to their respective open-source or commercial licenses.`,
  },
  {
    id: "termination",
    title: "Termination",
    content: `Either party may terminate a project agreement with 30 days written notice. In the event of termination, the client is responsible for payment of all work completed up to the termination date, including any non-cancellable third-party costs incurred.\n\nDigiScale Infotech may immediately terminate services in cases of non-payment, breach of these terms, or fraudulent activity. Upon termination, all deliverables completed and paid for will be transferred to the client within 14 days.`,
  },
  {
    id: "contact",
    title: "Contact Details",
    content: `For any questions or concerns regarding these Terms & Conditions, please contact us:\n\nDigiScale Infotech\nEmail: hello@digiscaleinfotech.com\nPhone: +91 98982 13183\nAddress: Surat, Gujarat, India\n\nThese Terms & Conditions were last updated in July 2026 and supersede all prior agreements. We reserve the right to modify these terms at any time with notice provided via email or website posting.`,
  },
];

import SEO from "@/components/SEO";

export default function Terms() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <SEO
        title="Terms & Conditions"
        description="Read the Terms and Conditions of DigiScale Infotech governing the use of our website and services."
        path="/terms"
      />
      <Navbar />

      <section className="pt-28 pb-10 lg:pt-36 bg-accent/20 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-3"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Last updated: June 2026
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
