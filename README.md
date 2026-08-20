# DigiScale Infotech

> **Think Digital, Scale Smart**
> Premium Web Applications, Shopify Commerce, and AI Automation Solutions.

---

## About DigiScale Infotech

DigiScale Infotech is a forward-thinking digital product agency specializing in engineering high-performance custom web applications, bespoke Shopify e-commerce experiences, and smart AI-powered automation pipelines. We build scalable digital systems that translate complex technical architectures into simple, highly effective business outcomes.

---

## 🛠️ The Tech Stack

This project is built using a modern, fast, and light-weight frontend engineering stack:

*   **Core Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (for robust type safety).
*   **Build Tool**: [Vite](https://vite.dev/) (for instantaneous Hot Module Replacement).
*   **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS-first layout compiler).
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (for premium fluid component transitions).
*   **Scroll Engine**: [Lenis Smooth Scroll](https://lenis.darkroom.engineering/) (for smooth, high-fidelity browser scrolling).
*   **Router**: [Wouter](https://github.com/molecula-org/wouter) (ultra-lightweight client-side router).

---

## ✨ Features & Architecture

1.  **Direct Scroll Redirection**: A unified routing-aware scroll manager handles single-click cross-page section navigation (`#services`, `#vision-mission`, `#contact`) instantly on mount.
2.  **Sleek Career Applications Form**: Features a custom-built, single-page candidates details submission modal complete with dropzone resume file attachment mock validations.
3.  **High-Fidelity Mobile Responsiveness**: Elements reflow organically across viewports (1 column on mobile, 2 columns on tablets, 3-4 columns on desktop displays).
4.  **Google-Compliant SEO**: Integrates dynamic JSON-LD page schema injections on each viewport mount to maximize crawlability and trust scores.
5.  **Aggressive CDN Optimization**: Integrated Vercel configurations that automatically configure long-term cache expiration times for hashed static assets.

---

## 🚀 Getting Started

To launch the development server locally, navigate to the `frontend` folder and follow these commands:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/Hiren-Sutariya/DigiScale-Infotech.git

# Navigate to the frontend directory
cd DigiScale-Infotech/frontend

# Install node modules
npm install
```

### Run Local Development Server

```bash
npm run dev
```

The app will start running at `http://localhost:5173`.

### Build for Production

To compile and bundle assets into optimized, minified production builds under `dist/`:

```bash
npm run build
```