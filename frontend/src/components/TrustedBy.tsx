import { Building2, Hexagon, Component, Layers, Box, Cpu, Globe, Network } from "lucide-react";

export default function TrustedBy() {
  const logos = [
    { icon: Building2, name: "Acme Corp" },
    { icon: Hexagon, name: "Globex" },
    { icon: Component, name: "Soylent" },
    { icon: Layers, name: "Initech" },
    { icon: Box, name: "Umbrella" },
    { icon: Cpu, name: "Massive" },
    { icon: Globe, name: "Stark" },
    { icon: Network, name: "Wayne Co" },
  ];

  return (
    <section className="py-14 border-y border-border/40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl mb-8 text-center">
        <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Trusted By Companies
        </h3>
        <p className="text-base text-foreground mt-1.5 font-medium">
          Brands and businesses that trust DigiScale Infotech.
        </p>
      </div>

      <div className="relative w-full overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2.5 mx-10 min-w-max grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <logo.icon className="w-6 h-6 text-foreground" />
              <span className="text-lg font-semibold text-foreground font-sans whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
