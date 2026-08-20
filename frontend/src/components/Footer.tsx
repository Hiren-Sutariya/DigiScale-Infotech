import { Link } from "wouter";
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#C6D6B1] text-[#112D16]/80 pt-28 pb-16 border-t border-[#112D16]/12">
      <div className="container mx-auto px-6 max-w-[1400px]">

        {/* Top Section: Brand info + Horizontal Navigation links */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-16">

          {/* Brand info block */}
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-3">
              <img
                src="/logo.png"
                alt="DigiScale Infotech"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[#112D16]/60 text-[14px] font-medium leading-relaxed">
              Building scalable custom software and AI integrations for growing businesses.
            </p>
          </div>

          {/* Simple minimalistic horizontal links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 items-center justify-start lg:justify-end text-[14px] font-black uppercase tracking-wider text-[#112D16]/75">
            <a href="/#services" className="hover:text-[#112D16] transition-colors">
              Services
            </a>
            <Link href="/case-studies" className="hover:text-[#112D16] transition-colors">
              Case Studies
            </Link>
            <Link href="/careers" className="hover:text-[#112D16] transition-colors">
              Careers
            </Link>
            <Link href="/contact" className="hover:text-[#112D16] transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-[#112D16]/50 hover:text-[#112D16] transition-colors text-[13px]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#112D16]/50 hover:text-[#112D16] transition-colors text-[13px]">
              Terms
            </Link>
          </div>

        </div>

        {/* Thin minimalist divider line */}
        <div className="border-t border-[#112D16]/10 w-full" />

        {/* Bottom Section: Social Icons + Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12">

          {/* Social Links (clean simple icons) */}
          <div className="flex items-center gap-5">
            {[
              { icon: FaLinkedin, url: "https://www.linkedin.com/company/digiscale-infotech/", label: "LinkedIn" },
              { icon: FaInstagram, url: "https://www.instagram.com/digiscaleinfotech/", label: "Instagram" },
              { icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61593429411125", label: "Facebook" },
              { icon: FaGithub, url: "https://github.com/DigiScaleInfotech", label: "GitHub" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-[#112D16]/65 hover:text-[#112D16] transition-colors"
              >
                <link.icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>

          {/* Location & Copyright info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[12px] font-bold text-[#112D16]/45 uppercase tracking-wider">
            <span>Surat, Gujarat, India</span>
            <span className="hidden sm:inline opacity-50">•</span>
            <span>© {new Date().getFullYear()} DigiScale Infotech. All Rights Reserved.</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
