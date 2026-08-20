import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";

import skyparrowLogo from "@/assets/trusted_companies/Skyparrow.svg";
import stienhardtLogo from "@/assets/trusted_companies/Stienhardt.svg";
import ravinaLogo from "@/assets/trusted_companies/ravina.svg";
import texaflowLogo from "@/assets/trusted_companies/texaflow.svg";
import foreverLogo from "@/assets/trusted_companies/4ever.svg";

const words = [
  "Custom Web Apps",
  "AI Automation",
  "Modern SaaS",
  "Smart Software",
];

const logos = [
  { name: "Skyparrow", image: skyparrowLogo, scale: "scale-[1.2]" },
  { name: "Stienhardt", image: stienhardtLogo, scale: "scale-[1.15]" },
  { name: "Ravina", image: ravinaLogo, scale: "scale-[1.4]" },
  { name: "Texaflow", image: texaflowLogo, scale: "scale-[1.35]" },
  { name: "4ever", image: foreverLogo, scale: "scale-[2.4]" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();

  // Parallax transformations - content scrolls at 20% speed, logos at 12% speed
  const yContent = useTransform(scrollY, [0, 800], [0, -160]);
  const yLogo = useTransform(scrollY, [0, 800], [0, -96]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="group sticky top-0 z-0 pt-36 pb-16 lg:pt-44 lg:pb-12 overflow-hidden flex flex-col items-center justify-start min-h-screen lg:h-screen w-full isolate bg-[#C6D6B1] text-[#112D16]"
    >
      {/* Base Background Gradient (Distinct separation from White body) */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#C6D6B1] via-[#c2d3ab] to-[#b8c9a3]" />

      {/* Grid Overlay with soft opacity */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17, 45, 22, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 45, 22, 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[360px] -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent pointer-events-none" />

      {/* Centered Hero Content Container - Positioned to flow naturally with bottom slider */}
      <motion.div
        style={{ y: yContent }}
        className="container mx-auto px-4 sm:px-6 max-w-5xl text-center flex flex-col items-center justify-start mt-2 mb-2"
      >

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
          className="text-sm sm:text-base font-mono font-semibold text-[#112D16] tracking-[0.25em] mb-4 uppercase"
        >
          Think Digital, Scale Smart
        </motion.p>

        {/* Heading with Text Rotator */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-bold text-[#112D16] leading-[1.08] mb-6 max-w-4xl"
        >
          We Build & Scale Your{" "}
          <br className="hidden md:block" />
          <span className="relative inline-block text-[#054418] font-bold underline decoration-[#054418]/40 underline-offset-8 min-h-[1.25em] md:min-h-[1.2em] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -32, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="inline-block w-full left-0 right-0"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-[#112D16]/85 max-w-[760px] mx-auto mb-8 leading-relaxed font-medium"
        >
          We build AI-powered software, modern web applications, and scalable digital solutions for ambitious businesses.
        </motion.p>

        {/* Actions with Button Micro-interactions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <Button
            asChild
            size="lg"
            className="group/btn rounded-full px-8 h-12 text-base bg-[#112D16] hover:bg-[#1a4020] text-[#C6D6B1] border border-[#112D16] font-bold shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <Link href="/contact" className="inline-flex items-center justify-center gap-2">
              Book Free Consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group/btn2 rounded-full px-8 h-12 text-base w-full sm:w-auto hover:bg-[#112D16]/10 hover:text-[#112D16] border-[#112D16]/30 text-[#112D16] font-bold transition-all duration-300 cursor-pointer bg-white/40 backdrop-blur-xs"
          >
            <Link href="/case-studies" className="inline-flex items-center justify-center gap-2">
              Explore Work
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn2:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        {/* Rating & Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36, ease: "easeOut" }}
          className="mt-8 flex items-center justify-center gap-2 text-sm sm:text-base text-[#112D16] font-semibold bg-white/60 border border-[#112D16]/15 rounded-full px-5 py-2 backdrop-blur-sm shadow-xs"
        >
          <div className="flex text-amber-600 gap-0.5">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-[#112D16]">Trusted by 10+ scaling businesses worldwide</span>
        </motion.div>
      </motion.div>

      {/* Full-bleed Company logo slider positioned directly below the rating badge with a compact margin */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.44, ease: "easeOut" }}
        style={{ y: yLogo }}
        className="w-full relative overflow-hidden group pb-4 mt-12 lg:mt-20"
      >
        <div className="relative w-full overflow-hidden">
          {/* Narrower gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#C6D6B1] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#C6D6B1] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-4 px-6 py-3 bg-white/95 border border-[#112D16]/15 rounded-xl shadow-[0_2px_8px_rgba(17,45,22,0.06)] w-48 h-16 shrink-0"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className={`h-8 w-auto object-contain transition-all duration-300 transform ${logo.scale} mix-blend-multiply grayscale hover:grayscale-0 opacity-85 hover:opacity-100`}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
