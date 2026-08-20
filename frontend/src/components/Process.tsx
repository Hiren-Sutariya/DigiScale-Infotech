import { motion } from "framer-motion";
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section id="process" className="relative py-16 lg:py-20 bg-[#C6D6B1] overflow-hidden border-b border-[#112D16]/12">
      
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17, 45, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 45, 22, 0.3) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Ambient Glowing Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-white/40 blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Heading with dark text on Light Green Background */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-[#112D16] uppercase tracking-wider mb-4"
          >
            Our Development Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#112D16]/80 font-medium"
          >
            Our proven process transforms ideas into successful products.
          </motion.p>
        </div>

        {/* Symmetrical original 4-Column Grid layout, styled with high-fidelity light cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="relative bg-white/75 border border-[#112D16]/15 backdrop-blur-xl rounded-[24px] p-8 overflow-hidden group hover:bg-white/90 shadow-sm hover:shadow-md transition-all duration-300 z-10"
            >
              {/* Huge step number overlay in background */}
              <div className="absolute -right-4 -top-6 text-[120px] font-black text-[#112D16]/[0.06] group-hover:text-[#112D16]/[0.1] transition-colors select-none leading-none z-0">
                {step.step}
              </div>
              <div className="relative z-10">
                <span className="text-[13px] font-black uppercase text-[#112D16]/60 tracking-wider">
                  Step {step.step}
                </span>
                <h3 className="text-[19px] font-black text-[#112D16] uppercase mt-2 mb-3 tracking-wide">{step.title}</h3>
                <p className="text-[#112D16]/80 text-[14px] font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}