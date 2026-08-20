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
    challenge: "Needed a high-converting Shopify store with a smooth mobile shopping experience.",
    solution: "Designed a fast, responsive storefront with optimized product pages & seamless checkout.",
    result: "Enhanced brand presence & accelerated online customer growth.",
  },
  {
    image: project5,
    industry: "Custom Software",
    name: "TexaFlow Textile ERP",
    link: "",
    stack: ["C#", "ASP.NET", "SQL Server", "Azure"],
    challenge: "Manual billing, inventory tracking, and daily operations were slow & error-prone.",
    solution: "Built a custom ERP system to digitize billing, inventory, and operations in one place.",
    result: "Streamlined daily operations & reduced manual work effort by 60%.",
  },
  {
    image: project2,
    industry: "Design & Identity",
    name: "Stienhardt Stone",
    link: "https://stienhardt.com",
    stack: ["Figma", "Adobe Illustrator", "Photoshop"],
    challenge: "Create a digital identity that reflects luxury craftsmanship, trust, and stone quality.",
    solution: "Designed a sleek, elegant website UI to showcase luxury stone products professionally.",
    result: "Strengthened digital presence & established premium customer trust.",
  },
  {
    image: project4,
    industry: "Shopify Store",
    name: "ByRavina",
    link: "https://byravina.com/",
    stack: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    challenge: "Build a premium Shopify store showcasing custom boutique fashion collections.",
    solution: "Developed a modern Shopify site with clean layout & intuitive shopping journey.",
    result: "Delivered a smooth shopping experience that increased customer confidence.",
  },
  {
    image: project6,
    industry: "Web Application",
    name: "Max Water",
    link: "https://maxwater.in",
    stack: ["React", "Node.js", "Tailwind CSS", "Vite", "Framer Motion"],
    challenge: "Needed a high-converting web presence to showcase water purifiers & capture leads.",
    solution: "Built a lightning-fast landing page with interactive features & lead workflows.",
    result: "Boosted direct inquiries by 45% with sub-second page loading speed.",
  },
  {
    image: project7,
    industry: "Web Application",
    name: "Lifo India",
    link: "https://lifoindia.com",
    stack: ["React", "Node.js", "Tailwind CSS", "TypeScript", "Vite"],
    challenge: "Required a B2B portal for industrial product catalogs & wholesale quote requests.",
    solution: "Engineered a high-performance B2B catalog platform with instant inquiry workflows.",
    result: "Increased B2B client inquiries & wholesale requests by 60%.",
  },
  {
    image: project3,
    industry: "Custom Software",
    name: "4 Ever Interior Gallery",
    stack: ["Next.js", "Python", "FastAPI", "PostgreSQL", "AWS"],
    challenge: "Managing hundreds of high-res interior design images was slow & time-consuming.",
    solution: "Developed a streamlined asset system with automated optimization & batch tools.",
    result: "Reduced image handling time by 60% with instant visual rendering.",
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
        title="Our Work & Case Studies | DigiScale Infotech"
        description="Explore our portfolio of successful projects including custom web apps, Shopify stores, ERP systems, and AI automation solutions."
        path="/case-studies"
      />
      <Navbar />

      {/* Header Banner Section */}
      <section className="pt-28 pb-6 bg-gradient-to-b from-[#112D16]/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#C6D6B1]/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#112D16]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-3 px-4 py-1 rounded-full border border-[#112D16]/20 bg-white/50 text-[#112D16] text-xs font-bold uppercase tracking-wider"
          >
            Our Work
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#112D16] tracking-tight mb-4"
          >
            Projects That Deliver Results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-base text-[#112D16]/80 font-normal leading-relaxed max-w-2xl mx-auto mb-4"
          >
            Explore how we help tech startups, e-commerce brands, and enterprises transform their digital presence and scale faster.
          </motion.p>
        </div>
      </section>

      {/* Categories Filter Tabs Section */}
      <section className="pt-4 pb-2 bg-background">
        <div className="container mx-auto px-6 max-w-[1400px] flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center bg-[#C6D6B1]/10 border border-[#C6D6B1]/20 p-1.5 rounded-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeCategory === category
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
      <section className="pt-4 pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-[1400px]">

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 bg-[#112D16] text-[#C6D6B1] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {project.industry}
                        </span>
                      </div>
                      {/* Hover Indicator Overlay */}
                      <div className="absolute inset-0 bg-[#112D16]/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md text-[#112D16] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
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
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-[#112D16] text-[#C6D6B1] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {project.industry}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Details block inside card */}
                  <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="mb-3.5">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 group/title"
                          >
                            <h2 className="text-lg font-bold text-[#112D16] group-hover/title:text-[#054418] transition-colors">
                              {project.name}
                            </h2>
                            <ArrowUpRight className="w-4 h-4 text-[#112D16]/50 group-hover/title:text-[#112D16] group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                          </a>
                        ) : (
                          <h2 className="text-lg font-bold text-[#112D16]">
                            {project.name}
                          </h2>
                        )}
                      </div>

                      {/* Clean left-bordered corporate description logs */}
                      <div className="space-y-3.5 mb-5 text-[13.5px]">

                        <div className="border-l-2 border-[#112D16]/20 pl-3.5">
                          <span className="font-bold text-[#112D16]/50 block mb-1 uppercase tracking-wider text-[10px]">
                            Challenge
                          </span>
                          <p className="text-[#112D16]/85 font-medium leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>

                        <div className="border-l-2 border-[#112D16]/20 pl-3.5">
                          <span className="font-bold text-[#112D16]/50 block mb-1 uppercase tracking-wider text-[10px]">
                            Solution
                          </span>
                          <p className="text-[#112D16]/85 font-medium leading-relaxed">
                            {project.solution}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Stack tags at the bottom */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#112D16]/10">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 bg-[#112D16]/5 border border-[#112D16]/10 text-[#112D16] rounded-md text-[11px] font-semibold"
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
