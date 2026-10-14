# Verification

Verified on 14 October 2026 with Node.js 24.19.0, npm 11.17.0 and Next.js 16.4.0.

- TypeScript: passed (`npm run typecheck` and production build type checking).
- ESLint: passed with TypeScript, React Hooks and JSX accessibility rules.
- Production build: passed. Home, privacy and four service pages are prerendered. Contact and the API use the server.
- API regression tests: 3 passing suites covering schema validation, limiter separation/expiry, origin rejection, content type, malformed/oversized JSON, honeypot, missing delivery configuration, throttling, authenticated webhook acceptance, failed delivery, network failure and insecure endpoint rejection. Delivery was mocked; no real enquiries were sent.
- Production HTTP checks: all 7 pages and 14 distinct internal link/asset destinations returned 200. Fragment targets exist. Unknown page/service return 404. Unconfigured delivery returns 503 rather than a false success. Browser security headers are present.
- Browser: all 7 pages checked at 320, 768 and 1440 px widths, each with one primary heading and no horizontal overflow. Additional home/contact checks at 390 and 820 px. Mobile menu selection closes navigation; service CTA preselects Digital Services; FAQ expands; valid brief download displays an explicit unsent confirmation. No warning/error console entries observed in the tested contact flow.
- Performance: Motion removed; public content rendered on the server; no external images/fonts/scripts. Initial home script assets total approximately 175 KiB when gzip-compressed (565 KiB raw) including the framework. This is an asset measurement, not a Lighthouse score or a measured before/after comparison.
- Dependency audit: 0 reported vulnerabilities, including development dependencies, at verification time.

Limits: browser checks used desktop browser viewport overrides, not physical devices. No Lighthouse, load testing, external penetration test, real email delivery or multi-instance rate-limit test was performed. Configure EmailJS and test real email delivery before enabling online enquiries. CSP retains inline support for framework rendering; throttling is per process. See README for production configuration.

The ZIP contains source, lockfile, tests, public assets and documentation. Dependency folders, build output and local secrets are excluded.

## Hero revision
The hero now uses the original morphing grid style with automatic six-second service changes, manual selectors and pause controls. AI is presented as a current service. The revision retains lightweight CSS animation and supports reduced motion.
- Hero browser verification: automatic advancement observed, manual selection and pause verified. All four slides have stable card height and no horizontal overflow at 320, 768 and 1440 px widths. AI Solutions is accepted by server validation.
- Revised home initial script assets: 584,482 bytes raw / 181,279 bytes gzip (about 177 KiB gzip); approximately 2.3 KiB gzip added for the service carousel.

## Circular hero and theme verification
- Build, TypeScript and lint passed for the circular six-node hero and theme toggle.
- Both themes checked across all seven pages at 320 and 768 px widths; no horizontal overflow. Home also checked at 1440 px in both themes.
- Theme preference survives reload and page navigation; no browser warnings or errors observed in the tested flow.
- Logo and icon entry points plus public/logos variants use #19a844. Theme storage is documented in the privacy page.

## Reference logo verification
- Rebuilt with matching light/dark logo SVGs and a multi-size ICO favicon. Header logo assets loaded in both themes at 320, 768 and 1440 px without horizontal overflow.
- Vector PDF export visually reviewed after rendering. Separate logo format archive includes SVG, transparent PNG/WebP, JPG, PDF, EPS, ICO and PDF-compatible Illustrator exchange files.
- Raster reference artwork was traced; original editable production curves were not supplied.

## Service process / navbar verification
- Lint and production build passed.
- Browser checks verified distinct six-step labels and six different step explanations for each of the four services; the next-step control completes each cycle.
- Header toggle is immediately before the project CTA in the desktop action group. Both themes and 320/768/1440 px layouts passed horizontal-overflow checks.
- Shared process descriptions are also rendered on the four service detail pages.

## Service imagery verification
- Lint, TypeScript and production build passed after adding four custom service images.
- All four service pages checked in light/dark themes at 320, 768 and 1440 px widths: no horizontal overflow, image assets loaded, and no browser warning/error messages observed.
- Local image files and responsive image optimiser endpoints returned successful image responses for all four services.
- Four 1280x720 WebP files total approximately 195 KiB, with responsive delivery and lazy loading. Image briefs and provenance are documented in docs/service-images.md.

## Logo navigation verification
- Production build and TypeScript passed. Lint passed for the new link component.
- Browser checks: a homepage section link returns to / with no fragment and scroll position 0; a service page navigates to the homepage; the mobile menu closes; the footer logo also returns to scroll position 0.
