import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  company: z.string().min(2, "Company name is required"),
  requirement: z.string().min(1, "Please select a requirement"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const response = await fetch(`${API_URL}/inquiry/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          requirement: values.requirement,
          project_details: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      const data = await response.json();
      console.log(data);

      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {/* Contact Form */}
      <section id="contact" className="py-16 bg-accent/30 scroll-mt-28">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-border"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left Panel */}
              <div className="lg:col-span-2 bg-foreground text-white p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[260px] h-[260px] rounded-full bg-primary/20 blur-[80px]" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-3 text-white">
                    Let's Build Your Next Digital Product
                  </h3>
                  <p className="text-white/60 mb-10 text-base leading-relaxed">
                    Have a project in mind? Let's discuss your ideas and build something that delivers real business value.
                  </p>

                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: "Email us at", value: "hello@digiscaleinfotech.com" },
                      { icon: Phone, label: "Call us at", value: "+91 98982 13183" },
                      { icon: MapPin, label: "Visit us at", value: "Surat, Gujarat, India" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-white/40 mb-0.5">{label}</p>
                          <p className="font-medium text-white text-sm">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel — Form */}
              <div className="lg:col-span-3 p-10 lg:p-12 bg-white">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" className="h-11 bg-accent/30 border-border" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@company.com" className="h-11 bg-accent/30 border-border" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98982 13183" className="h-11 bg-accent/30 border-border" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company Name" className="h-11 bg-accent/30 border-border" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="requirement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Requirement</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-accent/30 border-border text-foreground">
                                <SelectValue placeholder="Select a requirement" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="web">Web Application</SelectItem>
                              <SelectItem value="ai-automation">AI Automation</SelectItem>
                              <SelectItem value="custom">Custom Software</SelectItem>
                              <SelectItem value="ecommerce">E-commerce Solution</SelectItem>
                              <SelectItem value="design">UI/UX Design</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project, goals, features, or any specific requirements."
                              className="min-h-[110px] resize-none bg-accent/30 border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-10 text-base font-semibold rounded-full bg-primary hover:bg-primary/90"
                    >
                      Get Free Consultation
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Location info */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Our Office</h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "Surat, Gujarat, India" },
                  { icon: Phone, label: "Phone", value: "+91 98982 13183" },
                  { icon: Mail, label: "Email", value: "hello@digiscaleinfotech.com" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wide">{label}</p>
                      <p className="text-foreground font-medium whitespace-pre-line text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="lg:col-span-2">
              <div className="w-full h-72 lg:h-80 rounded-2xl overflow-hidden border border-border/50 bg-accent/30 flex flex-col items-center justify-center gap-3 text-muted-foreground">
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
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
