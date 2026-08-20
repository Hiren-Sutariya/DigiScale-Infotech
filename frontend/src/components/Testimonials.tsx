import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="relative py-16 lg:py-20 bg-[#C6D6B1] overflow-hidden border-b border-[#112D16]/12">
      
      {/* Huge Outlined REVIEWS Text in Background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none select-none overflow-hidden z-0">
        <span 
          className="text-[18vw] font-black uppercase text-transparent tracking-[0.25em] leading-none whitespace-nowrap" 
          style={{ 
            WebkitTextStroke: "1.5px rgba(17,45,22,0.08)", 
            fontFamily: 'Impact, sans-serif' 
          }}
        >
          REVIEWS
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-[#112D16] uppercase tracking-wider mb-3"
            >
              What Clients Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#112D16]/80 font-medium"
            >
              Don't just take our word for it.
            </motion.p>
          </div>
          
          {/* Navigation buttons matching the light green theme */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-12 h-12 border-[#112D16]/20 bg-white/50 text-[#112D16] hover:bg-white/90 hover:text-[#112D16]" 
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-12 h-12 border-[#112D16]/20 bg-white/50 text-[#112D16] hover:bg-white/90 hover:text-[#112D16]" 
              onClick={scrollNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* embla slider with cards layout */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-4 md:-ml-8 cursor-grab active:cursor-grabbing">
            {testimonials.map((testimonial, idx) => {
              const handleName = `@${testimonial.company.toLowerCase().replace(/\s+/g, '')}`;

              return (
                <div key={idx} className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-8">
                  <div className="bg-white/75 border border-[#112D16]/15 backdrop-blur-xl rounded-[24px] p-8 h-full flex flex-col shadow-sm hover:shadow-md relative group transition-all duration-300">
                    
                    {/* Review text */}
                    <p className="text-[#112D16]/90 text-[16px] mb-8 flex-grow leading-relaxed font-medium">
                      "{testimonial.text}"
                    </p>
                    
                    {/* User profile layout */}
                    <div className="flex items-center gap-4 mt-auto border-t border-[#112D16]/10 pt-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full border border-[#112D16]/15 bg-white shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-[#112D16] leading-tight">{testimonial.name}</h4>
                        <p className="text-[13px] text-[#112D16]/60 leading-tight mt-0.5">{handleName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}