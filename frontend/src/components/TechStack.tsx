import { useState } from "react";
import { motion } from "framer-motion";
import { techCategories } from "@/data/techstack";

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(techCategories[0].id);

  return (
    <section id="tech" className="py-24 bg-accent/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Our Tech Stack
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Modern technologies powering scalable digital solutions.
          </motion.p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-white border border-border/50 rounded-xl shadow-sm">
            {techCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === category.id 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="w-full max-w-4xl mx-auto bg-white border border-border/50 rounded-3xl p-8 sm:p-12 shadow-sm min-h-[300px] flex items-center justify-center">
            {techCategories.map((category) => (
              category.id === activeTab && (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
                >
                  {category.techs.map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center justify-center gap-4 group">
                      <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <tech.icon className="w-8 h-8" />
                      </div>
                      <span className="font-semibold text-sm text-foreground">{tech.name}</span>
                    </div>
                  ))}
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}