import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { lenis } from "@/lib/lenis";

type DropdownType = "capabilities" | "solutions" | "techstack" | null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const closeTimer = useRef<any>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDropdown = (name: DropdownType) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 130);
  };

  const handleTalkToExpert = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location === "/") {
      lenis.scrollTo("#contact", { offset: -100, duration: 0.6 });
    } else {
      window.location.href = "/#contact";
    }
    setMobileMenuOpen(false);
  };

  const navHeight = scrolled ? 64 : 76;

  const megaMenuVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
  };

  // Dropdown item: hover-only, no navigation
  const MenuItem = ({ children }: { children: string }) => (
    <li>
      <span className="text-sm text-foreground/75 hover:text-primary hover:bg-accent/60 block px-3 py-2 rounded-lg transition-colors cursor-default select-none">
        {children}
      </span>
    </li>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
          }`}
        style={{ height: navHeight }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-full flex items-center justify-between">
          {/* <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-foreground">
              <span className="text-primary">D</span>igiScale Infotech
            </span>
          </Link> */}

          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo.svg"
              alt="DigiScale Infotech"
              className="h-9 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>

            {(["capabilities" /* , "solutions", "techstack" */] as DropdownType[]).map((name) => (
              <div key={name} onMouseEnter={() => openDropdown(name)} onMouseLeave={scheduleClose}>
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeDropdown === name ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                >
                  {name === "capabilities" ? "Capabilities" : name === "solutions" ? "Solutions" : "Tech Stack"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === name ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ))}

            <Link href="/case-studies" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Case Studies
            </Link>
            <Link href="/careers" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Careers
            </Link>
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={handleTalkToExpert}
              className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              Talk To Expert
            </Button>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ── Capabilities Mega Menu ── */}
      <AnimatePresence>
        {activeDropdown === "capabilities" && (
          <motion.div
            variants={megaMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => openDropdown("capabilities")}
            onMouseLeave={scheduleClose}
            className="fixed left-0 right-0 z-40 bg-white shadow-2xl border-b border-border/40"
            style={{ top: navHeight }}
          >
            <div className="container mx-auto px-6 max-w-7xl py-7">
              <div className="grid grid-cols-3 gap-10">
                {[
                  {
                    label: "Design",
                    items: ["Web Design", "Design Systems", "Illustration Design", "Motion Design", "Branding"],
                  },
                  {
                    label: "Development",
                    items: ["Frontend Development", "Backend Development", "System Integrations", "Technical QA", "CMS Implementation"],
                  },
                  {
                    label: "SEO",
                    items: ["Site Structure", "On Page SEO", "Technical SEO", "Localization"],
                  },
                ].map((col) => (
                  <div key={col.label}>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                      {col.label}
                    </h4>
                    <ul className="space-y-0.5">
                      {col.items.map((item) => <MenuItem key={item}>{item}</MenuItem>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Solutions Mega Menu (Commented Out) ── */}
      {/* 
      <AnimatePresence>
        {activeDropdown === "solutions" && (
          <motion.div
            variants={megaMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => openDropdown("solutions")}
            onMouseLeave={scheduleClose}
            className="fixed left-0 right-0 z-40 bg-white shadow-2xl border-b border-border/40"
            style={{ top: navHeight }}
          >
            <div className="container mx-auto px-6 max-w-7xl py-7">
              <div className="grid grid-cols-4 gap-8">
                <div className="space-y-7">
                  <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                      Scope
                    </h4>
                    <ul className="space-y-0.5">
                      {["Website Redesign", "Website Migration", "Ongoing Engagements"].map((i) => <MenuItem key={i}>{i}</MenuItem>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                      By Framework
                    </h4>
                    <ul className="space-y-0.5">
                      {["Next.js", "Gatsby"].map((i) => <MenuItem key={i}>{i}</MenuItem>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                      By Cloud Platform
                    </h4>
                    <ul className="space-y-0.5">
                      {["Vercel", "Netlify"].map((i) => <MenuItem key={i}>{i}</MenuItem>)}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                    By CMS
                  </h4>
                  <ul className="space-y-0.5">
                    {["Contentful", "Sanity", "Builder", "DatoCMS", "Storyblok", "Webflow", "HubSpot CMS", "WordPress"].map((i) => <MenuItem key={i}>{i}</MenuItem>)}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                    Industry
                  </h4>
                  <ul className="space-y-0.5">
                    {["SaaS", "AI/ML", "FinTech", "Web3", "Enterprise Software", "Software Dev Tools", "MedTech"].map((i) => <MenuItem key={i}>{i}</MenuItem>)}
                  </ul>
                </div>

                <div className="space-y-7">
                  <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                      Use Case
                    </h4>
                    <ul className="space-y-0.5">
                      {["Support In-House Engineers", "Improve Brand Consistency", "Increase Conversions", "Boost Performance", "Increase Traffic"].map((i) => <MenuItem key={i}>{i}</MenuItem>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                      Stage
                    </h4>
                    <ul className="space-y-0.5">
                      {["Startups", "Enterprise"].map((i) => <MenuItem key={i}>{i}</MenuItem>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      */}

      {/* ── Tech Stack Mega Menu (Commented Out) ── */}
      {/* 
      <AnimatePresence>
        {activeDropdown === "techstack" && (
          <motion.div
            variants={megaMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => openDropdown("techstack")}
            onMouseLeave={scheduleClose}
            className="fixed left-0 right-0 z-40 bg-white shadow-2xl border-b border-border/40"
            style={{ top: navHeight }}
          >
            <div className="container mx-auto px-6 max-w-7xl py-7">
              <div className="grid grid-cols-5 gap-8">
                {[
                  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
                  { label: "Backend", items: ["Node.js", "NestJS", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"] },
                  { label: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"] },
                  { label: "Cloud & DevOps", items: ["AWS", "Docker", "Vercel", "GitHub CI/CD", "Nginx"] },
                  { label: "AI & Data", items: ["OpenAI API", "LangChain", "n8n", "TensorFlow", "Figma"] },
                ].map((col) => (
                  <div key={col.label}>
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-2">
                      {col.label}
                    </h4>
                    <ul className="space-y-0.5">
                      {col.items.map((item) => <MenuItem key={item}>{item}</MenuItem>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      */}

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-white z-50 p-6 pb-12 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-7">
                <span className="text-lg font-bold text-primary">DigiScale</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 px-3 py-3 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t border-border">
                <Button onClick={handleTalkToExpert} className="w-full rounded-full bg-primary">
                  Talk To Expert
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
