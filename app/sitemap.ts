import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/contact", "/privacy", ...services.map(s => `/services/${s.slug}`)].map(path => ({ url: `${site.url}${path}` }));
}
