import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

type DropdownType = "capabilities" | "solutions" | "techstack" | null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const closeTimer = useRef<any>(null);
  const lastScrollY = useRef(0);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScroll > lastScrollY.current && currentScroll > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScroll;
    };

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
    setLocation("/contact");
    setMobileMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (location === "/" || location === "") {
      e.preventDefault();
      const el = document.getElementById("vision-mission");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };


  const megaMenuVariants: Variants = {
    hidden: { opacity: 0, y: -12, scale: 0.96, transformOrigin: "top" },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.14, ease: "easeIn" } },
  };

  // Dropdown item: simple text, clean brand-colored hover capsule
  const MenuItem = ({ children }: { children: string }) => (
    <li>
      <span className="text-[14px] font-bold block px-3.5 py-2 rounded-xl transition-all duration-200 cursor-default select-none text-[#112D16]/80 hover:text-[#112D16] hover:bg-[#DBE2CB]/30">
        {children}
      </span>
    </li>
  );

  const showNavbar = visible || activeDropdown !== null || mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out flex items-center border-b ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-[#112D16]/10 shadow-[0_4px_20px_rgba(17,45,22,0.05)] h-20"
            : "bg-transparent border-[#112D16]/10 h-24"
        }`}
      >
        <div
          className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 mx-auto"
        >
          <Link href="/" className="flex items-center shrink-0" onClick={handleHomeClick}>
            <img
              src="/logo.png"
              alt="DigiScale Infotech"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" onClick={handleHomeClick} className="text-base font-bold text-[#112D16]/85 hover:text-[#112D16] transition-colors">
              Home
            </Link>


            {(["capabilities" /* , "solutions", "techstack" */] as DropdownType[]).map((name) => (
              <div key={name} onMouseEnter={() => openDropdown(name)} onMouseLeave={scheduleClose}>
                <button
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === name}
                  className="flex items-center gap-1 text-base font-bold text-[#112D16]/85 hover:text-[#112D16] transition-colors py-2 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 border-0"
                >
                  {name === "capabilities" ? "Capabilities" : name === "solutions" ? "Solutions" : "Tech Stack"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === name ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ))}

            <a href="/#vision-mission" onClick={handleAboutClick} className="text-base font-bold text-[#112D16]/85 hover:text-[#112D16] transition-colors">
              About
            </a>

            <Link href="/case-studies" className="text-base font-bold text-[#112D16]/85 hover:text-[#112D16] transition-colors">
              Case Studies
            </Link>
            <Link href="/careers" className="text-base font-bold text-[#112D16]/85 hover:text-[#112D16] transition-colors">
              Careers
            </Link>
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={handleTalkToExpert}
              className="rounded-full px-6 transition-all duration-300 cursor-pointer bg-[#112D16] text-white hover:bg-[#1a4020] font-bold shadow-sm"
            >
              Talk to an Expert
            </Button>
          </div>

          <button
            aria-label="Toggle Menu"
            className="lg:hidden p-2 text-[#112D16] hover:text-[#112D16]/80 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
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
            className="fixed left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md shadow-2xl border border-[#112D16]/10 w-[720px] rounded-2xl overflow-hidden transition-all duration-300"
            style={{ top: scrolled ? "84px" : "100px" }}
          >
            <div className="grid grid-cols-3 gap-6 p-6">
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
                  <h4 className="text-[11px] font-extrabold text-muted-foreground/85 uppercase tracking-widest mb-3 border-b border-border/40 pb-1.5 px-3">
                    {col.label}
                  </h4>
                  <ul className="space-y-0.5">
                    {col.items.map((item) => (
                      <MenuItem key={item}>{item}</MenuItem>
                    ))}
                  </ul>
                </div>
              ))}
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
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="DigiScale Infotech"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/#vision-mission" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === "/") {
                        handleHomeClick(e);
                      } else if (item.href.includes("#")) {
                        handleAboutClick(e);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="text-base font-bold text-[#112D16]/85 hover:text-[#112D16] hover:bg-[#112D16]/5 px-3 py-3 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-6 border-t border-[#112D16]/10">
                <Button onClick={handleTalkToExpert} className="w-full rounded-full bg-[#112D16] text-white hover:bg-[#1a4020] font-bold">
                  Talk to an Expert
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
