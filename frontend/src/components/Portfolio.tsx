import { motion } from "framer-motion";
import { projects } from "@/pages/CaseStudies";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              A few projects we've delivered successfully.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              View all projects <ArrowUpRight className="ml-1 w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.09, duration: 0.4 }}
              className="group rounded-2xl bg-white border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm">
                    {project.industry}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.name}</h3>
                <p className="text-muted-foreground mb-5 line-clamp-2 leading-relaxed text-sm">
                  {project.solution}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-accent text-primary text-xs font-medium rounded-md"
                    >
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
  );
}


