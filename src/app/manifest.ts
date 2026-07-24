import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ananth A | Senior QA Automation Engineer Portfolio",
    short_name: "Ananth Portfolio",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: SITE_CONFIG.themeColor,
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
