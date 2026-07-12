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
    requestAnimationFrame(() => {
      lenis.scrollTo(0, {
        immediate: true,
      });
    });
  }, [location]);

  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <>
      <ScrollToTop />

      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
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

export default function App() {
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