# Start here — SurgeMatrix website

This archive contains the updated source and assets, including the darker charcoal and green theme, contact phone field, and server-side EmailJS integration.

## Run locally

1. Extract the archive and open a terminal in the `surgematrix-new` folder.
2. Install Node.js 24 LTS (or a version compatible with the project).
3. Run `npm ci` to install the dependencies from the included lockfile.
4. Configure EmailJS as described below.
5. Run `npm run dev` and open http://localhost:3000.

For a production server, run `npm run build` followed by `npm start`. The contact endpoint needs a Node-compatible server; use a Next.js host rather than static-only hosting.

## Restore your EmailJS configuration

Private credentials are deliberately excluded from this archive. For local use, copy your existing private `.env.local` from the original project into this extracted folder. That original credentials file has been kept out of the ZIP.

Alternatively, copy `.env.example` to `.env.local` and fill in:

- `EMAILJS_SERVICE_ID`: your EmailJS service ID (the configured service is `service_8zl7icl`).
- `EMAILJS_TEMPLATE_ID`: `template_aorxifl`.
- `EMAILJS_PUBLIC_KEY`: your EmailJS account public key.
- `EMAILJS_PRIVATE_KEY`: your EmailJS account private key.
- `NEXT_PUBLIC_SITE_URL`: `http://localhost:3000` locally, or your exact HTTPS site origin in production.
- `CONTACT_TRUSTED_IP_HEADER`: optional; set only when your hosting proxy overwrites the chosen header on every request.

Keep `EMAILJS_PRIVATE_KEY` in server environment configuration. Do not add a `NEXT_PUBLIC_` prefix to it or put it in browser code. On your hosting provider, configure the same server environment variables rather than uploading `.env.local` publicly.

The main template `template_aorxifl` is linked to acknowledgement template `template_fcgo83n` in the owner's EmailJS account. The acknowledgement is addressed to the submitter and configured to come from/reply to `surgematrixx@gmail.com`. The website sends `name`, `email`, `phone`, `company`, `service`, and `message`; the linked acknowledgement is handled by EmailJS. The account must allow API requests from non-browser applications for server-side sending.

See `README.md` for full setup and project documentation. Dependencies, build output, logs, and credentials are excluded to keep this source package portable.
