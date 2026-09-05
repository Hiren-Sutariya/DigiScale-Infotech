import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppButton() {
  const whatsappNumber = "919898213183";
  const defaultMessage = encodeURIComponent(
    "Hello DigiScale Infotech! I am interested in web development / software solutions for my business."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("Floating Widget")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Chat with DigiScale Infotech on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current text-white animate-pulse" />
      <span className="text-sm font-bold tracking-wide hidden sm:inline-block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
