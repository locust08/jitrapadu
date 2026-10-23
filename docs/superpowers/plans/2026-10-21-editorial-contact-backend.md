# Editorial CMS and Contact Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. The user has selected direct execution in this chat. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add reviewable News/Events/CSR content, safe public read APIs and a private enquiry backend with retryable notifications to hello@jitrapadu.com.

**Architecture:** Keep editorial reads and contact intake as separate modules within the existing Payload application. Anonymous read projections expose published content only; a validated contact service uses SQLite transactions for durable deduplication and rolling rate limits, then claims and sends notifications after commit. Complete the independently testable editorial slice before the contact slice, followed by shared HTTP verification and a protected local schema upgrade.

**Tech Stack:** Existing Next.js 16.4.2, React 19, Payload/SQLite/Lexical 3.91.0, TypeScript, Node test runner and tsx; add `@payloadcms/email-nodemailer@3.91.0` at implementation time.

**Spec:** [Approved design](../specs/2026-10-21-editorial-contact-backend-design.md).

## Global Constraints

- No layouts, styles, navigation destinations or existing page content change in this phase. Nothing is automatically published.
- Preserve existing imported drafts, media, owner account and all uncommitted work; no merge, push or deployment. Do not stage or commit unrelated work.
- Public reads explicitly use anonymous access, `draft: false`, `overrideAccess: false`, `_status = published`, depth zero; never reuse a reviewer's request context.
- Enquiries and rate data are admin-only. Public direct collection creation is denied; only the validated submission service performs a trusted create.
- Required full name, valid email, message and consent `true`; record consent version `enquiry-contact-v1` and wording "I agree to be contacted by Jitrapadu Engineering regarding my enquiry."
- Entire request: at most 16 KiB. Required UUID `Idempotency-Key`; exact Origin allowlist; no raw client IP storage or permissive CORS.
- Five new accepted submissions per normalized email per 15 minutes and 100 new accepted submissions globally per hour; identical replays consume no allowance.
- Recipient is fixed to **hello@jitrapadu.com**; validated enquiry email is Reply-To only. No submitter acknowledgement email or real email during implementation.
- SMTP credentials and verified sender details have not been supplied. Actual external delivery remains unverified until configured and tested.
- Back up the local review database before schema changes. Verify migration on a copy first, including all record contents and foreign keys.
- New article pages, contact-form markup, Maps and other brief items remain subsequent work.

## Review Focus

1. A published post with a newer draft must return its published body even with reviewer cookies (Tasks 1–2, 8).
2. Two database connections racing on idempotency keys or the last allowance must produce one durable outcome (Task 5).
3. Chunked bodies exceeding the limit, normalization-equivalent retries and protected caller fields must not bypass validation or quota (Tasks 4–5, 8).
4. A worker crash/expired lease and a stale worker's completion must not overwrite a newer notification claim (Task 6).
5. SQLite schema synchronization after earlier index issues must preserve records and leave no pending schema changes (Task 9).

## File map and contracts

Existing `src/cms/collections.ts` remains the registration/export boundary used by the fixture. Re-export the new collection objects there; import shared `provenance` into Posts without introducing a circular import (move provenance and `contentAccess` to `src/cms/editorial-fields.ts`, preserving existing behavior).

| File | Responsibility |
| --- | --- |
| `src/cms/editorial-fields.ts` | Existing shared editorial access and provenance field definitions |
| `src/cms/posts.ts` | Draft-enabled Posts schema and publication validation |
| `src/cms/posts-reader.ts` | Query parsing, published-only reads and safe DTOs |
| `src/cms/enquiries.ts` | Private Enquiries and ContactRateEvents schemas |
| `src/cms/contact-validation.ts` | Bounded request parsing, allowlist and normalized field validation |
| `src/cms/contact-store.ts` | Transaction helper, deduplication, rolling quota and durable save |
| `src/cms/contact-email.ts` | SMTP configuration and safe message construction |
| `src/cms/contact-notifications.ts` | Atomic notification leases, dispatch and safe state changes |
| `src/cms/contact-handler.ts` | HTTP orchestration, response/status mapping |
| `src/app/(payload)/api/content/posts/route.ts` | Public list GET adapter |
| `src/app/(payload)/api/content/posts/[slug]/route.ts` | Public detail GET adapter |
| `src/app/(payload)/api/contact/route.ts` | Contact POST adapter |
| `scripts/cms/editorial-seed.json`, `seed-posts.ts` | Six sourced/proposal draft entries and repeatable import |
| `scripts/cms/retry-notifications.ts` | Operator retry CLI |
| `scripts/cms/verify-backend.ts` | Disposable production HTTP lifecycle checks |
| `scripts/cms/verify-schema-upgrade.ts` | Copy-first schema/data/FK verification and ignored backup |
| `tests/cms/{posts,posts-reader,editorial-seed,enquiries,contact-validation,contact-store,contact-notifications}.test.ts` | Focused unit and real SQLite/Payload tests |

Modify `src/payload.config.ts`, `src/payload-types.ts`, `tests/cms/fixtures.ts`, package manifests, `.env.example` and `README-JITRAPADU.md` as required by the owning task. Do not modify frontend components.

Core types, defined in their owning modules:

- `PostCategory = 'news' | 'event' | 'csr'`.
- `PostQuery = { categories: PostCategory[]; page: number; limit: number }`.
- `PostSummary = { slug: string; title: string; category: PostCategory; excerpt: string | null; publicationDate: string | null; eventStart: string | null; eventLocation: string | null; banner: PublicImage | null }`, using the existing public image type.
- `PostDetail = PostSummary & { body: Post['body']; related: PostSummary[] }`; generated `Post` comes from `src/payload-types.ts`.
- `PostPage = { docs: PostSummary[]; page: number; limit: number; totalDocs: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean }`.
- `ContactInput` has `fullName`, `email`, `message`, `consent: true`, and optional `company`, `phone`, `jobTitle`, `projectLocation`, `solutionInterest`, `projectStage`, `timeline`, `quantity`. It excludes honeypot and server-owned fields.
- `ContactError` carries only `status`, safe `code`, optional field-name array and optional `retryAfter` seconds; never values/raw errors.
- `ContactReceipt = { kind: 'created' | 'replay'; enquiryId: number }` is internal only. Public receipt is always `{ message: 'Thank you. Your enquiry has been received.' }`.
- Injectable clocks are `now: () => Date`. Export `ContactTransport = { send(message: ContactMail): Promise<void> }` and `ContactMail = { to: 'hello@jitrapadu.com'; from: string; replyTo: string; subject: string; text: string; messageId: string }` from `contact-email.ts`; production wraps Payload's configured `sendEmail`. Use Payload's exported `EmailAdapter` type, and generated `Enquiry`/`Post` types from `src/payload-types.ts`.

---

### Task 1: Draft-enabled editorial collection

**Files:** Create `src/cms/editorial-fields.ts`, `src/cms/posts.ts`, `tests/cms/posts.test.ts`; modify `src/cms/collections.ts`, `src/payload.config.ts`, `src/payload-types.ts`.

**Interfaces:** Export `Posts: CollectionConfig`, `PostCategory`; re-export Posts from collections and register once in production. Preserve existing provenance field names/access. Post fields use `publicationDate`, `eventStart`, `eventLocation`, `relatedPosts`, plus approved-spec names.

- [x] Write tests `drafts require authentication`, `editors publish but cannot delete`, `events require start and location only when publishing`, `first publication date persists`, and `published version survives later draft`. Assert category rejection, unique slugs, required Lexical body, private versions/provenance and anonymous draft exclusion with real Payload access enforcement. Use fixture admin/editor identities, never the owner account.
- [x] Run `node --import tsx --test --test-force-exit tests/cms/posts.test.ts`; confirm missing-schema/behavior failures before implementation.
- [x] Extract only shared access/provenance, implement Posts with drafts and category admin filters. A publication hook validates the merged current/incoming event fields, rejects invalid dates/blank locations, and sets a missing publication date once. Draft event fields stay optional; changing category away from event removes the publication requirement.
- [x] Generate types using a disposable database configuration, not the owner database. Run the new tests and existing access/schema tests; confirm PASS and unchanged existing access behavior.

### Task 2: Public editorial APIs

**Files:** Create `src/cms/posts-reader.ts`, both posts route files and `tests/cms/posts-reader.test.ts`.

**Interfaces:** `parsePostQuery(params: URLSearchParams): PostQuery`; `listPublishedPosts(payload: Payload, query: PostQuery): Promise<PostPage>`; `getPublishedPost(payload: Payload, slug: string): Promise<PostDetail | null>`. Parser throws safe 400 errors. Routes instantiate Payload without request cookies, run on Node, are dynamic and return `Cache-Control: no-store` for immediate unpublication/privacy changes.

- [x] Write tests asserting: defaults page1/limit12; all categories and combined `news,event` pagination; descending publication date then ID; maximum50; reject page0/fractions/NaN, limit0/51, empty/unknown/duplicate category values and repeated supported parameters. Unknown unrelated parameters are ignored, including `draft=true`, which never changes access.
- [x] Add real Payload tests `published body ignores reviewer context`, `pending banner omitted`, `related order deduplicates and fills to three`, and `unpublished detail returns null`. Put private sentinel strings in provenance; assert absent from serialized DTOs. Include manual draft/self/duplicate/deleted IDs, cross-category manual entries, same-date sorting and an empty archive. Approved banners must use `toPublicImage`; rejected/non-image media are null. List/related objects have no body.
- [x] Run the file and confirm failures, then implement the three interfaces and thin GET routes. Use `_status` filtering, no user, depth0, draftfalse, overrideAccessfalse on every post/media lookup. Resolve manual relations in order; fill from newest same-category published posts excluding used IDs/self. Return 400 for invalid query, 404 for absent detail and a generic 503 for infrastructure failure; no error text leakage.
- [x] Re-run focused tests; assert exact pagination counts and DTO keys, including details with no eligible related posts.

Representative assertions for the reader tests (fixture names defined by the test):

```ts
assert.deepEqual(parsePostQuery(new URLSearchParams('category=news,event')), {
  categories: ['news', 'event'], page: 1, limit: 12,
})
assert.equal((await getPublishedPost(payload, draftSlug)), null)
assert.equal((await getPublishedPost(payload, publishedSlug))?.banner, null)
assert.equal(JSON.stringify(await listPublishedPosts(payload, query)).includes(privateSentinel), false)
```

### Task 3: Six repeatable starter drafts

**Files:** Create `scripts/cms/editorial-seed.json`, `scripts/cms/seed-posts.ts`, `tests/cms/editorial-seed.test.ts`; modify package scripts.

**Interfaces:** `seedPosts(payload: Payload): Promise<{created: number; skipped: number; failed: number; failures: {key: string; error: string}[]}>`; `npm run cms:seed-posts` loads `.env`. Reuse `importDraftRecord`; stable keys `editorial:v1:<slug>`.

- [x] Write tests asserting first run creates6 drafts (2/category), repeat creates0/skips6, an edited/published record survives rerun, event dates/location and all banners remain empty. Assert private review notes identify source facts versus generated proposals. Inject a failing record to prove failed count/nonzero CLI status without raw data logging.
- [x] Run tests and confirm missing-function failure. Read the locally captured client-source audit and fetch the referenced client document only if a supporting fact is missing. Write the six topics exactly as approved in the spec; label both event and both CSR entries as proposed activities with no claimed date, venue or past outcome. Use valid Lexical JSON bodies, source URL and private notes.
- [x] Implement import/CLI with guarded entry point and existing cleanup pattern. Print counts and safe failed import keys/categories. Run focused tests on disposable storage; do not seed the owner database until Task9.

### Task 4: Private inbox and request validation

**Files:** Create `src/cms/enquiries.ts`, `src/cms/contact-validation.ts`, `tests/cms/enquiries.test.ts`, `tests/cms/contact-validation.test.ts`; modify collection/config registration, generated types and fixture.

**Interfaces:** Export `Enquiries`, `ContactRateEvents`, `ContactInput`, `ContactError`; `parseContactRequest(request: Request, allowedOrigins: Set<string>): Promise<{key: string; input: ContactInput; honeypot: boolean}>`; `contactOrigins(env: NodeJS.ProcessEnv): Set<string>`.

- [x] Write access tests: admin can list/read/export/update/delete; editor/anonymous cannot; direct REST-equivalent Local API create with overrideAccessfalse denied for everyone. Workflow enum is `new | in-progress | replied | closed`. Server fields are read-only to admins: dedup hashes, receipt/consent metadata and notification state/lease; service alone changes those with trusted access. Inbox business/workflow fields remain admin-editable.
- [x] Write parser tests for all required bounds from the spec: name2–120/email254/message10–5000, optional text200/phone40/timeline120, quantity1–1,000,000 integer, exact interest/stage labels and consenttrue. Assert invalid field errors return field names without echoed values. Reject unknown input fields (including recipient/from/status/notification overrides), arrays/nonobjects, control characters in name/email/phone, duplicate/malformed UUID header, unsupported content type, malformed JSON and missing/disallowed Origin.
- [x] Include `chunked over 16384 bytes returns 413`, equal16384 allowed through body parsing, misleading Content-Length, non-ASCII UTF-8 byte counts, normalization trims strings/lowercases email, optional blank strings become absent, CRLF injection and honeypot with valid fields. Stream reader cancels on overflow. Exact allowed origins come from comma-separated `CONTACT_ALLOWED_ORIGINS` or configured website origin; validate configuration as origins, never trust forwarded headers.
- [x] Run new tests to confirm missing behavior. Implement schemas: Enquiries holds the approved fields, timestamps, consent copy/version, unique HMAC idempotency hash, payload fingerprint and notification metadata; no raw key/IP. ContactRateEvents holds indexed `emailHash`, `acceptedAt`, `expiresAt` only, admin-read/delete and no public/editor writes. No enquiry versions that unnecessarily duplicate PII.
- [x] Implement bounded JSON reader/normalizer and safe errors. Honeypot is a separate parsed flag, never persisted; a valid honeypot submission returns the generic receipt without calling storage/mail. Generate types in isolation and run focused tests.

### Task 5: Atomic persistence, rolling limits and idempotency

**Files:** Create `src/cms/contact-store.ts`, `tests/cms/contact-store.test.ts`; modify SQLite configuration and `tests/cms/fixtures.ts`.

**Interfaces:** `withContactTransaction<T>(payload: Payload, run: (req: PayloadRequest) => Promise<T>): Promise<T>`; `storeContact(payload: Payload, key: string, input: ContactInput, now?: () => Date): Promise<ContactReceipt>`. Derive separate HMAC keys from PAYLOAD_SECRET using fixed domain labels for idempotency, fingerprint and email buckets; never persist raw UUIDs or email identifiers in rate data.

- [x] Write real SQLite tests for identical replay, normalized-equivalent replay, different-payload409, durable persistence across connections/restart, sixth email submission429 and 101st global429. Assert replay never consumes allowance; storage failure rolls back enquiry and rate event together. Check exact rolling boundaries at15min/hour and expiry cleanup; compute Retry-After from earliest event needed to free allowance, minimum1second.
- [x] Extend fixture with an optional second independent Payload instance on the same database, same secret and transaction config, sequential schema setup and complete cleanup. Race same-key requests, conflicting same-key requests, six same-email keys and two requests for the last global allowance. Assert one enquiry/key, no more than5/100 accepts and no quota increments from replay/conflict/rejection. Include concurrent first submission on a previously empty rate table and forced transaction failure followed by successful reuse.
- [x] Run tests and confirm failures. Enable SQLite `transactionOptions: { behavior: 'immediate' }` and `busyTimeout: 0` in production/test adapters: Payload's default configuration currently does not enable real transactions. Implement begin/commit/rollback using `createLocalReq` and the same `req.transactionID` on every read/write within the transaction. Fail closed if transaction creation returns no ID. Retry only SQLite busy/locked errors with bounded asynchronous backoff (up to3seconds); do not log raw errors. Exhaustion maps to safe503.
- [x] Within one transaction, look up unique idempotency HMAC first; compare canonical normalized-input fingerprint for replay/conflict. Count ContactRateEvents newer than rolling cutoffs with HMAC email equality/global filter; reject quota before mutation. Create enquiry and one rate event, expire events at/before onehour cutoff, commit. The same acceptedAt clock value drives both records; no email work in the transaction. Existing unique key enforces dedup across processes; after a uniqueness race re-read under a fresh transaction. Do not use an in-memory mutex as the sole guard.
- [x] Run focused tests plus existing import/access tests; verify explicit transactions do not alter draft import behavior. Return internal enquiry ID only to notification orchestration.

Representative concurrency assertions (race results use `Promise.allSettled`):

```ts
assert.equal(await countEnquiriesForKey(key), 1)
assert.equal(results.filter(r => r.status === 'fulfilled').length, 5)
assert.equal(await countRateEventsForEmail(email), 5)
assert.equal(await countEnquiriesAfterRolledBackSave(), 0)
```

The test-local count helpers query the real disposable database with trusted access; they are not new public/service interfaces.

### Task 6: Safe mail configuration and leased notifications

**Files:** Create `src/cms/contact-email.ts`, `src/cms/contact-notifications.ts`, `scripts/cms/retry-notifications.ts`, `tests/cms/contact-notifications.test.ts`; modify payload config, package manifests, `.env.example`.

**Interfaces:** `createContactEmailConfig(env: NodeJS.ProcessEnv): { configured: boolean; adapter: EmailAdapter }`; `buildContactMail(enquiry: Enquiry, from: string): ContactMail`; `notifyEnquiry(payload: Payload, id: number, transport: ContactTransport | null, now?: () => Date): Promise<'sent' | 'failed' | 'not-configured' | 'skipped'>`; `retryNotifications(payload: Payload, transport: ContactTransport | null, options?: {limit?: number}): Promise<{sent: number; failed: number; notConfigured: number; skipped: number}>`. `ContactMail` fixes recipient and provides from/replyTo/subject/text/messageId only.

- [x] Write tests asserting durable record exists before send, fixed recipient, server sender, validated Reply-To, constant safe subject, text-only message (no HTML interpolation), stable `<jitrapadu-enquiry-ID@sender-domain>` Message-ID and successful state. Include multilingual text and HTML-like user content as literal text.
- [x] Add tests for absent/partial SMTP configuration with zero mail calls/PII logs, transport failure→failed while record persists, two workers→one send, sent skipping, expired sending lease recovery and stale completion fenced by claim token. Attempt count increments only when a configured transport is claimed; timestamps/error codes never contain raw SMTP text. Simulate SMTP acceptance then failed status persistence: later retry may resend with the same Message-ID; document this unavoidable boundary.
- [x] Run failures, then install the adapter version matching Payload3.91.0. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_ADDRESS`, `SMTP_FROM_NAME`; no secrets in example files. Host/port/from required; paired auth values optional for operator-managed unauthenticated relay. Reject malformed port/from/boolean and partial configuration by disabling notifications with a safe configuration category. No default Ethereal/network discovery.
- [x] Build adapter with connection/greeting timeouts5000ms and socket timeout10000ms, debug/logger disabled. If disabled, supply a custom nonlogging Payload email adapter that rejects with a safe configuration error rather than allowing console fallback. Notification service detects disabled status first and marks `not-configured` without invoking sendEmail. Reference [official Payload SMTP adapter documentation](https://payloadcms.com/docs/email/overview).
- [x] Claim eligible pending/failed/not-configured or expired sending records using Task5 transaction helper, fresh UUID claim token and5minute lease; skip active leases/sent. Send outside transaction. Finalize only when claim token still matches; clear lease, store safe error category (`configuration`, `timeout`, `transport`, `state-storage`) without raw transport text. Notification failures never escape to invalidate a durable contact receipt.
- [x] Implement retry CLI `npm run cms:retry-notifications -- --limit=100` with integer1–500 batch bound, stable oldest-first selection, safe counts, no IDs/content printed, nonzero on delivery/storage failure and cleanup on interruption. No automatic scheduler. Test fake transport first, then actual adapter against a loopback-only test SMTP sink; never use real SMTP credentials in tests.

### Task 7: Contact HTTP endpoint

**Files:** Create `src/cms/contact-handler.ts`, `src/app/(payload)/api/contact/route.ts`; extend validation/store tests or add `tests/cms/contact-handler.test.ts`; modify package scripts.

**Interfaces:** `handleContact(request: Request, deps: {payload: Payload; allowedOrigins: Set<string>; transport: ContactTransport | null; now?: () => Date}): Promise<Response>`. Route is Node/dynamic; instantiate server-only dependencies, never accept authentication or recipient configuration from the request.

- [x] Write handler tests pinning202/400/403/409/413/415/422/429/503 contract; exact public receipt and no internal ID/email-delivery claim. Assert honeypot calls neither store nor mail, replay sends no notification, database failure gives503, mail failure/missing config gives202 with stored private state. Verify no response or captured logger output contains PII/sentinel raw errors and every response has no-store headers; 429 includes Retry-After.
- [x] Run failures, implement parser→honeypot→transactional store→notify only on created→receipt sequence. Map safe errors, catch unexpected failures as503 without raw logs. If state update fails after durable creation, still return202 and leave retryable notification state. Do not add CORS allowances or expose GET enquiry access.
- [x] Run focused tests and full unit/real-Payload suite. Confirm direct collection access remains denied independently of custom endpoint.

### Task 8: Isolated HTTP regression verification

**Files:** Create `scripts/cms/verify-backend.ts`; modify package scripts and, if needed, shared fixture helpers without restructuring the existing frontend verifier.

**Interfaces:** `npm run cms:verify-backend` builds on a prebuilt production app and starts its own server with disposable DB/uploads/secret, explicit origin and no real SMTP env. Own and clean up only its process and temporary directories.

- [x] Add assertions through actual Next routes: six seeded drafts invisible; publish news/event with confirmed fixture metadata; combined category pagination; detail/body/provenance/banner privacy; reviewer cookies and `draft=true` do not change results; edit draft/unpublish immediately hides revised/private content as applicable. Exercise raw Payload REST versions/collections with anonymous/editor/admin fixture credentials.
- [x] Send valid contact, identical retry, conflict, honeypot and invalid requests; confirm statuses and private stored inbox/notification state using fixture admin Local API. Cover quota concurrency over HTTP and a streaming oversized request without Content-Length. Assert raw contact data is absent from public APIs and server logs. Reject forged Origin/forwarded headers; test missing SMTP and loopback captured SMTP separately.
- [x] Run `npm run test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run cms:verify-backend`, `npm run cms:verify-frontend`, `npm run cms:verify-termination`. New backend verifier must also demonstrate SIGTERM cleanup of its own server/temp root. All commands must succeed; failures require diagnosis before broader re-testing. Existing four public routes retain their current rendered content and no frontend files change.

### Task 9: Preserve review data, seed and document operations

**Files:** Create `scripts/cms/verify-schema-upgrade.ts`; modify `README-JITRAPADU.md`; generate ignored backup and `docs/cms-backend-report.txt` containing counts/check results only.

**Interfaces:** Schema verifier defaults to a copy-only dry run of an explicitly supplied database path. It reports pre/post content checksums for existing records/tables, FK errors and remaining Drizzle planned schema statements without exposing record data. Never auto-repair/reset an unexpected schema.

- [x] Before touching the owner DB, stop the known preview cleanly and take a SQLite-consistent backup (SQLite backup API, including WAL contents) plus upload inventory under ignored `temp/cms/backups/<timestamp>/`. Use known process/port only; do not dump environment or broad process arguments. Test upgrade on the copy with outbound email disabled and the exact new config. Treat prior `temp/*schema-repair.ts` as diagnostic evidence, not automatically reusable commands.
- [x] Test a disposable copy with the earlier index-sync condition: detect partial schema/index conflicts, preserve all old rows and resolve only verified additive changes. Compare canonical old column values/relationship rows/auth hashes before/after, excluding newly added tables/columns; assert zero FK violations and zero remaining schema changes. Do not print private data or auth hashes. Add a test proving a failed dry run leaves the source byte-for-byte unchanged. If unsafe, leave live DB untouched and report the concrete blocker.
- [x] After copy verification, apply the verified additive upgrade to the backed-up owner database with no concurrent writers, regenerate types/import map if needed and run seed-posts twice. Expected: first created6, second skipped6; existing5SourcePages/5Solutions/4FAQs/19Partners/20Products/105Media and owner account unchanged, posts all draft and media still pending. If real counts differ, use the captured live baseline rather than rewriting records to match historic counts. Do not publish or create test enquiries in the owner DB.
- [x] Document API examples including UUID reuse/Origin, error classes, privacy/access, rolling limits, consent copy, category editing/publication and event requirements; six proposal/fact draft topics; SMTP setup without secrets, fixed recipient, retry command/lease behavior, possible resend after crash and unverified external delivery. State public page/form wiring and other brief tasks remain pending.
- [x] Restore the local preview if previously running, report verification results and link admin/relevant docs. Review final diff against approved spec and run one fresh whole-change review under executing-plans, addressing findings. Preserve all existing work; no commit/push/deployment without user authorization. Native execution continues here after plan approval.

## Plan self-review

Checked against the approved spec: Tasks1–3 cover all editorial schema/read/seed requirements; Tasks4–7 cover privacy, validation, all response classes, persistent quotas, deduplication and notification recovery; Tasks8–9 cover HTTP privacy, cleanup, regression checks, safe local upgrade and operations. Review Focus cases have named owning tests. Interfaces use the same field/function names throughout; no public component or external delivery is part of this plan.
