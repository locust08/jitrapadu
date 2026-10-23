# Jitrapadu website

Built from the supplied editable Figma design, with prototype behavior references. The upstream template's MIT license is preserved in LICENSE.

## Run

Use Node.js 24 or later.

```powershell
npm ci
npm run dev
```

For the verified production preview:

```powershell
npm run build
npm run preview
```

Open http://localhost:3001. The preview command prepares the standalone static files and starts the server. Stop it with Ctrl+C.

## Pages

| Figma design frame | Local route |
| --- | --- |
| Home — 1:2064 | / |
| About Us — 14:725 | /about-us |
| Telecom Tower & Monopole — 60:618 | /solutions/telecom-tower-monopole |
| Our Factory — 75:1179 | /our-factory |

Design file: https://www.figma.com/design/FAnfnPaXeloTTZKS5YajIW/Jitra-Padu--dev-?node-id=2-3
Prototype: https://www.figma.com/proto/xTpPetri1XBx9CIiLoOFzX/Jitra-Padu?node-id=1-2064&page-id=2%3A3

## Implementation

Next.js 16.4.2, React 19, TypeScript and Tailwind CSS 4. Inter and Font Awesome match the design. Original image layers, crops, logos, document images, mask illustrations and cloud video are local assets. Original Figma shader WGSL is retained.

Desktop compositions use the original 1920px coordinates and scale proportionally. Below 1024px the layout reflows using the source mobile typography tokens; full mobile page frames were not supplied.

There are 18 React components, 20 specification files (18 component contracts and two interaction/responsive briefs), and 120 source asset files: 108 PNGs, 6 SVGs, 2 MP4s, 2 video posters and 2 icon fonts. Inter is self-hosted by Next.js.

The public enquiry buttons currently open the published email address. Payload supplies published content to the matching existing sections described below.

## Payload CMS — local review

Payload 3.91.0 is installed in this application. Published CMS content replaces matching website sections on a full page refresh. Imported CMS drafts remain private; sections without eligible published content retain the existing frontend fallback. Website and admin layouts are isolated in route groups.

Start the local review server with `npm run dev` and open http://localhost:3001/admin. Create the first administrator account in Payload's first-user screen. No permanent account or password has been preconfigured. The first account becomes the administrator; only administrators can create or manage subsequent users. Editors can review and edit content but cannot administer users.

Local dev/start/preview commands bind to localhost, matching the admin redirect origin. The local `.env` was generated with a random secret. On a fresh checkout, copy `.env.example` to `.env`, generate a random value for `PAYLOAD_SECRET`, and create `temp/cms/`. Never commit the real environment file. The database defaults to `temp/cms/payload.db`, and uploaded assets live in `temp/cms/uploads/`. An absolute SQLite `DATABASE_URI` can override the default database location. Production database, persistent media storage, email delivery and deployment are not configured by this local setup.

### Imported review material

- **Source Pages:** five original-site snapshots, extracted text/metadata and media relationships.
- **Solutions:** five source topics, including Cell on Wheels and Sea Freight as review material, not extra approved public routes.
- **FAQs:** four questions and answers from the original FAQ page.
- **Partners:** 19 logo candidates from the original Notable Clients section. Filename-derived labels are explicitly unverified.
- **Media:** 105 records from 106 downloaded URLs after checksum deduplication. All begin with review status **pending** and are inaccessible to anonymous visitors, including their file URLs.
- **Site Settings:** a draft containing Jitrapadu contact details, directions/social links and notes about conflicting affiliate information. Its raw API remains restricted to authenticated reviewers; the website receives a server-side projection of its published contact fields only.

All imported content is draft. No News, Events or CSR articles were fabricated. Review the original wording against the current copywriting document. Confirm company/affiliate contact information, partner names, endorsements and image suitability before publishing/approving. Do not approve original certificates unless their details have been appropriately obscured.

### Import, verification and backup

The extraction bundle is in `temp/original-site-import/`: five HTML snapshots, `extracted-content.json`, `partner-assets.json`, assets, download checksums and reports. It is intentionally ignored by Git. Keep this directory with the local database/uploads when making backups; cloning the code repository alone will not reproduce the imported data.

```sh
npm run cms:types
npm run cms:import-map
npm run cms:import
npm run cms:verify
npm test
```

Run import and verification **sequentially**, not concurrently, and avoid concurrent SQLite schema changes. `cms:import` accepts an extraction-directory argument, verifies every asset checksum, creates drafts, and skips stable import keys already present. It does not overwrite editor changes or delete records. Failed assets defer new dependent source pages so a repaired rerun can complete their relationships. Reports are written to `temp/original-site-import/payload-import-report.json`; download failures remain in `download-report.json`. A nonzero exit indicates a failure to inspect.

`cms:verify` checks draft/media privacy, write denial, reviewer access and role restrictions against the local imported database. It briefly creates a randomly credentialed test identity under the reserved `example.invalid` domain and deletes it afterward. It does not print a password or leave a login account. It expects the initial imported content to remain draft/pending, so run it before reviewers intentionally publish or approve records.

Public routes render at request time, so publishing requires no rebuild. Live draft preview is not enabled. Provision durable production storage before deployment. The current first-user bootstrap should be completed locally before any server is exposed publicly.

## Verification and research

`npm run check` runs lint, TypeScript and production build. Research, source snapshots, design tokens, behavior notes, limitations and audit evidence are in docs/research/figma-jitrapadu. Full source reference renders are in docs/design-references/figma-jitrapadu.

Do not rerun the initial preparation scripts over edited components; they are retained as extraction provenance.



## Published website content

| CMS record | Website destination |
| --- | --- |
| Solutions: `telecom-tower-monopole`, `rapid-deployment-system`, `smart-pole-lamp-pole` | Matching homepage card title, optional summary and approved card image |
| Tower Solution | Existing tower page heading and introduction body |
| Products: tower solution group | Tower Product Range, ordered by display order then ID |
| FAQs: tower solution group | Tower FAQ accordion; unassigned/other-group questions stay off this page |
| Partners: published and name verified, with approved image logo | Homepage partner rows |
| Site Settings: published | Shared company/contact fields and enquiry email/phone links on all four routes |

Publishing a record does not approve its related media. Approve images separately in Media; pending/rejected uploads and file URLs remain private. Partner names also require verification. Source Pages are reviewer-only archives even if marked published. Provenance, checksums and review notes are private.

Save draft revisions while reviewing changes. The public site keeps the last published values, including when the visitor is logged into the admin. Publish to replace them on the next full refresh. Open tabs do not update live. Unpublishing removes the CMS override. For products/FAQs/partners, a nonempty eligible published list replaces the entire static list; an empty list restores the static fallback. Unpublishing every record does not hide the existing section. Blank optional settings/card-summary fields retain existing values. CMS read failures also restore static fallback and produce a concise server log.

### Product source and draft seed

The [client company profile](https://drive.google.com/file/d/1OtaaEO4EoDQt45aidooLjxbnmTPXSAXF/view) supplies technical reference. The [website copywriting document](https://docs.google.com/document/d/13D7GQ_s-uHCLK_wcU5uR8bcUc_-38DXl2OkP_e2dNuk/edit) supplies descriptions and grouping. [Client structure photos](https://drive.google.com/drive/folders/1zV83pD-kEjy0L3b_8KQPNK5dAS66WzpR) are candidates for reviewed image assignments. No maintained SKU catalogue or final approval of every entry has been established. Payload becomes the publishing source after review.

```sh
npm run cms:seed-products
npm run cms:seed-products
```

The manifest contains 20 entries: seven tower, six RDS and seven Smart Pole/Lamp Pole. All import as drafts with source links and review notes; images remain unset. Entries distinguish products, configurations and services, including Tower Strengthening and Modification. Reruns skip existing keys and preserve edits. A partial failure returns nonzero and can be retried. No assets are downloaded.

Only tower products currently have a public listing. RDS/Smart Pole product drafts can be reviewed, but those pages are not implemented. Unsupported solution topics never create routes. General About/Factory copy, statistics, workflows, portfolio and other unmapped sections remain static.

### Isolated publication checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run cms:verify-frontend
```

The HTTP verifier creates a disposable SQLite database, uploads directory, randomly credentialed fixture admin and production server on an available local port. It tests publishing, later drafts, unpublishing, reviewer-cookie isolation, restricted APIs, media revocation and fallback. It cleans up its own fixtures/server without modifying the review database or printing credentials. Use `npm run cms:verify-frontend -- --interactive` to keep the fixture server open for browser checks; press Enter to close it. Optional `PAYLOAD_UPLOAD_DIR` overrides the server-only upload directory, defaulting to `temp/cms/uploads`.

Local Malaysian telephone values beginning with a single `0` are normalized to `+60` for dialing; display text remains unchanged. Local Payload upload URLs are rendered relative to the website origin.

`npm run cms:verify-termination` checks interrupted-verifier cleanup against the current production build. Test screenshots use disposable published fixtures; real imported content remains draft/pending. See `docs/cms-frontend-report.txt` for the verified counts, browser evidence and limits.

## News, Events, CSR and contact backend

Payload `/admin` now includes **Posts** for News, Events and CSR. Filter by Category
in the list, review the copy and provenance, then publish deliberately. Event
drafts may omit dates/location; publication requires a valid start and confirmed
location. Publication date is set on first publication when absent, and is display
metadata rather than a scheduled publishing instruction. Media approval remains
separate: only approved image banners appear in public responses.

`npm run cms:seed-posts` imports six drafts with stable import keys and skips
existing records, including edited or published entries. The two News entries
cover engineering-to-deployment and Klang fabrication. The two proposed Event
programmes and two proposed CSR initiatives are generated starting points, not
claims about confirmed or completed activities. They have no dates, locations or
banners assigned. Review all wording and claims with the client before publishing.

Public read APIs (no reviewer cookie or `draft=true` grants additional access):

```text
GET /api/content/posts?category=news,event&page=1&limit=12
GET /api/content/posts?category=csr
GET /api/content/posts/<slug>
```

Lists return `docs`, `page`, `limit`, `totalDocs`, `totalPages`, `hasNextPage` and
`hasPrevPage`. Omit category for all three. Limit is 1–50; default 12. Invalid
pagination/categories return 400, unpublished/missing details return 404 and
storage failures return a generic 503. Sorting is publication date descending,
then ID descending. Detail includes rich-text JSON and up to three public related
summaries: eligible manual selections first, then newest same-category entries.
Provenance and unapproved images are omitted. Responses are not cached.

### Private enquiries

`POST /api/contact` accepts JSON and requires an exact allowed Origin and a UUID
`Idempotency-Key`. Generate one key for a submission and **reuse the same key on
network retries**, with the same normalized content. A different payload with an
existing key returns 409. An identical retry creates no extra record, notification
or rate-limit event. Keep the key until a receipt is confirmed.

Example for local testing (stores a private enquiry; configure SMTP only when
external notifications are intended):

```bash
curl http://localhost:3001/api/contact \
  -H 'Origin: http://localhost:3001' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: 432b888b-251f-42ef-b20e-a06eafc7e147' \
  --data '{"fullName":"Example Contact","email":"example@example.com","message":"Please discuss our project requirements.","consent":true}'
```

Required: fullName (2–120), valid email (max254), message (10–5000), consent `true`.
Optional: company/jobTitle/projectLocation (max200), phone (max40), timeline
(max120), positive integer quantity (max1,000,000), solutionInterest and
projectStage. Solution labels: Telecom Tower & Monopole, Rapid Deployment System,
Smart Pole & Lamp Pole, Custom Steel Fabrication, Others. Stages: Planning, Tender,
Design, Fabrication, Deployment, Maintenance / Upgrade. Unknown fields are
rejected. An optional `website` honeypot must be empty; nonempty submissions are
silently discarded with the same receipt. The streamed JSON body is limited to
16KiB, irrespective of Content-Length.

Response codes: 202 generic receipt (stored or identical replay; also honeypot),
400 malformed JSON/key, 403 Origin, 409 conflicting reuse, 413 body size,
415 content type, 422 invalid fields/consent, 429 quota with Retry-After and
503 storage failure. A receipt does not claim email delivery and contains no
record ID. No public read/status endpoint exists.

Configure `CONTACT_ALLOWED_ORIGINS` as comma-separated exact origins with no paths
or trailing slash; default is `NEXT_PUBLIC_SERVER_URL` or local port3001. Forwarded
headers are not trusted and CORS is not opened. Persistent rolling quotas permit
five new accepted submissions per normalized email per15minutes and100 globally
perhour, with transactionally stored HMAC identifiers. PAYLOAD_SECRET rotation
changes HMAC identifiers: coordinate rotation operationally; old key replays will
no longer deduplicate. Raw IP addresses and request content are not logged. Expired
quota events are cleared on accepted submissions. Enquiries are not automatically
deleted; decide retention operationally.

Only administrators can access the Enquiries inbox or quota data. Editors cannot
read/export or change enquiries, and direct collection creation is denied even
to admins. Inbox workflow: new, in-progress, replied, closed. Receipt, deduplication,
consent and delivery metadata are server-owned/read-only. Consent records retain
version `enquiry-contact-v1` and wording: “I agree to be contacted by Jitrapadu
Engineering regarding my enquiry.” Future form wiring must present this wording.

### SMTP and retries

Notifications always go to **hello@jitrapadu.com**. Set SMTP_HOST, SMTP_PORT,
SMTP_SECURE (`true` for implicit TLS, otherwise `false`), SMTP_FROM_ADDRESS (verified
sender) and optional SMTP_FROM_NAME. SMTP_USER/SMTP_PASS must both be set or both
absent for an operator-managed relay. No credentials are committed. SMTP connection
and greeting timeouts are5seconds; socket timeout is10seconds. Sender verification
and actual external delivery remain operational checks. Startup does not contact
SMTP; the adapter never provisions an external test mailbox.

The submitter email is Reply-To, never From/To; no acknowledgement email is sent
to the submitter. Messages are plain text with a fixed subject. Save occurs before
mail. Without complete valid configuration the private status is `not-configured`,
with no console email fallback. Failed send becomes `failed`; the enquiry and202
receipt remain valid. Other statuses are pending, sending and sent, with attempt
count/time and safe error category visible only in the private inbox.

After configuring SMTP, run:

```bash
npm run cms:retry-notifications -- --limit=100
```

Limit is1–500. The command retries pending/failed/not-configured and expired sending
leases, claims each atomically for5minutes and skips sent/active claims. It prints
safe counts and exits nonzero on failures or missing SMTP. No retry scheduler is
installed. A crash after SMTP acceptance but before saving `sent` can cause a later
resend: SMTP and database writes cannot commit together. A stable Message-ID is
reused; exactly-once external delivery is not guaranteed. An interrupted command
stops claiming further records and lets a bounded in-flight send finish.

### Verification and local database upgrade

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`,
`npm run cms:verify-backend`, `npm run cms:verify-frontend`,
`npm run cms:verify-termination` and `npm run cms:verify-backend-termination`.
Tests use disposable databases/uploads and a loopback SMTP capture; no real email.
If this host blocks Turbopack's worker port, `npm run build -- --webpack` is the
supported alternative for production HTTP verification. Both termination checks
assert cleanup of the owned process/database/uploads after SIGTERM.

Before the first upgraded startup, stop other database writers and use:

```bash
node --import tsx scripts/cms/verify-schema-upgrade.ts --source=temp/cms/payload.db
# Apply only after the copy passes and writers remain stopped:
node --import tsx scripts/cms/verify-schema-upgrade.ts --source=temp/cms/payload.db --apply
```

The default is copy-only. SQLite backup API includes committed WAL content;
ignored `temp/cms/backups/editorial-contact-*` retains the original backup, verified
copy, upload inventory and schema statements. Every old column/row is hashed and
compared, including auth and relationship data, with zero FK violations and no
remaining schema changes required. The known SQLite relationship/index issue may
need two passes on the copy; duplicate CREATE INDEX statements are deduplicated.
Unexpected data-loss plans fail closed. Upload files themselves are not modified;
keep normal full project/upload backups separately. Never reset the review DB.

Public article pages, contact-form markup and Maps remain unwired in this phase;
website design and existing page content are preserved. The APIs are ready for
that later integration. No starter draft is published automatically.

## Cloudflare frontend review deployment

The existing Cloudflare Worker is `jitrapadu`; `wrangler.review.jsonc` deploys a
static frontend review build to it. BugHerd loads once across the public website
using the supplied project script and is not included in the Payload admin layout.

```bash
npm run test:review
npm run review:build
npm run review:deploy
```

The build uses an isolated workspace under ignored `temp/cloudflare-review/`,
exports all existing public pages with Next.js static export, and captures
only the existing published-content projection when local Payload configuration
is available. Without local CMS credentials it retains the site's static fallback
content. Only approved referenced CMS images are copied from local uploads; private
drafts, admin/API routes, local database, credentials and unapproved uploads are
excluded. The normal standalone CMS application and its build remain separate.

The review export has `X-Robots-Tag: noindex, nofollow, noarchive`. It has no live
CMS/contact backend; publish edits locally and rebuild/redeploy to refresh the
snapshot. Wrangler uses the existing account login and `--keep-vars`; no tokens
are committed. The Worker remains an asset-only deployment with its existing
HTML/404 handling. Full CMS hosting requires a separate backend deployment.
