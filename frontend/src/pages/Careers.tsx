import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ApplyJobModal from "@/components/career/ApplyJobModal";
import SEO from "@/components/SEO";

const openings = [
  {
    title: "Python Developer",
    experience: "0 – 2 Years",
    location: "Surat / Remote",
    type: "Full-time",
    description:
      "Build AI tools, automation systems, APIs, and scalable backend applications.",
    subject: "Application for Python Developer",
  },
  {
    title: "Graphic Designer",
    experience: "0 – 2 Years",
    location: "Surat",
    type: "Full-time",
    description:
      "Design branding, social media creatives, UI assets, and marketing visuals.",
    subject: "Application for Graphic Designer",
  },
  {
    title: "HR Executive",
    experience: "0 – 2 Years",
    location: "Surat",
    type: "Full-time",
    description:
      "Manage recruitment, onboarding, employee coordination, and company culture.",
    subject: "Application for HR Executive",
  },
];


export default function Careers() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (

    <main className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <SEO
        title="Careers"
        description="Join our team at DigiScale Infotech. We are always looking for talented designers, developers, and problem solvers to build premium digital products."
        path="/careers"
      />
      <Navbar />

      <section className="pt-32 pb-12 lg:pt-36 lg:pb-2 bg-accent/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-5 px-4 py-1.5 rounded-full bg-primary text-white text-sm font-semibold shadow-sm"
          >
            We're Hiring
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-5"
          >
            Current Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            We're building innovative digital products and always looking to connect with passionate designers, developers, and problem solvers.
          </motion.p>
        </div>

      </section>
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-6">
            {openings.map((job) => (
              <motion.div
                key={job.title}
                whileHover={{ y: -4 }}
                className="border rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-3 text-sm mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {job.experience}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {job.location}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-muted-foreground max-w-2xl">
                    {job.description}
                  </p>
                </div>

                <Button
                  size="lg"
                  className="rounded-full px-8"
                  aria-label={`Apply Now for ${job.title}`}
                  onClick={() => {
                    setSelectedJob(job.title);
                    setOpenModal(true);
                  }}
                >
                  Apply Now
                </Button>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ApplyJobModal
        open={openModal}
        jobTitle={selectedJob ?? ""}
        onClose={() => setOpenModal(false)}
      />
      <Footer />
    </main>
  );
}
