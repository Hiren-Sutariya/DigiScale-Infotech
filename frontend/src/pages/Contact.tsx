import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContact } from "@/api/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message is required"),
});
type ContactForm = z.infer<typeof contactSchema>;

const blobs = [
  { size: 260, x: "-5%", y: "10%", duration: 14, delay: 0 },
  { size: 180, x: "80%", y: "5%", duration: 18, delay: 2 },
  { size: 140, x: "55%", y: "60%", duration: 16, delay: 1 },
];

export default function Contact() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    document.title = "Contact | DigiScale Infotech";
  }, []);

  const onSubmit = async (data: ContactForm) => {
    try {
      await submitContact({
        full_name: data.name,
        email: data.email,
        phone: data.phone || "",
        company: data.company || "",
        service: data.service,
        message: data.message,
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again.",
        variant: "destructive",
      });

      console.error(error);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-14 overflow-hidden bg-white text-center">
        {/* Animated background blobs */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(#346BBC 1px, transparent 1px), linear-gradient(90deg, #346BBC 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute -z-10 rounded-full bg-primary/5 blur-[70px]"
            style={{ width: b.size, height: b.size, left: b.x, top: b.y }}
            animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
            transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/7 via-transparent to-transparent" />

        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium"
          >
            Let's Connect
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-2 leading-tight"
          >
            Let's Build Something Amazing Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Tell us about your project and we'll get back to you shortly.
          </motion.p>
        </div>
      </section>

      {/* ── Main Two-Column ── */}
      <section className="py-2">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left — Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white border border-border/50 rounded-2xl p-8 shadow-sm h-full flex flex-col gap-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Get In Touch</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Have a project or business idea? We'd love to understand your goals and discuss the right digital solution for your business.
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "hello@digiscaleinfotech.com", href: "mailto:hello@digiscaleinfotech.com" },
                    { icon: Phone, label: "Phone", value: "+91 98982 13183", href: "tel:+919898213183" },
                    { icon: Clock, label: "Office Hours", value: "Mon – Fri, 9 AM – 7 PM IST", href: null },
                    { icon: MapPin, label: "Location", value: "Surat, Gujarat, India", href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-foreground">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    We usually respond within one business day. For urgent inquiries, feel free to call us directly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white border border-border/50 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Full Name <span className="text-primary">*</span></label>
                      <Input {...register("name")} placeholder="Your name" className="h-11" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email <span className="text-primary">*</span></label>
                      <Input {...register("email")} placeholder="your@company.com" className="h-11" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                      <Input {...register("phone")} placeholder="+91 98982 13183" className="h-11" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Company Name</label>
                      <Input {...register("company")} placeholder="Your company" className="h-11" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Service Required <span className="text-primary">*</span></label>
                    <div className="relative">
                      <select
                        {...register("service")}
                        className="w-full h-11 pl-4 pr-9 rounded-md border border-input bg-background text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      >
                        <option value="">Select a service</option>
                        <option>AI Automation</option>
                        <option>Custom Software</option>
                        <option>Web Development</option>
                        <option>Mobile Apps</option>
                        <option>SaaS Development</option>
                        <option>UI/UX Design</option>
                        <option>SEO</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.service && <p className="text-destructive text-xs mt-1">{errors.service.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message <span className="text-primary">*</span></label>
                    <Textarea
                      {...register("message")}
                      placeholder="Tell us about your project, goals, timeline, and budget..."
                      rows={5}
                      className="resize-none"
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-base font-semibold shadow-sm"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-border/50 bg-accent/20"
          >
            {/* Map placeholder */}
            <div className="w-full h-64 lg:h-80 flex flex-col items-center justify-center gap-3 text-muted-foreground bg-accent/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d929.681490586898!2d72.88085726962528!3d21.24271269877882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f060ca53679%3A0x1078a3bd8887f1e3!2sMantra%20ITC!5e0!3m2!1sen!2sin!4v1783334666340!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="DigiScale Infotech Location"
              />
            </div>

            {/* Location strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40 bg-white px-6 py-5">
              {[
                { icon: MapPin, label: "Office Address", value: "Surat, Gujarat, India" },
                { icon: Phone, label: "Phone Number", value: "+91 98982 13183" },
                { icon: Mail, label: "Email", value: "hello@digiscaleinfotech.com" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 py-3 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0">
                  <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-foreground whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
