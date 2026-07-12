import { motion } from "framer-motion";
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
  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-10 max-w-2xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.35 }}
              className="relative bg-white border border-border/50 rounded-2xl p-7 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(52,107,188,0.12)] transition-all duration-300"
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
          ))}
        </div>
      </div>
    </section>
  );
}
