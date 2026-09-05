import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  type?: "website" | "article" | "profile";
  customSchema?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE = "DigiScale Infotech";
const DOMAIN = "https://digiscaleinfotech.com";
const DEFAULT_IMAGE = `${DOMAIN}/og-image.jpg`;
const DEFAULT_KEYWORDS =
  "web development company surat, software company surat, shopify developer surat, AI automation surat, custom software development, mobile app development surat, digiscale infotech, website design surat gujarat";

function setTag(sel: string, attr: "name" | "property", attrVal: string, content: string) {
  let el = document.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEO({
  title,
  description,
  path,
  keywords,
  ogImage,
  type = "website",
  customSchema,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
    const desc =
      description ??
      `DigiScale Infotech – ${title}. Top web development, Shopify, AI automation & custom software engineering company in Surat, India.`;
    const kw = keywords ?? DEFAULT_KEYWORDS;
    const img = ogImage ?? DEFAULT_IMAGE;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url = `${DOMAIN}${cleanPath}`;

    // ── Document title ──
    document.title = fullTitle;

    // ── Primary Meta Tags ──
    setTag("meta[name='description']", "name", "description", desc);
    setTag("meta[name='keywords']", "name", "keywords", kw);
    setTag("meta[name='robots']", "name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setTag("meta[name='author']", "name", "author", SITE);
    setTag("meta[name='geo.region']", "name", "geo.region", "IN-GJ");
    setTag("meta[name='geo.placename']", "name", "geo.placename", "Surat, Gujarat, India");

    // ── Canonical Tag ──
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // ── Open Graph Tags (Facebook, LinkedIn, WhatsApp) ──
    setTag("meta[property='og:title']", "property", "og:title", fullTitle);
    setTag("meta[property='og:description']", "property", "og:description", desc);
    setTag("meta[property='og:url']", "property", "og:url", url);
    setTag("meta[property='og:image']", "property", "og:image", img);
    setTag("meta[property='og:type']", "property", "og:type", type);
    setTag("meta[property='og:site_name']", "property", "og:site_name", SITE);
    setTag("meta[property='og:locale']", "property", "og:locale", "en_IN");

    // ── Twitter Card Tags ──
    setTag("meta[name='twitter:card']", "name", "twitter:card", "summary_large_image");
    setTag("meta[name='twitter:title']", "name", "twitter:title", fullTitle);
    setTag("meta[name='twitter:description']", "name", "twitter:description", desc);
    setTag("meta[name='twitter:image']", "name", "twitter:image", img);
    setTag("meta[name='twitter:site']", "name", "twitter:site", "@digiscaleinfotech");

    // ── Dynamic JSON-LD Page & Breadcrumb Schema ──
    let schemaEl = document.querySelector("#jsonld-page-schema") as HTMLScriptElement | null;
    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.id = "jsonld-page-schema";
      schemaEl.type = "application/ld+json";
      document.head.appendChild(schemaEl);
    }

    const pageSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url: url,
      name: fullTitle,
      description: desc,
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        url: DOMAIN,
        name: SITE,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        name: SITE,
        url: DOMAIN,
        logo: `${DOMAIN}/logo.png`,
      },
    };

    const breadcrumbs: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      ],
    };

    if (cleanPath !== "/") {
      const pageName = title.split("|")[0].trim();
      (breadcrumbs.itemListElement as Record<string, unknown>[]).push({
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: url,
      });
    }

    const schemaGraph = [pageSchema, breadcrumbs];
    if (customSchema) {
      if (Array.isArray(customSchema)) {
        schemaGraph.push(...customSchema);
      } else {
        schemaGraph.push(customSchema);
      }
    }

    schemaEl.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph,
    });
  }, [title, description, path, keywords, ogImage, type, customSchema]);

  return null;
}
