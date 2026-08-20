import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Code2, Globe, Smartphone, LayoutDashboard, Palette } from "lucide-react";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "AI Automation",
    desc: "Build intelligent AI agents, workflow automation, chatbots, and business process automation.",
  },
  {
    num: "02",
    icon: Code2,
    title: "Custom Software",
    desc: "Scalable business software, CRM, ERP, SaaS platforms, and internal management systems.",
  },
  {
    num: "03",
    icon: Globe,
    title: "Web Development",
    desc: "Modern websites and high-performance web applications built with the latest technologies.",
  },
  {
    num: "04",
    icon: Smartphone,
    title: "eCommerce Solutions",
    desc: "Shopify development, automation, custom integrations, and performance optimization.",
  },
  {
    num: "05",
    icon: LayoutDashboard,
    title: "SaaS Development",
    desc: "Secure multi-tenant SaaS platforms with analytics, billing, and team management.",
  },
  {
    num: "06",
    icon: Palette,
    title: "UI/UX Design",
    desc: "Clean, user-focused interfaces designed to improve engagement and user experience.",
  },
];

export default function Services() {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set up scroll-driven progress hook targeting this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Transform functions for scroll-bound animations (desktop only)
  // Left cards: slide left from behind center card (starts shifted right)
  const xLeft = useTransform(scrollYProgress, [0.15, 0.85], [160, 0]);
  
  // Right cards: slide right from behind center card (starts shifted left)
  const xRight = useTransform(scrollYProgress, [0.15, 0.85], [-160, 0]);
  
  // Opacity & scaling transforms mapped to scroll progress (no y-offset shifts to prevent vertical mismatch)
  const opacityLeftRight = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const opacityCenter = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const scaleCenter = useTransform(scrollYProgress, [0.15, 0.85], [0.97, 1]);

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative pt-10 pb-14 lg:pt-12 lg:pb-16 bg-gradient-to-b from-background via-secondary/15 to-background overflow-hidden border-b border-[#112D16]/12"
    >
      {/* Ambient Glowing Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-primary/6 blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#C6D6B1]/10 blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Helping businesses transform ideas into world-class digital products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const position = index % 3; // 0: Left, 1: Center, 2: Right

            // Set styles dynamically based on desktop state and position inside grid row
            const xStyle = isDesktop
              ? position === 0
                ? xLeft
                : position === 2
                ? xRight
                : 0
              : 0;

            const opacityStyle = isDesktop
              ? position === 1
                ? opacityCenter
                : opacityLeftRight
              : undefined;

            const scaleStyle = isDesktop
              ? position === 1
                ? scaleCenter
                : 1
              : 1;

            return (
              <motion.div
                key={service.num}
                style={isDesktop ? { x: xStyle, opacity: opacityStyle, scale: scaleStyle } : undefined}
                initial={!isDesktop ? { opacity: 0, y: 24 } : undefined}
                whileInView={!isDesktop ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35 }}
                className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-primary/10 rounded-2xl p-7 overflow-hidden group hover:bg-white dark:hover:bg-slate-900 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(25,128,71,0.08)] hover:border-primary/30 transition-all duration-300 z-10 hover:z-20"
              >
                <span className="absolute bottom-3 right-4 text-9xl font-black text-foreground/[0.04] group-hover:text-foreground/[0.07] transition-colors select-none leading-none pointer-events-none">
                  {service.num}
                </span>

                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <service.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-[260px]">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
