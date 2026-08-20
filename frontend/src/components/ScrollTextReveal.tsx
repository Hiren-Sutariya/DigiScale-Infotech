import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CharacterProps {
  children: string;
  progress: any;
  range: [number, number];
}

function Character({ children, progress, range }: CharacterProps) {
  // Interpolate opacity from 0.15 (light sage/green) to 1.0 (solid forest green)
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="text-[#112D16] font-bold tracking-tight">
      {children}
    </motion.span>
  );
}

export default function ScrollTextReveal({ value }: { value: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Triggers when the top of container is 85% from top of viewport
    // Ends when the bottom of container is 40% from top of viewport
    offset: ["start 0.85", "end 0.40"]
  });

  const words = value.split(" ");
  
  // Flatten character counting to calculate precise ranges across the entire sentence
  let totalChars = 0;
  const wordStructures = words.map((word) => {
    const chars = word.split("");
    const startIndex = totalChars;
    totalChars += chars.length;
    return { word, chars, startIndex };
  });

  return (
    <section className="bg-background pt-16 pb-12 border-b border-[#112D16]/12">
      <div ref={containerRef} className="container mx-auto px-4 max-w-4xl text-center">
        <div className="flex flex-wrap justify-center text-center leading-[1.15] text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]">
          {wordStructures.map((w, wIdx) => (
            <span key={wIdx} className="inline-block whitespace-nowrap mr-3 lg:mr-4 my-1">
              {w.chars.map((char, cIdx) => {
                const flatIndex = w.startIndex + cIdx;
                const start = flatIndex / totalChars;
                const end = start + (1 / totalChars);
                return (
                  <Character key={cIdx} progress={scrollYProgress} range={[start, end]}>
                    {char}
                  </Character>
                );
              })}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
