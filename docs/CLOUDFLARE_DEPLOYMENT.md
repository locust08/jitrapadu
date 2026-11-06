# Review deployment

Current review address: https://jitrapadu.sites.locus-t.com

Deployed through Sites on 3 November 2026. The custom domain and HTTPS are active.
The current Site audience is public (verified on 5 November 2026). Preserve its
current access settings when publishing updates.

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

DNS in the `locus-t.com` zone uses a DNS-only CNAME from `jitrapadu.sites` to
`custom-domains.chatgpt.site`, plus the verification TXT records returned by Sites.
Preserve the Site identity in `.openai/hosting.json` for future publications.

The contact form remains disabled until explicitly activated for publishing.
Payload, its private drafts and uploads, and admin/API routes are excluded.

## Legacy Cloudflare Worker

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

The Worker is named `jitrapadu` in Eason CF Main and serves the exported files using Workers Static Assets. This uses direct uploads; GitHub pushes do not automatically deploy. No custom-domain or DNS changes are part of this setup.

Payload and the contact API remain local. The current Cloudflare build exports static pages; hosting the backend requires a separate deployment. See README-JITRAPADU.md for the CMS and review export instructions.
