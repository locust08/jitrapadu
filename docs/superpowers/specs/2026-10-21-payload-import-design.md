# Payload CMS and original-site import

## Outcome

Add a local Payload CMS to the existing Jitrapadu Next.js application. Extract reusable public content and media from the five sitemap-listed original pages. Import content as drafts for human review; preserve the public frontend until content is approved and deliberately connected.

## Scope and choices

- Integrate Payload in the existing application with separate `(frontend)` and `(payload)` route layouts so Tailwind/site styles do not alter the admin.
- Use Payload's SQLite adapter for the local review database. Store database, downloaded assets and uploads outside the public frontend and exclude runtime data and secrets from Git. Production database/storage/deployment remain a later configuration task.
- Admin users authenticate through Payload. Do not create a predictable password or expose a bootstrap endpoint. The owner creates the initial account through Payload's first-user flow on localhost.
- Collections: Users, Media, Source Pages, Solutions, FAQs, Partners. A versioned Site Settings global holds contact details/social/directions information.
- Content collections and Site Settings use versions/drafts. Anonymous reads return only published records. CMS write operations require an authenticated user; user administration is restricted to admins. Public Media access must be deliberately controlled during review so importing draft content does not expose unapproved assets.
- Source fields include stable import key, original URL, extraction date and review notes. Retain the raw HTML snapshot and extraction manifest locally for traceability.
- Media records retain source URL, checksum, original filename, source pages, existing alt text and review status. Do not invent descriptions from opaque filenames. Download original `src` assets and the MP4 sources; avoid redundant WebM encodings and responsive variants initially.
- Only import source-derived facts and wording. Flag conflicting Green Xperts contact information, duplicated content, old copyright dates and unverified endorsement claims. Do not publish claims or manufacture News/Events/CSR entries.
- Source Pages retain readable extracted sections for review. Solutions seed Telecom, RDS, Smart Pole, Cell on Wheels and Sea Freight information where present; the latter two are source topics, not automatically new public routes. FAQs seed the four original questions. Partner assets can be staged with review labels when names are not confidently identifiable.
- Draft Site Settings should retain the Jitrapadu Klang address, phones, email and social/directions links; conflicting affiliate details stay in review notes and source snapshots.
- Build an explicit, repeatable import command. Stable keys prevent duplicate records; reruns skip existing records by default to preserve editor changes. Failed downloads/imports are reported and can be retried. Import writes always explicitly set draft status; never auto-publish.
- Set up review in `/admin`. Public page fetching, new public content pages, publishing hooks, live preview and content-driven frontend refactoring are deferred: they are not necessary to review the extracted drafts.

## Acceptance

1. Existing frontend routes still render with their existing design; `/admin` loads independently.
2. A local SQLite database contains draft source pages, reusable topic/FAQ records, staged assets and draft site settings with source provenance.
3. Anonymous API reads cannot return draft content or unapproved media; anonymous writes/user creation are denied after first-user bootstrap.
4. The import report reconciles discovered/downloaded/imported/skipped/failed counts and identifies conflicts. No failed item is silently counted as imported.
5. Running the import again creates no duplicates and does not overwrite human edits.
6. Extraction/import integrity tests, lint, typecheck and production build pass. Browser verification covers frontend regression and CMS review access.
7. Provide setup/review instructions and identify production dependencies. The report must distinguish local import readiness from deployed production CMS.

## Data handling

Only public source pages/assets are fetched. No forms are submitted and no third-party site is modified. Original certificates or private documents are not imported from Drive. Assets remain local pending review. Do not log credentials or commit SQLite files, secrets, downloaded binary bundles or generated administrator credentials.
