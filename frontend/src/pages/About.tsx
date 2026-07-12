import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
Target,
Lightbulb,
Users,
Shield,
Clock,
CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function About() {
  useEffect(() => {
    document.title = "About Us | DigiScale Infotech";
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-14 bg-accent/20 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium"
          >
            Trusted Technology Partner
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight"
          >
            About DigiScale Infotech
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            We build websites, Shopify stores, custom software, and AI solutions that help businesses grow with confidence.
          </motion.p>
        </div>
      </section>

      {/* Story + Mission/Vision in one row */}
      <section className="py-14">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DigiScale Infotech was founded with a simple goal — to help businesses turn ideas into powerful digital products. We work closely with startups, brands, and enterprises to create solutions that are practical, scalable, and built for long-term growth.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From business websites and Shopify stores to custom software and AI automation, we focus on delivering technology that solves real problems and creates measurable value for our clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "Build reliable digital solutions that simplify business operations and accelerate growth.",
                },
                {
                  icon: Lightbulb,
                  title: "Our Vision",
                  desc: "Become a trusted technology partner for businesses through innovation, quality, and long-term relationships.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white p-7 rounded-2xl border border-border/50 shadow-sm"
                >
                  <Icon className="w-9 h-9 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why businesses choose DigiScale Infotech. */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Why businesses choose DigiScale Infotech.</h2>
              <p className="text-muted-foreground">What sets DigiScale apart from the rest.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { icon: Users, title: "Business First", desc: "Every solution is built around your business goals." },
                { icon: Shield, title: "Quality Development", desc: "Clean, scalable, and maintainable code for every project." },
                { icon: CheckCircle, title: "Transparent Process", desc: "Clear communication and updates from start to finish." },
                { icon: Clock, title: "Long-Term Support", desc: "Reliable maintenance and continuous improvements after launch." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-5 border border-border rounded-2xl bg-white"
                >
                  <Icon className="w-7 h-7 text-primary mb-3" />
                  <h4 className="text-base font-bold mb-1">{title}</h4>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-14 bg-primary text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "7", label: "Projects Delivered" },
              { num: "11", label: "Happy Clients" },
              { num: "4", label: "Industries Served" },
              { num: "100%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="text-4xl md:text-5xl font-black mb-1">{stat.num}</div>
                <div className="text-white/75 font-medium text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team
      <section className="py-14 bg-accent/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Leadership Team</h2>
            <p className="text-muted-foreground">The minds behind the magic.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: "Alex Mercer", role: "CEO & Founder" },
              { name: "Sarah Chen", role: "CTO" },
              { name: "Marcus Johnson", role: "Head of Design" },
              { name: "Priya Patel", role: "Lead Engineer" },
            ].map((member, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center group"
              >
                <div className="mb-3 overflow-hidden rounded-full aspect-square border-4 border-white shadow-md mx-auto max-w-[140px]">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=346BBC&color=fff&size=140`}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-bold text-base">{member.name}</h4>
                <p className="text-primary font-medium text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-14 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Build Together?</h2>
            <p className="text-lg text-muted-foreground mb-7">
              Let's discuss how we can help your business grow through technology.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base bg-primary hover:bg-primary/90">
              <Link href="/contact">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
