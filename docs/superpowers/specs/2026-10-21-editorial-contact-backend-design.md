# News, Events, CSR and contact backend

## Outcome and authority

Implement the first backend phase of the remaining Notion brief: editorial
content management for News, Events and CSR, plus a working enquiry submission
backend. Preserve the existing website designs and imported review material.
The user approved the unified Posts/private Enquiries approach on 21 October
2026 and selected **hello@jitrapadu.com** for enquiry notifications.

Sources:
- Project brief: https://app.notion.com/p/3fb4fcc4f701809d9433db9041b6b4d2
- Discussion: https://app.notion.com/p/3fb4fcc4f70181349d5bdb0e6f2b0b6a
- Copywriting: https://docs.google.com/document/d/13D7GQ_s-uHCLK_wcU5uR8bcUc_-38DXl2OkP_e2dNuk/edit
- Client facts: the January 2026 company profile, linked in
  `docs/audit-2026-10-21/product-content-sources.txt`.

This phase adds CMS models, backend APIs, draft starter content, notification
configuration and verification. New public article pages, contact-form markup,
Google Maps, additional solution pages, certificate redaction and other brief
items remain subsequent work. No layouts, styles, navigation destinations or
existing page content change in this phase. Nothing is automatically published.

## Editorial CMS

Add one versioned `posts` collection, with `category` restricted to `news`,
`event` or `csr`. Use existing authenticated editorial write permissions,
admin-only deletion and published-or-authenticated reading/version privacy.

Fields:
- Required title, globally unique slug, category and Lexical rich-text body.
- Optional excerpt, banner relationship to Media, publication date and related
  Posts relationships. Set publication date on first publication if absent;
  this date is display metadata, not a scheduling system.
- Event start date and location. Draft events may omit these; publishing an
  event requires a valid start date and nonblank location. Do not assume an
  online event, venue or date that the client has not supplied.
- Private provenance/import key and editorial review notes, following the
  existing field-level privacy rules. Default status is draft.

Admin category filters support separate News, Events and CSR review. Banner
selection uses the existing Media collection; approval remains independent of
post publication. Pending/rejected images never appear in public projections.
Do not download new assets or assign an image to an unverified event.

## Public editorial reads

Provide read-only APIs ready for later page wiring:
- `GET /api/content/posts?category=news|event|csr&page=1&limit=12`
- `GET /api/content/posts/<slug>`

Omitting category lists all three categories. Accept comma-separated subsets
of the three categories, so `category=news,event` gives a single correctly
paginated News/Events archive and `category=csr` gives the CSR archive.
Default page is 1 and limit is 12; maximum limit is 50. Reject malformed or
unsupported query values with 400. Sort by publication date descending, then
ID descending. Return pagination metadata with the list.

Use anonymous Payload Local API reads with explicit `draft: false`,
`overrideAccess: false`, `_status = published` and depth zero. Never forward
reviewer cookies or interpret a `draft` query parameter as permission. Return
display-only objects: slug, title, category, excerpt, publication/event details
and approved banner; detail also contains the rich-text body and up to three
related summaries. Missing/unpublished slugs return 404.

Resolve manual related-post IDs to eligible published records, excluding self
and duplicates, preserving editorial order. Fill remaining related slots with
the newest published posts in the same category. Related summaries never
contain full bodies or private notes. Banners use the existing safe public
image projection, including same-origin paths for local uploads. This phase
returns rich-text JSON; rendering it on public pages is subsequent work.

## Starter content

Seed six generated editorial drafts, two per category, with stable import keys
and an idempotent command that skips existing records and preserves edits:

1. News: Jitrapadu's turnkey engineering-to-deployment approach.
2. News: In-house fabrication at Jalan Kapar, Klang.
3. Event: Proposed factory technical visit — draft programme.
4. Event: Proposed telecom infrastructure briefing — draft programme.
5. CSR: Proposed connectivity education initiative.
6. CSR: Proposed responsible fabrication awareness programme.

Write useful initial bodies from verified company capabilities or clearly
labelled proposals. Event/CSR proposals must not claim that activities have
occurred, have confirmed dates/venues, or have achieved invented outcomes.
Keep event dates/locations unset until client confirmation, banners unset and
all records draft. Private notes distinguish client-source facts from generated
editorial proposals. Do not imply that technical claims or content have final
client approval. Report created/skipped/failed counts; failures return nonzero.

## Private enquiry inbox

Add an `enquiries` collection, visible only to administrators. Anonymous users
and ordinary content editors cannot list, read, export, update or delete
enquiries. Public direct collection creation is denied; only the validated
submission service performs a trusted create. Administrators can manage the
inbox, with workflow statuses `new`, `in-progress`, `replied`, `closed`.

Store name, email, optional company/phone/job title/project location, solution
interest, project stage, timeline, optional quantity and message. Required
submission fields are full name, valid email, message and consent `true`.
Store server receipt time, consent version `enquiry-contact-v1` and the wording
"I agree to be contacted by Jitrapadu Engineering regarding my enquiry.", private
deduplication data and notification state. Do not store raw client IP addresses.
Do not automatically delete enquiries; retention policy remains an operational
decision. No public enquiry-reading or status-lookup endpoint is added.

## Contact submission contract

`POST /api/contact` accepts JSON, with a required UUID `Idempotency-Key` header.
The future frontend should generate one key per submission and reuse it on
network retries. No form markup is added here.

Validation bounds:
- Entire request: at most 16 KiB, enforced while reading the stream rather than
  trusting Content-Length. Reject unsupported content types and malformed JSON.
- Full name: 2–120 characters; email: at most 254 characters, validated and
  normalized; message: 10–5000 characters.
- Company/job title/project location: at most 200 characters each; phone: at
  most 40; timeline: at most 120. Optional quantity must be a positive integer
  no greater than 1,000,000.
- Solution interest: Telecom Tower & Monopole, Rapid Deployment System,
  Smart Pole & Lamp Pole, Custom Steel Fabrication or Others. Project stage:
  Planning, Tender, Design, Fabrication, Deployment or Maintenance / Upgrade.
  Both are optional but reject other values when provided.
- Reject control characters in names/email/phone and email-header injection.
  Render notification values as escaped text. Never accept a caller-supplied
  recipient, sender, workflow state or notification state. Do not log request
  bodies, email addresses, messages or raw transport errors.

Responses:
- 202 with a generic receipt acknowledgement only after durable storage, or
  after an identical idempotent replay. Do not expose internal record IDs or
  claim that an email was delivered. A honeypot discard receives the same
  generic acknowledgement but creates no enquiry and sends no email.
- 400 malformed JSON/key, 403 disallowed/missing Origin, 409 reused key with a
  different normalized payload, 413 oversized request, 415 unsupported media
  type, 422 invalid fields/consent, 429 throttled with Retry-After, or 503 when
  storage fails. Validation responses identify fields without echoing values.

## Spam controls and concurrency

Require an Origin matching an explicit server-side allowlist. Default to the
configured website origin; support `CONTACT_ALLOWED_ORIGINS` for the later
deployment. Do not infer trust from forwarded client headers. The JSON-only
endpoint does not expose permissive cross-origin headers.

Accept an optional empty `website` honeypot field. A nonempty value is silently
discarded. Apply persistent limits of five new accepted submissions per
normalized email per 15 minutes and 100 new accepted submissions globally per
hour. Hash email bucket identifiers using an HMAC secret; keep rate-limit
records private and expire old buckets. Identical idempotent replays must not
create more records, send another notification or consume another allowance.

Use durable unique keys and atomic database operations/transactions so parallel
requests cannot bypass limits or create duplicate enquiries. Concurrent uses
of the same key must resolve to one stored enquiry. Do not rely solely on an
in-memory rate limiter. Public record creation/status overrides remain blocked
even when clients bypass the custom endpoint and call Payload REST directly.

## Email notifications and retries

Save the enquiry before attempting notification to **hello@jitrapadu.com**.
Use a configured SMTP adapter with a verified environment-configured sender.
Use the validated enquiry email only as Reply-To; never as From or recipient.
Configure connection/send timeouts so a mail outage does not hang submissions.
No acknowledgement email to the submitter is included in this phase.

Record notification status (`pending`, `sending`, `sent`, `failed` or
`not-configured`), attempt count, attempt time and a safe error category visible
only to administrators. Missing SMTP configuration must not invoke Payload's
console mail fallback or log enquiry content. Store the enquiry and mark the
notification not configured. Mail failure likewise preserves the enquiry and
the 202 acknowledgement; no false delivery claim is made.

Provide an operator CLI to retry pending/failed/not-configured notifications
after SMTP is configured. Claim work atomically, with a short recoverable lease,
to avoid concurrent retry workers sending the same enquiry simultaneously.
Sent notifications are skipped. SMTP acceptance and database state cannot form
one transaction: a crash after acceptance may cause a later retry to resend.
Document this limit and use a stable Message-ID per enquiry.

SMTP credentials and verified sender details have not been supplied. Implement
environment configuration and test the adapter with a fake/local test transport.
Actual external delivery remains unverified until SMTP is configured and tested.
No real email is sent during implementation.

## Verification and delivery

1. Real Payload tests prove draft/public separation, admin-only enquiry/rate
   data, editor access limits, private-field omission and related-post filtering.
   Reviewer cookies must never change the public editorial API result.
2. Seed reruns preserve edits and create no duplicates; all six starter posts
   remain draft. Existing imported drafts, media and owner account are preserved.
3. Contact endpoint tests cover valid input, all response classes, bounded
   streaming bodies, Origin/honeypot checks, consent, concurrent limits and
   idempotent replay/conflict. No enquiry content is returned or logged.
4. Notification tests prove save-before-send, successful send state, absent
   configuration, failure recovery, concurrent claim behavior and sent skipping.
   Test mail is captured locally; assert the approved recipient and safe headers.
5. HTTP integration tests use disposable databases/uploads/servers, including
   graceful cleanup. Existing public routes retain their layout and content.
   Run the full test suite, lint, typecheck, production build and existing CMS
   publication verification after changes.
6. Back up the local review database before schema changes. Verify migration on
   a copy first, including all record contents and foreign keys; account for the
   prior SQLite index-sync issue. Do not reset or overwrite existing review data.
7. Document endpoint examples, rate limits, admin workflow, starter content,
   SMTP variables, retry command and the fact that page/form wiring is still
   pending. Keep all existing uncommitted work; no merge, push or deployment.
