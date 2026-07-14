import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  path: string;
}

export default function SEO({ title, description, path }: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = `${title} | DigiScale Infotech`;

    // 2. Update meta description
    if (description) {
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // 3. Update canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    canonicalLink.setAttribute("href", `https://digiscaleinfotech.com${cleanPath}`);

    // 4. Update og:url URL
    let ogUrl = document.querySelector("meta[property='og:url']");
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", `https://digiscaleinfotech.com${cleanPath}`);
  }, [title, description, path]);

  return null;
}
