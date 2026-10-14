import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).refine(value => {
    if (!value) return true;
    const digits = value.replace(/\D/g, "").length;
    return /^[+0-9() .-]+$/.test(value) && digits >= 7 && digits <= 15;
  }, "Enter a valid phone number with 7–15 digits.").optional().default(""),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum(["Digital Services", "Business Solutions", "Content & Creative", "AI Solutions", "Not sure yet"]),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(200).optional().default("")
});


