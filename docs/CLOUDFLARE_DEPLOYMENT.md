# Review deployment

Current review address: https://jitrapadu.sites.locus-t.com

Migrated to the existing `jitrapadu` Worker in **Eason CF Main** on 11 November
2026. The review URL and HTTPS are active. The old workers.dev address and preview
URLs remain disabled; the contact form remains inactive.

## Current hosting

- Account: `e7c515dde995479daacd82ad79dfc3e8` (Eason CF Main).
- Worker: `jitrapadu`.
- Migration version: `1b402055-dad7-43d5-9d39-0c24dce0566a`.
- Approved application source: `901e0b907229a0f5ad48ed65d272be9ce422926b`.
- Public static export: `temp/cloudflare-review/out/`.
- Route: `jitrapadu.sites.locus-t.com/*` in the `digitalbee.ai` SaaS provider zone
  (`505c3ab8007c8a0ef1c1b2b19df4a4f9`). This intentionally differs from the
  hostname's DNS zone: `locus-t.com` is managed in another Cloudflare account.
- DNS: DNS-only CNAME `jitrapadu.sites.locus-t.com` to `fallback.digitalbee.ai`.
- The matching Cloudflare for SaaS custom hostname in Eason CF Main has an active
  certificate and hostname, with minimum TLS 1.2. Ownership and certificate TXT
  records were added to the `locus-t.com` zone. The shared fallback origin was
  preserved; only this hostname's traffic is routed to `jitrapadu`.
- `workers_dev: false` and `preview_urls: false` are tracked in both Wrangler
  configurations, preventing later deployments from reactivating the old address.

The approved 12 November release includes BugHerd #111–114: centred milestone
years, logo-area carousel pausing, removal of hidden About banner layers, and
nine supplied replacement certificates with the other three cards removed.
Those tasks remain Ready for Review; #77 remains pending additional project photos.

Verified after cutover: homepage matches the uploaded Eason export byte for byte;
contact and RDS solution pages return HTTP 200; the contact submit button remains
disabled; the old workers.dev address returns HTTP 404. Static-export tests pass.

For future releases, use `npm run deploy:cloudflare`. GitHub pushes do not deploy
automatically. Do not use the former Sites source workflow for the active URL.

## Former Sites hosting (historical rollback reference)

Sites hosted the review URL from 3–11 November 2026. Its custom-domain binding was
removed during migration, verified by an empty custom-domain list. The saved Site
and versions were retained; they no longer serve the active review hostname.

Initial Sites publication, 3 November 2026:

- Project: `appgprj_6ae940d67ad4819190013fa9d20fb7de`
- Deployment: `appgdep_6ae94833e54c8191909fc756bc6f2ae3`
- Pushed deployment source: `b98bc3c5cc63b57a0a2af0454bd2a7c7b1fae3bb`
- Source checkout: ignored `sites/jitrapadu-sites-source/`
- Static output: that checkout's `dist/`

Run `npm run review:build`, then `node scripts/prepare-sites-review.mjs` to copy the
review export and convert PNGs to WebP at quality 95, retaining dimensions and
original source assets. The 3 November export contains 433 files, about 99 MB.
Use the Sites source workflow helper to commit/push and package the output before
deploying the exact returned source commit and archive. Source pushes have a
64 MiB limit; split changed media into smaller pushes when necessary, and deploy
only after the complete output is uploaded. Archives must stay below 256 MiB.
The parent GitHub repository is separate. Commit and push approved source changes
there before updating the Sites deployment checkout. `export-integrity.json` in
that checkout records the parent source commit used for the publication.

The approved 6 November update includes BugHerd #94–110. Keep those tasks in Ready
for Review. Task #77 awaits additional photos for the remaining seven projects;
Kajang and Changkat Jong now have verified extra gallery views, shared by portfolio
and solution pages. The contact form remains disabled for review.

The former CNAME target was `custom-domains.chatgpt.site`. Its original validation
TXT records were retained for rollback; they do not route review traffic. The
ignored Sites checkout is historical and is not the current deployment target.

The contact form remains disabled until explicitly activated for publishing.
Payload, its private drafts and uploads, and admin/API routes are excluded.

## Disabled workers.dev address

Previous review address: https://jitrapadu.easondev.workers.dev

Initial deployment verified on 23 October 2026. Version: `dfedd74c-000b-4405-a1f6-39af1a586fcb`.

The website supports a static Next.js export. Current filters, animations and article pages run in the browser and do not require a server. The contact form remains inactive.

## Commands

```sh
npm run build:cloudflare
npm run deploy:cloudflare
```

The build command delegates to `review:build`, which exports public frontend routes in an isolated workspace. The generated `temp/cloudflare-review/out/` directory is the only deployment upload directory. Normal development and standalone builds retain the Payload backend. Draft content, private uploads, credentials and CMS/admin/API routes are excluded from the review export. Published content is a build-time snapshot; rebuild to refresh it. BugHerd loads on every public page. The export is marked noindex.

Wrangler uses the account's existing local OAuth session. If multiple accounts are available, set `CLOUDFLARE_ACCOUNT_ID` to the selected account before deployment. Never commit API tokens or local OAuth files.

The Worker is named `jitrapadu` in Eason CF Main and serves the exported files using Workers Static Assets. Its active route is the review hostname listed above; its workers.dev and preview URLs must stay disabled.

Payload and the contact API remain local. The current Cloudflare build exports static pages; hosting the backend requires a separate deployment. See README-JITRAPADU.md for the CMS and review export instructions.
