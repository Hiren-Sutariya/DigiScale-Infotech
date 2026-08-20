import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowUpRight } from "lucide-react";

import project1 from "@/assets/Portfolio/project1.webp";
import project2 from "@/assets/Portfolio/project2.webp";
import project3 from "@/assets/Portfolio/project3.webp";
import project4 from "@/assets/Portfolio/project4.webp";
import project5 from "@/assets/Portfolio/project5.webp";
import project6 from "@/assets/Portfolio/project6.webp";
import project7 from "@/assets/Portfolio/project7.webp";

export const projects = [
  {
    image: project1,
    industry: "Shopify Store",
    name: "SkyParrow",
    link: "https://skyparrow.com/",
    stack: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    challenge: "Build a premium Shopify store for a growing saree and women's fashion brand with a smooth shopping experience.",
    solution: "Designed and developed a fast, responsive Shopify store with a clean UI, optimized product pages, and a seamless checkout experience.",
    result: "Better Customer Experience, Improved Brand Presence, Ready for Online Growth",
  },
  {
    image: project5,
    industry: "Custom Software",
    name: "TexaFlow Textile ERP",
    link: "",
    stack: ["C#", "ASP.NET", "SQL Server", "Azure"],
    challenge: "Managing billing, inventory, and daily business operations manually was time-consuming and prone to errors.",
    solution: "Developed a custom business management software to digitize billing, inventory tracking, and daily operations through a single, easy-to-use system.",
    result: "Streamlined daily operations, reduced manual work, and improved overall business efficiency.",
  },
  {
    image: project2,
    industry: "Design & Identity",
    name: "Stienhardt Stone",
    link: "https://stienhardt.com",
    stack: ["Figma", "Adobe Illustrator", "Photoshop"],
    challenge: "Create a premium website that reflects the brand's craftsmanship, trust, and luxury identity.",
    solution: "Designed a modern, elegant website with a refined user experience to showcase the brand and its products professionally.",
    result: "Strengthened the brand's online presence and delivered a premium digital experience for customers.",
  },
  {
    image: project4,
    industry: "Shopify Store",
    name: "ByRavina",
    link: "https://byravina.com/",
    stack: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    challenge: "Build a premium Shopify store that reflects the brand's style and provides a seamless shopping experience for customers.",
    solution: "Designed and developed a modern Shopify store with a clean interface, responsive layout, and an intuitive shopping journey.",
    result: "Enhanced the brand's online presence and delivered a smooth shopping experience that builds customer confidence.",
  },
  {
    image: project6,
    industry: "Web Application",
    name: "Max Water",
    link: "https://maxwater.in",
    stack: ["React", "Node.js", "Tailwind CSS", "Vite", "Framer Motion"],
    challenge: "Max Water needed a high-converting, modern landing page and web presence to showcase their advanced water purification systems, communicate product purity standards, and drive direct customer inquiries.",
    solution: "Engineered a lightning-fast, visually striking landing page with interactive product features, clear value propositions, trust badges, and an integrated lead generation workflow.",
    result: "Boosted direct lead inquiries by 45%, reduced page load time to under 1 second, and established a trusted digital brand presence at maxwater.in.",
  },
  {
    image: project7,
    industry: "Web Application",
    name: "Lifo India",
    link: "https://lifoindia.com",
    stack: ["React", "Node.js", "Tailwind CSS", "TypeScript", "Vite"],
    challenge: "Lifo India needed a modern B2B supplier digital portal to showcase their industrial product catalog, enable wholesale quote requests, and streamline business inquiries for B2B buyers across India.",
    solution: "Engineered a high-performance B2B catalog platform featuring structured product categories, bulk inquiry workflows, instant quote requests, and responsive product search.",
    result: "Increased B2B client inquiries by 60%, simplified product discovery for bulk buyers, and established a trusted digital presence at lifoindia.com.",
  },
  {
    image: project3,
    industry: "Custom Software",
    name: "4 Ever Interior Gallery",
    stack: ["Next.js", "Python", "FastAPI", "PostgreSQL", "AWS"],
    challenge: "Managing and editing hundreds of product images manually was slow and time-consuming.",
    solution: "Developed a streamlined image management system with batch editing and automated optimization.",
    result: "Reduced image management time by 60% and improved product presentation quality.",
  },
];

const categories = ["All", "Shopify Store", "Web Application", "Custom Software", "Design & Identity"];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter projects dynamically based on selected tab category
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.industry === activeCategory);

  return (
    <main className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <SEO
        title="Case Studies"
        description="Explore our portfolio of successful projects, including custom websites, Shopify stores, AI automation tools, and custom software systems."
        path="/case-studies"
      />
      <Navbar />

      {/* Hero Header Section with Outlined WORK Text Overlay */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-[#C6D6B1] overflow-hidden border-b border-[#112D16]/12">

        {/* Huge Outlined WORK Title in Background */}
        <div className="absolute inset-x-0 top-24 bottom-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <span
            className="text-[16vw] font-black uppercase text-transparent tracking-[0.2em] leading-none whitespace-nowrap"
            style={{
              WebkitTextStroke: "1px rgba(17,45,22,0.08)",
              fontFamily: 'Impact, sans-serif'
            }}
          >
            PORTFOLIO
          </span>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-4 py-1 rounded-full border border-[#112D16]/20 bg-white/50 text-[#112D16] text-xs font-bold uppercase tracking-wider"
          >
            Our Work
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#112D16] tracking-tight mb-6"
          >
            Projects That Deliver Results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base md:text-lg text-[#112D16]/80 font-normal leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Explore how we help tech startups, e-commerce brands, and enterprises transform their digital presence and scale faster.
          </motion.p>
        </div>
      </section>

      {/* Categories Filter Tabs Section */}
      <section className="pt-10 pb-4 bg-background">
        <div className="container mx-auto px-6 max-w-[1400px] flex justify-center">
          <div className="flex flex-wrap gap-2.5 justify-center bg-[#C6D6B1]/10 border border-[#C6D6B1]/20 p-2 rounded-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeCategory === category
                  ? "bg-[#112D16] text-[#C6D6B1] shadow-md"
                  : "text-[#112D16]/75 hover:text-[#112D16] hover:bg-[#C6D6B1]/15"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Cards Grid Section */}
      <section className="pt-6 pb-24 bg-background">
        <div className="container mx-auto px-6 max-w-[1400px]">

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.name}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="bg-white border border-[#112D16]/10 rounded-2xl overflow-hidden group hover:shadow-[0_20px_50px_rgba(17,45,22,0.06)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between shadow-[0_8px_30px_rgba(17,45,22,0.02)]"
                >
                  {/* Aspect ratio cover image (clickable if project has link) */}
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-video overflow-hidden bg-accent/25 relative border-b border-[#112D16]/10 group/img cursor-pointer"
                      title={`Visit ${project.name} live website`}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1.5 bg-[#112D16] text-[#C6D6B1] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {project.industry}
                        </span>
                      </div>
                      {/* Hover Indicator Overlay */}
                      <div className="absolute inset-0 bg-[#112D16]/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-[#112D16] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                          Visit Live Site <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="aspect-video overflow-hidden bg-accent/25 relative border-b border-[#112D16]/10">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-[#112D16] text-[#C6D6B1] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {project.industry}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Details block inside card */}
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="mb-6">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 group/title"
                          >
                            <h2 className="text-xl font-bold text-[#112D16] group-hover/title:text-[#054418] transition-colors">
                              {project.name}
                            </h2>
                            <ArrowUpRight className="w-4 h-4 text-[#112D16]/50 group-hover/title:text-[#112D16] group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                          </a>
                        ) : (
                          <h2 className="text-xl font-bold text-[#112D16]">
                            {project.name}
                          </h2>
                        )}
                      </div>

                      {/* Clean left-bordered corporate description logs */}
                      <div className="space-y-5 mb-8 text-[14px]">

                        <div className="border-l-2 border-[#112D16]/20 pl-4">
                          <span className="font-bold text-[#112D16]/50 block mb-1 uppercase tracking-wider text-[11px]">
                            Challenge
                          </span>
                          <p className="text-[#112D16]/85 font-medium leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>

                        <div className="border-l-2 border-[#112D16]/20 pl-4">
                          <span className="font-bold text-[#112D16]/50 block mb-1 uppercase tracking-wider text-[11px]">
                            Solution
                          </span>
                          <p className="text-[#112D16]/85 font-medium leading-relaxed">
                            {project.solution}
                          </p>
                        </div>

                        <div className="border-l-2 border-[#112D16]/30 pl-4">
                          <span className="font-bold text-[#112D16] block mb-1 uppercase tracking-wider text-[11px]">
                            Result
                          </span>
                          <p className="text-[#112D16] font-bold leading-relaxed">
                            {project.result}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Stack tags at the bottom */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#112D16]/10">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#112D16]/5 border border-[#112D16]/10 text-[#112D16] rounded-lg text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
