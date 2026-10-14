# SurgeMatrix website

Next.js 16.4 App Router, React 19.3, TypeScript, Zod and plain CSS. The original framework and branding are retained. No external fonts, analytics, stock-image downloads or animation library are required.

## Run

Use Node.js 22.13+ (Node 24 LTS recommended for the lint tools).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production:

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

For the live production smoke checks, start the server in another terminal and run:

```sh
# PowerShell; use the actual preview origin
$env:CHECK_BASE_URL = "http://localhost:3000"
node tests/smoke.mjs
```

The smoke check expects online delivery to be unconfigured. API unit tests mock delivery and never send real enquiries.

## Pages and interactions

- Home: plain-language services, process, content use cases and expandable FAQs.
- Four service pages: suitability, deliverables, preparation advice and a service-specific enquiry link.
- Contact: required-field validation, selected service, loading/error states and EmailJS enquiry delivery.
- Privacy: explains EmailJS enquiry delivery and data handling.
- Missing pages: helpful 404 with working navigation.
- Mobile menu: labelled toggle, closes on selection, Escape and desktop resize. Skip link, focus indicators and reduced-motion support.

## Enquiry delivery

The contact API validates and rate-limits submissions before forwarding them to EmailJS. It only reports a sent enquiry after EmailJS accepts the request.

To enable online enquiries, copy `.env.example` to `.env.local` for local work, or set these environment variables on your host. Without them, the contact form clearly reports that delivery is unavailable and does not claim to have sent the enquiry.

- `NEXT_PUBLIC_SITE_URL`: exact canonical HTTPS origin, without a trailing slash. Set before building and starting.
- `EMAILJS_SERVICE_ID`: service ID from your EmailJS dashboard.
- `EMAILJS_TEMPLATE_ID`: template ID from your EmailJS dashboard.
- `EMAILJS_PUBLIC_KEY`: EmailJS account public key.
- `EMAILJS_PRIVATE_KEY`: EmailJS account private key. It is read only by the server; do not prefix it with `NEXT_PUBLIC_` or expose it in client code.
- `CONTACT_TRUSTED_IP_HEADER`: optional host-specific client IP header. Set only when your proxy overwrites it on every request. Otherwise all submissions share a safe, stricter rate-limit bucket.

The API sends `name`, `email`, `phone`, `company`, `service` and `message` as EmailJS template parameters. Use those exact variable names in your EmailJS template, then set the recipient and reply-to address in the EmailJS dashboard (reply-to can use `{{email}}`). Requests time out after 8 seconds. Failed delivery leaves form contents available for retry. Automated tests mock the provider. A live enquiry was accepted by EmailJS during local setup; inbox receipt was not independently confirmed.

### Welcome / enquiry acknowledgement

Local account configuration verified on 14 October 2026: main template `template_aorxifl` is linked to acknowledgement template `template_fcgo83n`. EmailJS History reported OK for both messages from one website submission. Inbox receipt was not independently checked. The acknowledgement is addressed to the submitted email; replies go to the connected SurgeMatrix mailbox.

EmailJS can send a welcome reply automatically using its native linked template feature: https://www.emailjs.com/docs/user-guide/auto-reply/.

Create a separate template named **SurgeMatrix — Enquiry acknowledgement**. Set **To Email** to `{{email}}`, **From Name** to `SurgeMatrix`, set **From Email** to `surgematrixx@gmail.com` with **Use Default Email Address** unchecked, and set **Reply-To** to `surgematrixx@gmail.com`. This address is the Gmail account connected to `service_8zl7icl`. Use this subject and body:

```text
Subject: Thanks for contacting SurgeMatrix

Hi {{name}},

Thank you for reaching out to SurgeMatrix. We’ve received your enquiry about {{service}} and look forward to learning more about your project.

Our team will review your details and get back to you. If you’d like to add anything, simply reply to this email.

Best,
The SurgeMatrix team
```

Open the main enquiry template, then its **Auto-Reply / Linked Template** tab, select the acknowledgement template, and save. EmailJS receives the same template parameters for both messages. This needs no second API call or extra credentials in the website; the private key remains server-only. The linked reply uses an additional EmailJS request quota. Add `Phone: {{phone}}` to the main enquiry email's body to show phone numbers. Sending a `phone` parameter alone does not change the saved email template.

## Security and launch notes

- Exact origin validation; cross-site and missing-Origin POSTs rejected.
- Server validation, streamed 20 KB request limit, honeypot and throttling.
- Bounded in-memory rate limiter; Retry-After and no-store API responses.
- EmailJS private key stays in server-side environment configuration and is not returned to the browser.
- Browser headers restrict framing, third-party connections and device permissions; framework identification disabled.
- CSP keeps inline script/style support required by the current rendering approach. It is not a nonce-based strict CSP. Development alone allows eval/WebSocket connections.
- In-memory throttling is per process. Use a shared rate limiter and edge request-size/timeout protection for multiple instances or public production traffic.
- Configure the public URL, EmailJS service/template, retention policy and operator contact details before enabling online enquiries. Rotate any EmailJS private key that has been exposed; store the replacement only in server-side environment settings. Update the privacy page if your handling policies differ.
- Use a Node-compatible Next.js host; the API and contact page require a server. This is not a static-only export.

A package lock is included. Dependency audits reflect the registry at the time checks run; re-run `npm audit` when deploying.

See `CHANGELOG.md` and `VERIFICATION.md` for delivered changes and checks.

## Hero showcase

The hero cycles through all four service categories every nine seconds. The process advances every 1.5 seconds, inspired by the original animation. Visitors can choose a service or pause rotation. Hover and keyboard focus pause the showcase; reduced-motion preferences disable automatic rotation. No animation library is needed.

## Theme and logos

The header theme button switches light and dark palettes. The choice is stored locally; first visits follow the device preference. The early theme script prevents a bright flash on reload. Theme storage contains only this preference. SVG assets are in public/logos (logo.svg, icon.svg and mark.svg); public/logo.svg and public/icon.svg remain compatible entry points. The brand green is #9CE63E.

## Current logo

Website logos now match the supplied brand board: eight black/white dots, green centre, black/white Surge and green Matrix. SVG paths are traced from the raster board rather than rendered with a substitute font. See the separate logo format kit for export variants and source-fidelity notes.
