import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import CaseStudies from "@/pages/CaseStudies";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

import { lenis } from "@/lib/lenis";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const rawHash = window.location.hash || window.location.href.split("#")[1];
      if (rawHash) {
        const hash = rawHash.startsWith("#") ? rawHash : `#${rawHash}`;
        setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) {
            lenis.scrollTo(hash, { offset: -80, duration: 1.8 });
          }
        }, 300);
      } else {
        requestAnimationFrame(() => {
          lenis.scrollTo(0, {
            immediate: true,
          });
        });
      }
    };

    handleScroll();

    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, [location]);

  return null;
}

function CapabilitiesRoute() {
  useEffect(() => {
    setTimeout(() => {
      lenis.scrollTo("#services", { offset: -80, duration: 1.2 });
    }, 200);
  }, []);
  return <Home />;
}

function Router() {
  const [location] = useLocation();

  return (
    <>
      <ScrollToTop />

      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/about-us" component={About} />
        <Route path="/capabilities" component={CapabilitiesRoute} />
        <Route path="/services" component={CapabilitiesRoute} />
        <Route path="/careers" component={Careers} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

import { API_URL } from "@/api/client";

export default function App() {
  useEffect(() => {
    // Wake up Render backend service on load to prevent cold start delays
    fetch(`${API_URL}/health`, { mode: "no-cors" }).catch((err) => console.log("Backend wake up failed", err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}