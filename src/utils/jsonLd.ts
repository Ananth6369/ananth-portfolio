import { SITE_CONFIG } from "@/constants/seo";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    jobTitle: SITE_CONFIG.author.role,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/profile-headshot.png`,
    sameAs: [
      SITE_CONFIG.author.github,
      SITE_CONFIG.author.linkedin,
      SITE_CONFIG.author.medium,
    ],
    knowsAbout: SITE_CONFIG.secondaryKeywords,
    occupation: {
      "@type": "Occupation",
      name: SITE_CONFIG.primaryKeyword,
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ananth A Portfolio & Engineering Hub",
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
  };
}

export function generateWebPageSchema(title: string, description: string, path: string = "") {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: `${SITE_CONFIG.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

export function generateBlogSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Engineering Notes",
    description: description,
    url: `${SITE_CONFIG.url}/blogs`,
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    about: SITE_CONFIG.secondaryKeywords,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
