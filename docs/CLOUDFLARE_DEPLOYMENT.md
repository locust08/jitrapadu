# Cloudflare deployment

Live site: https://jitrapadu.easondev.workers.dev

Initial deployment verified on 23 October 2026. Version: `dfedd74c-000b-4405-a1f6-39af1a586fcb`.

The website supports a static Next.js export. Current filters, animations, article pages and email-app enquiry preparation run in the browser and do not require a server.

## Commands

```sh
npm run build:cloudflare
npm run deploy:cloudflare
```

The build command delegates to `review:build`, which exports public frontend routes in an isolated workspace. The generated `temp/cloudflare-review/out/` directory is the only deployment upload directory. Normal development and standalone builds retain the Payload backend. Draft content, private uploads, credentials and CMS/admin/API routes are excluded from the review export. Published content is a build-time snapshot; rebuild to refresh it. BugHerd loads on every public page. The export is marked noindex.

Wrangler uses the account's existing local OAuth session. If multiple accounts are available, set `CLOUDFLARE_ACCOUNT_ID` to the selected account before deployment. Never commit API tokens or local OAuth files.

The Worker is named `jitrapadu` in Eason CF Main and serves the exported files using Workers Static Assets. This uses direct uploads; GitHub pushes do not automatically deploy. No custom-domain or DNS changes are part of this setup.

Payload and the contact API remain local. The current Cloudflare build exports static pages; hosting the backend requires a separate deployment. See README-JITRAPADU.md for the CMS and review export instructions.
