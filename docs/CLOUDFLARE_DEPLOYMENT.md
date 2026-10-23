# Cloudflare deployment

Live site: https://jitrapadu.easondev.workers.dev

Initial deployment verified on 23 October 2026. Version: `dfedd74c-000b-4405-a1f6-39af1a586fcb`.

The website supports a static Next.js export. Current filters, animations, article pages and email-app enquiry preparation run in the browser and do not require a server.

## Commands

```sh
npm run build:cloudflare
npm run deploy:cloudflare
```

The build command sets `CLOUDFLARE_STATIC_EXPORT=true` only for the child build process. Normal development and standalone builds keep their existing behaviour. The generated `out/` directory is the only deployment upload directory.

Wrangler uses the account's existing local OAuth session. If multiple accounts are available, set `CLOUDFLARE_ACCOUNT_ID` to the selected account before deployment. Never commit API tokens or local OAuth files.

The Worker is named `jitrapadu` in Eason CF Main and serves the exported files using Workers Static Assets. This uses direct uploads; GitHub pushes do not automatically deploy. No custom-domain or DNS changes are part of this setup.

For a future server-side enquiry service or other request-time features, review the hosting setup before adding server routes: the current Cloudflare build exports static pages.
