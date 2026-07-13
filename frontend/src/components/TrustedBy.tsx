import skyparrowLogo from "@/assets/trusted_companies/Skyparrow.svg";
import stienhardtLogo from "@/assets/trusted_companies/Stienhardt.svg";
import ravinaLogo from "@/assets/trusted_companies/ravina.svg";
import texaflowLogo from "@/assets/trusted_companies/texaflow.svg";

export default function TrustedBy() {
  const logos = [
    { name: "Skyparrow", image: skyparrowLogo },
    { name: "Stienhardt", image: stienhardtLogo },
    { name: "Ravina", image: ravinaLogo },
    { name: "Texaflow", image: texaflowLogo },
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
          {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-8 w-36 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-h-full max-w-full object-contain text-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
