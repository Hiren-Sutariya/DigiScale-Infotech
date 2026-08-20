import { motion } from "framer-motion";
import { Lightbulb, Target, Award } from "lucide-react";

export default function VisionMission() {
  return (
    <section id="vision-mission" className="bg-background py-16 lg:py-20 border-b border-[#112D16]/12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        
        {/* Section Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase text-[#112D16]/60 tracking-[0.25em] mb-3"
          >
            About DigiScale Infotech
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-bold text-[#112D16] tracking-tight mb-4"
          >
            Empowering Digital Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#112D16]/80 font-normal"
          >
            Who we are, what drives our innovation, and how we deliver impact for our partners.
          </motion.p>
        </div>

        {/* 3-Column Layout Grid for Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="bg-[#C6D6B1]/20 border border-[#C6D6B1]/35 rounded-[24px] p-8 flex flex-col justify-start relative group hover:bg-[#C6D6B1]/25 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-[#112D16] text-[#C6D6B1] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <Lightbulb className="w-5.5 h-5.5" />
            </div>
            <h3 className="text-[19px] font-bold uppercase text-[#112D16] tracking-wider mb-3 leading-none">
              Our Vision
            </h3>
            <p className="text-[#112D16]/80 text-[14px] font-medium leading-relaxed">
              To be the digital scaling partner businesses trust most, building custom software and AI integrations that drive efficient operations and growth.
            </p>
          </motion.div>

          {/* Card 2: Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="bg-[#C6D6B1]/20 border border-[#C6D6B1]/35 rounded-[24px] p-8 flex flex-col justify-start relative group hover:bg-[#C6D6B1]/25 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-[#112D16] text-[#C6D6B1] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <Target className="w-5.5 h-5.5" />
            </div>
            <h3 className="text-[19px] font-bold uppercase text-[#112D16] tracking-wider mb-3 leading-none">
              Our Mission
            </h3>
            <p className="text-[#112D16]/80 text-[14px] font-medium leading-relaxed">
              To engineer secure, seamless, and high-performance digital products that translate complex tech into simple, scaling business outcomes.
            </p>
          </motion.div>

          {/* Card 3: Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="bg-[#C6D6B1]/20 border border-[#C6D6B1]/35 rounded-[24px] p-8 flex flex-col justify-start relative group hover:bg-[#C6D6B1]/25 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-[#112D16] text-[#C6D6B1] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <Award className="w-5.5 h-5.5" />
            </div>
            <h3 className="text-[19px] font-bold uppercase text-[#112D16] tracking-wider mb-3 leading-none">
              Our Values
            </h3>
            <p className="text-[#112D16]/80 text-[14px] font-medium leading-relaxed">
              To maintain absolute transparency, security-first engineering, and a client-focused approach that guarantees high-performance deliverables.
            </p>
          </motion.div>

        </div>

        {/* Part 2: Symmetrical 4-Column Grid for the 4 stats boxes (rendered directly below the core pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          
          {/* Stat 1: Projects Delivered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="bg-[#C6D6B1]/20 border border-[#C6D6B1]/35 rounded-[24px] p-8 flex flex-col items-center justify-center text-center hover:bg-[#C6D6B1]/25 transition-all duration-300 shadow-sm"
          >
            <span className="text-[36px] font-bold text-[#112D16] tracking-tight leading-none">10+</span>
            <span className="text-[12px] font-bold text-[#112D16]/65 tracking-wider mt-2 uppercase">
              Projects Delivered
            </span>
          </motion.div>

          {/* Stat 2: Happy Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="bg-[#C6D6B1]/20 border border-[#C6D6B1]/35 rounded-[24px] p-8 flex flex-col items-center justify-center text-center hover:bg-[#C6D6B1]/25 transition-all duration-300 shadow-sm"
          >
            <span className="text-[36px] font-bold text-[#112D16] tracking-tight leading-none">10+</span>
            <span className="text-[12px] font-bold text-[#112D16]/65 tracking-wider mt-2 uppercase">
              Happy Clients
            </span>
          </motion.div>

          {/* Stat 3: Industries Served */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="bg-[#C6D6B1]/20 border border-[#C6D6B1]/35 rounded-[24px] p-8 flex flex-col items-center justify-center text-center hover:bg-[#C6D6B1]/25 transition-all duration-300 shadow-sm"
          >
            <span className="text-[36px] font-bold text-[#112D16] tracking-tight leading-none">5+</span>
            <span className="text-[12px] font-bold text-[#112D16]/65 tracking-wider mt-2 uppercase">
              Industries Served
            </span>
          </motion.div>

          {/* Stat 4: Satisfaction Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="bg-[#C6D6B1]/20 border border-[#C6D6B1]/35 rounded-[24px] p-8 flex flex-col items-center justify-center text-center hover:bg-[#C6D6B1]/25 transition-all duration-300 shadow-sm"
          >
            <span className="text-[36px] font-bold text-[#112D16] tracking-tight leading-none">100%</span>
            <span className="text-[12px] font-bold text-[#112D16]/65 tracking-wider mt-2 uppercase">
              Satisfaction Rate
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
