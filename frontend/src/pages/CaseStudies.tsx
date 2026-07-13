import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import project1 from "@/assets/Portfolio/project1.png";
import project2 from "@/assets/Portfolio/project2.png";
import project3 from "@/assets/Portfolio/project3.png";
import project4 from "@/assets/Portfolio/project4.png";
import project5 from "@/assets/Portfolio/project5.png";

export const projects = [
  
  {
    image: project1,
    industry: "Shopify Store",
    name: "SkyParrow",
    stack: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    challenge: "Build a premium Shopify store for a growing saree and women's fashion brand with a smooth shopping experience.",
    solution: "Designed and developed a fast, responsive Shopify store with a clean UI, optimized product pages, and a seamless checkout experience.",
    result: "Better Customer Experience, Improved Brand Presence, Ready for Online Growth",
  },
  {
    image: project5,
    industry: "Business Management Software",
    name: "TexaFlow Textile ERP",
    stack: ["C#", "ASP.NET", "SQL Server", "Azure"],
    challenge: "Managing billing, inventory, and daily business operations manually was time-consuming and prone to errors.",
    solution: "Developed a custom business management software to digitize billing, inventory tracking, and daily operations through a single, easy-to-use system.",
    result: "Streamlined daily operations, reduced manual work, and improved overall business efficiency.",
  },
  {
    image: project2,
    industry: "Diamond Industry",
    name: "Stienhardt Stone",
    stack: ["Figma", "Adobe Illustrator", "Photoshop"],
    challenge: "Create a premium website that reflects the brand's craftsmanship, trust, and luxury identity.",
    solution: "Designed a modern, elegant website with a refined user experience to showcase the brand and its products professionally.",
    result: "Strengthened the brand's online presence and delivered a premium digital experience for customers.",
  },
  {
    image: project4,
    industry: "Shopify Store",
    name: "ByRavina",
    stack: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    challenge: "Build a premium Shopify store that reflects the brand's style and provides a seamless shopping experience for customers.",
    solution: "Designed and developed a modern Shopify store with a clean interface, responsive layout, and an intuitive shopping journey.",
    result: "Enhanced the brand's online presence and delivered a smooth shopping experience that builds customer confidence.",
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
  // {
  //   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  //   industry: "HR Tech",
  //   name: "TalentHub CRM",
  //   stack: ["React", "Python", "PostgreSQL", "Vercel"],
  //   challenge: "Streamlining recruitment pipeline for enterprise clients hiring 500+ roles annually.",
  //   solution: "AI-assisted resume screening, pipeline CRM, and automated candidate communication workflows.",
  //   result: "Time-to-hire reduced by 45% and recruiter productivity doubled within 2 months.",
  // },
];

export default function CaseStudies() {
  useEffect(() => {
    document.title = "Case Studies | DigiScale Infotech";
  }, []);

  return (
    
    <main className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-32 lg:pb-2 bg-accent/20 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium"
          >
            Our Portfolio
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-foreground mb-5"
          >
            Projects That Deliver Results
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Explore a selection of websites, Shopify stores, AI solutions, and custom software we've built for growing businesses.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-border/50 rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(52,107,188,0.1)] transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden bg-accent/30">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
                    {project.industry}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-4">{project.name}</h3>

                  <div className="space-y-3 mb-5 text-sm text-muted-foreground">
                    <div>
                      <span className="font-semibold text-foreground/70 block mb-0.5">Challenge</span>
                      {project.challenge}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground/70 block mb-0.5">Solution</span>
                      {project.solution}
                    </div>
                    <div>
                      <span className="font-semibold text-primary block mb-0.5">Result</span>
                      {project.result}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-accent text-foreground/70 rounded-lg text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
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
