import React, { useState } from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub, } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { subscribeNewsletter } from "@/api/newsletter";

export default function Footer() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await subscribeNewsletter({
        email,
      });

      setSubscribed(true);
      setEmail("");

      toast({
        title: "Subscribed Successfully 🎉",
        description: "Thank you for subscribing to our newsletter.",
      });

    } catch (error: any) {

      if (error?.message?.includes("409")) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      }

      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-foreground text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        {/* Top: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-14 mb-14 border-b border-white/10">
          <div className="max-w-md">
            <span className="text-xl font-bold tracking-tight text-white mb-4 block">
              {/* <Link href="/" className="flex items-center shrink-0">
                <img
                  src="/logo.svg"
                  alt="DigiScale Infotech"
                  className="h-12 w-auto object-contain"
                />
              </Link> */}
              <span className="text-primary">D</span>igiScale Infotech
            </span>

            <p className="text-white/75 leading-relaxed text-sm mb-6">
              DigiScale Infotech helps startups and businesses build scalable digital products and digital experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaLinkedin, url: "https://www.linkedin.com/company/digiscale-infotech/", label: "LinkedIn" },
                { icon: FaInstagram, url: "https://www.instagram.com/digiscaleinfotech/", label: "Instagram" },
                { icon: FaFacebook, url: "https://www.facebook.com/digiscaleinfotech/", label: "Facebook" },
                { icon: FaGithub, url: "https://github.com/DigiScaleInfotech", label: "GitHub" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-11 h-11 rounded-lg bg-white/5 hover:bg-primary/80 flex items-center justify-center transition-colors group"
                >
                  <link.icon className="w-5 h-5 text-white/75 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2 text-white/90">Stay Updated</h4>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter for the latest digital insights and updates.
            </p>
            {subscribed ? (
              <p className="text-primary text-sm font-medium">Thanks for subscribing! 🎉</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm w-full">
                <label htmlFor="footer-email" className="sr-only">Email Address</label>
                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitting}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/45 focus:border-primary h-10 text-sm"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90 h-10 px-5 text-sm shrink-0 rounded-lg w-full sm:w-auto inline-flex items-center justify-center gap-1.5"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* 4-column links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {/* Company */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-wider text-white/85">Company</h4>
            <ul className="space-y-3.5">
              <li><Link href="/about" className="text-white/70 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link href="/case-studies" className="text-white/70 hover:text-white text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/careers" className="text-white/70 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-wider text-white/85">Services</h4>
            <ul className="space-y-3.5">
              <li><a href="/#services" className="text-white/70 hover:text-white text-sm transition-colors">Design</a></li>
              <li><a href="/#services" className="text-white/70 hover:text-white text-sm transition-colors">Development</a></li>
              <li><a href="/#services" className="text-white/70 hover:text-white text-sm transition-colors">SEO</a></li>
              <li><a href="/#services" className="text-white/70 hover:text-white text-sm transition-colors">AI Automation</a></li>
            </ul>
          </div>

          {/* Resources — no Blog */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-wider text-white/85">Resources</h4>
            <ul className="space-y-3.5">
              <li><Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold mb-5 uppercase tracking-wider text-white/85">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary/60" />
                <span className="break-all">hello@digiscaleinfotech.com</span>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary/60" />
                <a href="tel:+919898213183" className="hover:text-white transition-colors">+91 98982 13183</a>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/60" />
                Surat, Gujarat, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} DigiScale Infotech. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
