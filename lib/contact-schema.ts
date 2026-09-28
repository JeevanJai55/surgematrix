import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum(["Digital Services", "Business Solutions", "Content & Creative", "AI — Coming Next", "Not sure yet"]),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(200).optional().default("")
});
