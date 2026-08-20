import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ApplyJobModal from "@/components/career/ApplyJobModal";
import SEO from "@/components/SEO";
const steps = [
  {
    number: "01",
    title: "Apply Online",
    desc: "Submit your details along with your resume and a link to your portfolio/GitHub profile.",
  },
  {
    number: "02",
    title: "Task Round",
    desc: "Demonstrate your technical or creative capabilities through a simple, practical assignment.",
  },
  {
    number: "03",
    title: "Technical Review",
    desc: "Discuss your solution, code structure, or design choices in detail with our core team.",
  },
  {
    number: "04",
    title: "Onboarding",
    desc: "Align on offer details, start date, expectations, and welcome to DigiScale Infotech!",
  },
];

const openings = [
  {
    title: "Python Developer",
    experience: "0 – 2 Years",
    location: "Surat / Remote",
    type: "Full-time",
    description:
      "Build AI tools, automation systems, APIs, and scalable backend applications using Python, Django, FastAPI, and LangChain.",
    subject: "Application for Python Developer",
  },
  {
    title: "Graphic Designer",
    experience: "0 – 2 Years",
    location: "Surat",
    type: "Full-time",
    description:
      "Create high-fidelity branding mockups, social media creatives, interface design assets, and marketing visuals.",
    subject: "Application for Graphic Designer",
  },
  {
    title: "HR Executive",
    experience: "0 – 2 Years",
    location: "Surat",
    type: "Full-time",
    description:
      "Manage end-to-end recruitment pipelines, onboarding, employee engagement, and coordinate team culture initiatives.",
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

      {/* Hero Header Section with Outlined CAREERS Text Overlay */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-[#C6D6B1] overflow-hidden border-b border-[#112D16]/12">
        
        {/* Huge Outlined CAREERS Title in Background */}
        <div className="absolute inset-x-0 top-24 bottom-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <span 
            className="text-[16vw] font-black uppercase text-transparent tracking-[0.2em] leading-none whitespace-nowrap" 
            style={{ 
              WebkitTextStroke: "1px rgba(17,45,22,0.08)", 
              fontFamily: 'Impact, sans-serif' 
            }}
          >
            CAREERS
          </span>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-4 py-1 rounded-full border border-[#112D16]/20 bg-white/50 text-[#112D16] text-xs font-bold uppercase tracking-wider"
          >
            We're Hiring
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-[#112D16] uppercase tracking-wider mb-6"
          >
            Join Our Team & Shape the Future
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-[#112D16]/80 font-medium leading-relaxed max-w-2xl mx-auto mb-8"
          >
            We're looking for passionate developers, designers, and innovators to build world-class digital products.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="rounded-full px-8 h-12 text-sm bg-[#112D16] text-[#C6D6B1] hover:bg-[#1a4020] font-bold tracking-wider uppercase shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => {
                const el = document.getElementById("open-positions");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Openings List Grid Section */}
      <section id="open-positions" className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-6 max-w-[1400px]">
          
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-black text-[#112D16] uppercase tracking-wide">
              Job Openings
            </h2>
            <div className="h-0.5 w-12 bg-[#112D16] mt-2" />
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {openings.map((job, idx) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                className="bg-white border border-[#112D16]/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_8px_30px_rgba(17,45,22,0.02)] hover:shadow-[0_20px_50px_rgba(17,45,22,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-grow">
                  <h3 className="text-xl lg:text-2xl font-black text-[#112D16] uppercase tracking-wide mb-3">
                    {job.title}
                  </h3>

                  {/* Clean tags */}
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    {[job.experience, job.location, job.type].map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-[#112D16]/5 border border-[#112D16]/10 text-[#112D16] rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#112D16]/75 font-medium text-[14px] leading-relaxed max-w-xl">
                    {job.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  <Button
                    size="lg"
                    className="rounded-full px-8 bg-[#112D16] text-[#C6D6B1] hover:bg-[#112D16]/90 font-bold tracking-wide text-xs uppercase"
                    aria-label={`Apply Now for ${job.title}`}
                    onClick={() => {
                      setSelectedJob(job.title);
                      setOpenModal(true);
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Hiring Process Section */}
      <section className="py-16 lg:py-20 bg-[#C6D6B1]/10 border-t border-[#112D16]/12 border-b border-[#112D16]/12">
        <div className="container mx-auto px-6 max-w-[1400px]">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-[#112D16] uppercase tracking-wider mb-4">
              Our Hiring Process
            </h2>
            <p className="text-lg text-[#112D16]/70 font-medium">
              A transparent, straight-to-the-point evaluation process to see if we are a mutual fit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="bg-white border border-[#112D16]/10 rounded-2xl p-8 flex flex-col justify-start relative hover:shadow-[0_16px_40px_rgba(17,45,22,0.04)] transition-all duration-300"
              >
                <span className="text-[28px] font-black text-[#112D16]/15 mb-4 block leading-none">
                  {item.number}
                </span>
                <h3 className="text-lg font-black text-[#112D16] uppercase tracking-wide mb-2 leading-none">
                  {item.title}
                </h3>
                <p className="text-[#112D16]/75 text-[13.5px] font-medium leading-relaxed">
                  {item.desc}
                </p>
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
