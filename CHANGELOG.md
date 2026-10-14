# Changes

- Rewrote the home and contact copy around visitor goals, with clear scope and next steps.
- Added four service detail pages, practical examples, deliverables and preselected enquiry topics.
- Made service and creative cards real links, and added expandable FAQs and privacy information.
- Refined the existing neutral/lime identity with rounded cards, a lightweight grid illustration and stronger layout hierarchy.
- Improved phone/tablet/desktop layouts, touch targets, navigation labels, focus states, contrast, skip links and reduced-motion behavior.
- Removed Motion and its client animation wrappers/timer; public service pages are statically generated and content is visible without JavaScript.
- Fixed the asynchronous form reset bug and restored browser validation. Added a useful project-brief download and truthful delivery states.
- Implemented optional authenticated HTTPS webhook delivery with timeouts and no redirects; removed the success-only placeholder.
- Hardened origin checks, streamed payload limits, rate-limiter memory bounds, no-store errors and secret handling.
- Updated framework/runtime dependencies, added a reproducible lockfile and removed vulnerable lint-tool dependencies while retaining TypeScript, React Hooks and accessibility lint checks.
- Expanded the sitemap and corrected missing-page recovery text.
- Included API regression tests, production smoke checks and setup documentation.

## Hero service animation revision
- Restored the original morphing matrix style with lightweight CSS transitions.
- Added automatic six-second service stories for websites, business solutions, content and creative, and AI solutions.
- Added service detail links, manual service selectors and a pause control. Rotation pauses on hover/focus and respects reduced motion and hidden tabs.

- Updated AI to a currently available service across the hero, home page, service details, metadata and enquiry validation.

## Circular hero and green theme
- Replaced the grid illustration with the reference-style circular system: SM core, six labelled nodes, rotating particles and sequential highlights, while retaining automatic service stories.
- Added persistent light/dark switching with system preference on first visit and a control visible on mobile and desktop.
- Applied #19a844 to theme accents, the rendered logo, favicon and SVG logo assets; added public/logos variants.

## Reference logo correction
- Replaced the all-green mark and arrow with the supplied board's nine-circle logo and split-color Surge/Matrix lettering.
- Only the original lime accent is replaced with #19a844. Header and footer use appropriate light/dark SVG variants.
- Added multi-size favicon.ico and exported separate logo formats.

## Logo layout refinement
- Sized the original symbol and wordmark independently, aligned their vertical centres and tightened the gap.
- Added balanced desktop/mobile sizes and a slightly larger footer lockup. Logo artwork and colors are unchanged.

## New brand accent
- Changed the brand accent to #9CE63E across theme, logo variants, hero and favicon.
- Deleted the previously generated website logo folder and logo export directory, then created fresh assets in public/logos and logo-export-9ce63e.
- Preserved logo geometry and the approved lettering offset.

## Service processes and navigation
- Added distinct six-step processes for websites, business workflows, creative work and AI solutions, shared between the hero and service pages.
- Each hero step includes a clear explanation and a next-step control; service rotation allows all six steps to finish.
- Added a translucent green-tinted light navbar and moved a compact sun/moon toggle directly before the desktop project button.

## Service illustrations
- Added four custom illustrations for responsive websites, connected business workflows, creative content and reviewed AI workflows.
- Matched neutral/charcoal/lime art direction across the service pages, with readable captions and descriptive alt text.
- Compressed images into local WebP assets; responsive image delivery and lazy loading keep downloads small.

## Logo home navigation
- Header and footer logos now return to the homepage and reset the scroll position when already on it.
- Homepage section fragments are cleared; the mobile menu closes when returning home. Modified clicks retain normal browser link behaviour.
