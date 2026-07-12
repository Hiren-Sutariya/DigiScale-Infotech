import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { lenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(<App />);

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);