# SurgeMatrix — Next.js Website

A responsive, minimal digital-services website for SurgeMatrix: digital services, business solutions, content & creative, and future AI products/services.

## Stack
- Next.js 16 App Router + TypeScript
- React 19
- Motion for React
- Zod validation
- Plain CSS (no Tailwind dependency)

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Production check:

```bash
npm run lint
npm run build
npm start
```

## Environment
Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the business number in international format when direct WhatsApp chats should open for that number.

The contact API is intentionally provider-neutral. Connect `app/api/contact/route.ts` to your CRM/email provider on the server; never put provider credentials in browser code.

## Security baseline
- CSP and common browser security headers
- `poweredByHeader` disabled
- Same-origin validation for the contact form
- Zod server-side validation
- Request body size limit
- Honeypot spam field
- Basic rate limiting
- No third-party scripts or analytics by default
- `prefers-reduced-motion` support

The included rate limiter is in-memory and therefore per-process. For a horizontally scaled production deployment, replace it with a shared limiter such as Redis/Upstash and use your hosting platform's trusted client-IP header.

## Structure

```text
app/
  api/contact/route.ts
  contact/page.tsx
  content/page.tsx
  globals.css
  services/page.tsx
  theme-vars.css
  layout.tsx
  loading.tsx
  not-found.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  animated-matrix.tsx
  contact-form.tsx
  logo.tsx
  reveal.tsx
  site-footer.tsx
  site-header.tsx
  theme-toggle.tsx
  whatsapp-button.tsx
lib/
  contact-schema.ts
  rate-limit.ts
  site.ts
public/
  icon.svg
```
