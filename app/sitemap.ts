import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: site.url, lastModified: new Date() }, { url: `${site.url}/services`, lastModified: new Date() }, { url: `${site.url}/content`, lastModified: new Date() }, { url: `${site.url}/contact`, lastModified: new Date() }]; }
