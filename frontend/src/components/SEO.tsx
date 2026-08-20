import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  path: string;
  keywords?: string;
  ogImage?: string;
}

const SITE = "DigiScale Infotech";
const DOMAIN = "https://digiscaleinfotech.com";
const DEFAULT_IMAGE = `${DOMAIN}/og-image.jpg`;
const DEFAULT_KEYWORDS =
  "web development company surat, software company surat, shopify developer, AI automation surat, digiscale infotech";


function setTag(sel: string, attr: "name" | "property", attrVal: string, content: string) {
  let el = document.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEO({ title, description, path, keywords, ogImage }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE}`;
    const desc = description ?? `DigiScale Infotech – ${title}. Web development, Shopify, AI automation & custom software in Surat, India.`;
    const kw = keywords ?? DEFAULT_KEYWORDS;
    const img = ogImage ?? DEFAULT_IMAGE;
    const url = `${DOMAIN}${path.startsWith("/") ? path : `/${path}`}`;

    // ── Document title ──
    document.title = fullTitle;

    // ── Basic meta ──
    setTag("meta[name='description']",       "name", "description", desc);
    setTag("meta[name='keywords']",          "name", "keywords", kw);
    setTag("meta[name='robots']",            "name", "robots", "index, follow, max-snippet:-1, max-image-preview:large");

    // ── Canonical ──
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // ── Open Graph ──
    setTag("meta[property='og:title']",       "property", "og:title",       fullTitle);
    setTag("meta[property='og:description']", "property", "og:description", desc);
    setTag("meta[property='og:url']",         "property", "og:url",         url);
    setTag("meta[property='og:image']",       "property", "og:image",       img);
    setTag("meta[property='og:type']",        "property", "og:type",        "website");
    setTag("meta[property='og:site_name']",   "property", "og:site_name",   SITE);
    setTag("meta[property='og:locale']",      "property", "og:locale",      "en_IN");

    // ── Twitter ──
    setTag("meta[name='twitter:card']",        "name", "twitter:card",        "summary_large_image");
    setTag("meta[name='twitter:title']",       "name", "twitter:title",       fullTitle);
    setTag("meta[name='twitter:description']", "name", "twitter:description", desc);
    setTag("meta[name='twitter:image']",       "name", "twitter:image",       img);

    // ── JSON-LD Structured Data for Current Page ──
    let schemaEl = document.querySelector("#jsonld-schema") as HTMLScriptElement | null;
    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.id = "jsonld-schema";
      schemaEl.type = "application/ld+json";
      document.head.appendChild(schemaEl);
    }
    const pageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      "url": url,
      "name": fullTitle,
      "description": desc,
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": DOMAIN,
        "name": SITE
      }
    };
    schemaEl.text = JSON.stringify(pageSchema);
  }, [title, description, path, keywords, ogImage]);

  return null;
}
