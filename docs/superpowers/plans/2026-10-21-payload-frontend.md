# Payload Frontend Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. The user previously selected direct implementation in this chat; preserve that method after plan review. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Show reviewed, published Payload content in the existing website sections while preserving draft privacy and seeding a traceable product listing for review.

**Architecture:** Keep Payload queries behind a server-only entry point that returns display-only objects. Request-rendered frontend routes pass those objects into the existing client components through a typed provider. Test publication transitions against real Payload in an isolated database and production server, without publishing review data.

**Tech Stack:** Existing Next.js 16.4.2, React 19, TypeScript, Payload 3.91.0, SQLite, `tsx --test`, Node fetch and existing browser tooling. No framework upgrade or new browser-test dependency is required.

**Spec:** `docs/superpowers/specs/2026-10-21-payload-frontend-design.md` — approved 21 October 2026. Read it before executing this plan.

## Global Constraints

- Preserve the current design and interactions.
- All seeds remain drafts.
- No additional Drive assets are downloaded by this change.
- Collection queries explicitly use `draft: false`, `overrideAccess: false`, anonymous identity and `_status = published`.
- Site Settings remains protected on its raw global endpoint.
- Fallback is the existing checked-in frontend content, never a CMS draft.
- Once a published list is available, do not append static entries that editors omitted.
- No product detail pages, new solution routes, page builder, live draft preview, deployment or automatic publication.
- Preserve existing uncommitted work on `codex/payload-draft-import`; do not reset, stash or relocate it. Any commits must stage named task files only, with overlapping pre-existing changes reviewed first.
- Do not run SQLite import, schema mutation and verification processes concurrently. Never log credentials or commit database/uploads/secrets.

## Review Focus

1. A reviewer browsing the public website with an admin cookie must still see published content only — lifecycle HTTP tests in Task 5.
2. A published global followed by an unpublished revision must retain its previous published values — actual Payload lifecycle tests in Tasks 3 and 5.
3. Revoking media approval or partner-name verification must remove the affected CMS image/partner on the next request — Tasks 3 and 5.
4. Unpublishing the last eligible list record must restore static fallback; partial lists must not grow static appendages — Tasks 4 and 5.
5. Missing images, tied display order and unsafe links must produce stable, usable output without leaking metadata — Tasks 2, 3 and 4.

## Files and boundaries

- `src/cms/content-types.ts`: solution-group constants and public display-only types, safe for type imports from client components.
- `src/cms/collections.ts`, `src/cms/site-settings.ts`, `src/payload.config.ts`: schemas, private fields and isolated-upload configuration; regenerate `src/payload-types.ts`.
- `scripts/cms/product-seed.json`, `scripts/cms/seed-products.ts`: provenance-backed draft listing and repeatable CLI.
- `src/cms/public-model.ts`: pure display projection, media validation, link normalization and fallback helpers.
- `src/cms/public-reader.ts`: query orchestration accepting an injected Payload instance; no config, cookies or environment imports.
- `src/cms/public-content.ts`: `import 'server-only'`, Payload initialization and request entry point.
- `src/components/sites/figma-jitrapadu/shared/PublishedContentProvider.tsx`: client context containing only public DTOs.
- Existing frontend layout/page/components: consume DTOs without changing route structure or unrelated page copy.
- `tests/cms/fixtures.ts`: disposable Payload/database/uploads helper. `tests/cms/schema.test.ts`, `products.test.ts`, `public-content.test.ts`, `public-model.test.ts`: isolated schema, importer and public-read tests.
- `scripts/cms/verify-frontend.ts`: serial HTTP lifecycle checks against a disposable production server.
- `README-JITRAPADU.md`, `.env.example`, `package.json`, `docs/cms-frontend-report.txt`: commands, editorial instructions and verification evidence.

## Shared interfaces

Define these once in `content-types.ts`; later tasks consume these exact names:

- `SolutionGroup = 'telecom-tower-monopole' | 'rapid-deployment-system' | 'smart-pole-lamp-pole'`.
- `PublicImage = { url: string; alt: string; width?: number; height?: number }`.
- `PublicSolution = { slug: SolutionGroup; title: string; body: string; summary?: string; image?: PublicImage }`.
- `PublicProduct = { id: number; slug: string; title: string; description: string; group: SolutionGroup; entryType: 'product' | 'configuration' | 'service'; image?: PublicImage }`.
- `PublicFAQ = { id: number; question: string; answer: string }`.
- `PublicPartner = { id: number; name: string; logo: PublicImage }`.
- `PublicSiteSettings = { companyName?: string; email?: string; phone?: string; mobile?: string; fax?: string; address?: string; socialLinks: string[]; directionsLinks: string[] }`.
- `PublishedContent = { solutions: Partial<Record<SolutionGroup, PublicSolution>>; products: PublicProduct[]; faqs: PublicFAQ[]; partners: PublicPartner[]; siteSettings: PublicSiteSettings | null }`.
- `emptyPublishedContent(): PublishedContent`: fresh empty arrays/maps, null settings; excludes all static fallback copy.

### Task 1: Establish safe schemas and isolated verification

**Files:** Create `src/cms/content-types.ts`, `tests/cms/fixtures.ts`, `tests/cms/schema.test.ts`. Modify `src/cms/collections.ts`, `src/payload.config.ts`, `.env.example`, `scripts/cms/verify-import.ts`; regenerate `src/payload-types.ts`.

**Interfaces:** Consume existing `authenticated`, `isAdmin` and `publishedOrAuthenticated`. Produce shared types above and `withTestPayload<T>(run: (payload: Payload, paths: { root: string; database: string; uploads: string }) => Promise<T>): Promise<T>` in fixtures.

- [x] Write failing schema tests using real Payload: anonymous Products contain published entries only; an editor can review drafts; publishing Source Pages still gives anonymous access denial; private provenance fields are omitted from published collection reads but visible to reviewers.

  Core assertions after creating one draft and one published product fixture:
  ```ts
  const visible = await payload.find({ collection: 'products', draft: true, overrideAccess: false })
  assert.equal(visible.totalDocs, 1)
  assert.equal(visible.docs[0]._status, 'published')
  assert.equal('reviewNotes' in visible.docs[0], false)
  await assert.rejects(payload.find({ collection: 'source-pages', overrideAccess: false }))
  ```

- [x] Run `npx tsx --test tests/cms/schema.test.ts`; confirm failure from the absent helper/schema or the currently public archive/private fields, not an unrelated environment failure.
- [x] Implement the fixture helper with a freshly allocated temporary root, SQLite adapter and collection upload-directory override. Derive a test config from the existing config without mutating its shared objects. Set a random secret and local test URL in the test config. Close Payload and its SQLite client before deleting only this allocated root. Tests must never target `temp/cms/payload.db` or the real upload directory.
- [x] Add `Products` with required title, unique slug, description, `solutionGroup` using the three exact values, `entryType`, optional image relationship, required finite nonnegative `displayOrder` default 0, provenance, versions/drafts and content access rules. Configure meaningful admin descriptions. Register Products.
- [x] Add optional `summary` and `cardImage` to Solutions; optional `solutionGroup` and `displayOrder` default 0 to FAQs; `displayOrder` default 0 to Partners. Unassigned FAQs stay unassigned. Apply authenticated read access to all provenance/review metadata and Media checksum/source-reference fields. Change Source Pages reads to authenticated-only; retain existing write/version permissions.
- [x] Support `PAYLOAD_UPLOAD_DIR` in Media configuration, defaulting to the existing local path. Document it as an optional server-only directory override, used for isolated HTTP tests. In the prior import verifier, expect Source Pages anonymous reads to reject; do not change any real draft/pending count expectations.
- [x] Run `npm run cms:types`, `npm test`, then `npm run typecheck`. Expected: all tests pass and existing import input shapes remain accepted.
- [x] Review the named-file diff and checkpoint only this task's work if Git writes are available. Do not include unrelated existing modifications.

### Task 2: Seed the client product ranges as reviewable drafts

**Files:** Create `scripts/cms/product-seed.json`, `scripts/cms/seed-products.ts`, `tests/cms/products.test.ts`. Modify `package.json`.

**Interfaces:** Consume Task 1's Products schema and existing `importDraftRecord`. Export `seedProducts(payload: Payload): Promise<{ created: number; skipped: number; failed: number; failures: { key: string; error: string }[] }>` from the guarded CLI module.

- [x] Add failing tests asserting exactly 20 entries, grouped 7/6/7; all drafts; zero anonymous visibility; unique stable import keys and slugs; second run creates zero and skips 20; an edited entry remains unchanged. Inject one creation failure and assert nonzero failed count and a later retry creates only the failed entry.

  ```ts
  assert.deepEqual(await seedProducts(payload), { created: 20, skipped: 0, failed: 0, failures: [] })
  assert.deepEqual(await seedProducts(payload), { created: 0, skipped: 20, failed: 0, failures: [] })
  assert.equal((await payload.find({ collection: 'products', overrideAccess: false })).totalDocs, 0)
  ```

- [x] Run `npx tsx --test tests/cms/products.test.ts`; expect failure for the missing seeder.
- [x] Retrieve the exact copywriting document from the approved source URL using the Drive connector. Capture the three Product Range sections as the JSON manifest, retaining descriptions verbatim. Group keys use `SolutionGroup`; display order follows document order within each group. Use `client-copy:product:<group>:<slug>` import keys and the document URL as `sourceUrl`. Include technical-reference/review notes; leave images unset.
- [x] Include tower entries Angular Tower, Monopole, Rooftop Unipole, Guyed Mast, Radar and Broadcast Tower, Tower Strengthening and Modification, Camouflage Pole; six RDS entries; seven Smart Pole/Lamp Pole entries exactly as the spec's source document. Mark strengthening/modification `service`; mark named height/sharer/cabinet variants `configuration`; other entries `product`. Add a review note for overlapping ranges/capabilities rather than inventing SKUs or merging entries.
- [x] Implement `seedProducts` using stable-key lookup across drafts and published records, then explicit draft creation. Preserve existing records, collect individual errors, report counts, return failure exit status when needed. Keep module imports side-effect-free with a CLI guard and close Payload/SQLite in `finally`. Add `cms:seed-products` invoking `tsx --env-file=.env scripts/cms/seed-products.ts`.
- [x] Run the product tests and `npm run typecheck`; expect all 20 records private and retry/edit-preservation assertions passing. Do not seed the real review database until final verification in Task 5.
- [x] Review the named-file diff and checkpoint this task when Git writes are available.

### Task 3: Implement the published-content read boundary

**Files:** Create `src/cms/public-model.ts`, `src/cms/public-reader.ts`, `src/cms/public-content.ts`, `tests/cms/public-content.test.ts`, `tests/cms/public-model.test.ts`.

**Interfaces:** Consume the shared DTOs and Task 1 fixtures. Export `readPublishedContent(payload: Payload): Promise<PublishedContent>` from the reader and `getPublishedContent(): Promise<PublishedContent>` from the server-only entry point. Export pure helpers `toPublicImage(media: Media | null): PublicImage | undefined`, `safeWebUrl(value: string): string | undefined`, `contactHref(kind: 'email' | 'phone', value: string): string | undefined`, and `usePublishedList<T>(published: T[], fallback: T[]): T[]` from the model. `Media` is the generated Payload type.

- [x] Write failing real-Payload tests covering draft-only, publish A, save draft B, publish B and unpublish for Solutions, Products, FAQs and Site Settings. Assert each public DTO matches the expected published value, never latest draft text. Assert unsupported solution slugs and unassigned/wrong-group FAQs are absent. Test product/FAQ ordering by `displayOrder`, then numeric ID.
- [x] Add media/partner tests: approved image renders; pending/rejected image never yields a URL; an approved MP4 is not accepted as a product image/logo; published partners require `nameVerified` plus approved image; revocation removes them. Assert JSON serialization of every DTO excludes unique private-note/import-key/source-reference sentinels.

  In the Solutions lifecycle test, after fixture A was published and fixture B
  saved with `draft: true`, pin the exact public boundary:
  ```ts
  const content = await readPublishedContent(payload)
  assert.equal(content.solutions['telecom-tower-monopole']?.title, 'PUBLIC_A')
  assert.equal(JSON.stringify(content).includes('DRAFT_B'), false)
  assert.equal(JSON.stringify(content).includes('PRIVATE_REVIEW_NOTE'), false)
  ```

- [x] Add pure tests for HTTP(S)-only web links, Payload-relative `/api/media/file/` image URLs, unsafe protocol/path rejection, image alt fallback, and safe constructed email/phone links. Reject control characters and query injection in email values. Assert `usePublishedList([], fallback)` returns fallback and a nonempty published array is returned without appended fallback entries.
- [x] Run `npx tsx --test tests/cms/public-content.test.ts tests/cms/public-model.test.ts`; confirm expected missing-module failures.
- [x] Implement collection queries with explicit published-status constraints, `draft: false`, `overrideAccess: false`, `user: null` and `depth: 0`. Fetch all matching entries using explicit pagination rather than the default ten-record limit. Fetch approved image Media by referenced IDs with anonymous access; project typed DTOs with only the specified fields. Use tower-group filtering for FAQs; retain all supported product groups in the DTO for future section filtering.
- [x] Implement the settings helper as the only trusted read: `findGlobal({ slug: 'site-settings', draft: false, overrideAccess: true, depth: 0 })`, require returned `_status === 'published'`, then whitelist contact/link fields. Do not fall back to `draft: true`, version queries or user cookies. Verify actual installed-version behavior with the lifecycle tests before relying on it.
- [x] Catch query failures per content section, emit concise server-side section/error-category logs without document bodies or secret-bearing error objects, and return that section's empty/null value. Add a reader test with an injected failing query proving failure isolation and no elevated retry.
- [x] Add `public-content.ts` with `import 'server-only'`, `getPayload({ config })` and the reader call. Do not add persistent caching, a public draft endpoint or client runtime imports of the reader/config.
- [x] Run the targeted tests, `npm test` and `npm run typecheck`; expect lifecycle, redaction, >10-record pagination, ordering, bad-media/link and failure-isolation tests to pass.
- [x] Review the named-file diff and checkpoint this task when Git writes are available.

### Task 4: Wire the four existing routes and preserve fallback behavior

**Files:** Create `src/components/sites/figma-jitrapadu/shared/PublishedContentProvider.tsx`. Modify `src/app/(frontend)/layout.tsx`, the four existing frontend `page.tsx` files as needed, `home-design.tsx`, `tower-design.tsx`, `shared/Header.tsx`, `shared/Footer.tsx`, `shared/TowerFaq.tsx`, `shared/TrustedPartners.tsx`. Modify `tests/cms/public-model.test.ts`; add narrowly scoped CSS only if missing-image layout needs it.

**Interfaces:** Provider exports `PublishedContentProvider({ value, children }: { value: PublishedContent; children: ReactNode })` and `usePublishedContent(): PublishedContent`. Consume Task 3 DTOs/helpers. Provider default is `emptyPublishedContent()` so standalone component rendering still uses static fallback. Add `towerProducts(content: PublishedContent): PublicProduct[]` and `settingsWithFallback(published: PublicSiteSettings | null, fallback: PublicSiteSettings): PublicSiteSettings` to `public-model.ts`. The settings helper selects nonblank, valid published fields individually; normalized empty link arrays use fallback arrays.

- [x] Add failing model tests for selecting only tower-group products, using a complete published list without static appendages and per-field settings fallback. Pin unsupported homepage slots in Task 3's reader tests and blank optional summary fallback in Task 5's HTTP tests. Do not test Tailwind class strings or mirror component markup.

  ```ts
  assert.deepEqual(usePublishedList(['CMS'], ['STATIC']), ['CMS'])
  assert.deepEqual(usePublishedList([], ['STATIC']), ['STATIC'])
  assert.equal(settingsWithFallback(null, fallback).email, fallback.email)
  assert.ok(towerProducts(content).every(product => product.group === 'telecom-tower-monopole'))
  ```
- [x] Run `npx tsx --test tests/cms/public-model.test.ts`; confirm the new behavioral assertions fail before implementation.
- [x] Make the frontend layout async, explicitly request-rendered with `dynamic = 'force-dynamic'`, call `getPublishedContent` once per full request and wrap children in the provider. Keep Payload admin layout separate and preserve existing fonts/styles/metadata.
- [x] In homepage cards, match the exact three solution slugs to existing fixed slots. Published title/summary and approved `cardImage` override only their corresponding display values; missing summary/image keeps the existing static value. Preserve existing card destinations and anchors; never generate routes from arbitrary CMS slugs.
- [x] On the tower page, use the matching published solution title and plain-text body paragraphs. Render published tower products in order, otherwise the current six static cards. Missing CMS product images omit the image element rather than borrowing an unverified picture. Use targeted published FAQs when nonempty, otherwise the existing five FAQs; preserve one-open accordion semantics and accessibility.
- [x] In TrustedPartners, use the eligible published list when nonempty, otherwise the existing static rows. Split the published list into up to two nonempty rows; support one partner. Preserve accessible first-copy logos and hidden duplicated marquee copies, using stable IDs and image dimensions where provided.
- [x] Use settings in Header/Footer company/contact display and every existing matching email/phone CTA on all four routes. Construct safe hrefs using Task 3 helpers; retain the existing static field when the published field is blank/invalid. Do not invent new social/map sections where none exist or alter navigation destinations unrelated to contact data.
- [x] Run targeted model tests, `npm test`, `npm run lint`, `npm run typecheck`, then `npm run build`. Expected: no errors; all four frontend routes request-rendered and Payload still isolated. Build must enforce that the server-only entry point is absent from client import paths.
- [x] Review the named-file diff and checkpoint this task when Git writes are available.

### Task 5: Prove publication/privacy through HTTP and document delivery

**Files:** Create `scripts/cms/verify-frontend.ts`, `docs/cms-frontend-report.txt`. Modify `package.json`, `README-JITRAPADU.md`; use existing fixture helpers where appropriate.

**Interfaces:** CLI `npm run cms:verify-frontend` runs after a successful production build, starts its own disposable production server, verifies lifecycle behavior serially, prints a credential-free summary and exits nonzero on failure. No fixture admin survives teardown.

- [x] Add the verification script with an allocated temporary database/upload root, fresh test secret and an available loopback port. Set `DATABASE_URI`, `PAYLOAD_UPLOAD_DIR`, `NEXT_PUBLIC_SERVER_URL` and `PORT` explicitly for its child processes; do not inherit a `.env` database path. Initialize the isolated schema and random fixture administrator before starting `next start --hostname localhost --port <port>`. Pass credentials only in memory or private IPC, never command arguments/logs. On every exit, stop only its own server and remove only its own test root.
- [x] Assert zero published fixtures yield static HTML on all four routes. Via authenticated REST, create and publish distinct solution/product/FAQ/settings/partner fixtures and assert their text/URLs appear in the appropriate fetched HTML. Assert first page and serialized RSC data contain no draft/private sentinels. Request each page anonymously and with reviewer cookies; public content must match.
- [x] Save later draft revisions via authenticated REST, refresh HTML and confirm old published content remains. Publish those revisions and confirm new values appear without restart/rebuild; unpublish and confirm the prior CMS values disappear and documented fallback returns. Check one-record and empty lists, wrong-target FAQs and unsupported solutions.
- [x] Verify anonymous REST collection reads omit private fields, `draft=true` cannot reveal drafts, Source Pages/global settings/version endpoints remain restricted, anonymous writes fail, and authenticated reviewers can see their drafts. Check pending/rejected file URLs return denial without response bytes. Approve/revoke fixture images and partner names and confirm next-request behavior; media approval alone is independent of linked content publication.
- [x] Run `npm run cms:verify-frontend`. Expected: lifecycle/API/privacy checks all pass, exit 0 and guaranteed cleanup. Fix failures using actual request/response evidence; never publish real review records to make tests pass.
- [x] Use existing browser tooling against the isolated server during verification (provide an explicit interactive/pause mode if needed). Inspect homepage/tower at desktop and mobile sizes, FAQ interaction, partner accessibility, updated contact links, and the unchanged About/Factory layouts. Save screenshots under `docs/audit-2026-10-21/` without credentials or private draft text. Recheck `/admin` remains usable.
- [x] Run the product seed against the real local review database once, then rerun serially. Expected: first run creates 20 draft entries unless already seeded; second run creates 0 and skips 20. Verify anonymous Product reads return 0 for these seeds and previously imported records/media remain drafts/pending. Record the actual counts; do not overwrite human edits if review has started.
- [x] Update README commands, content-to-section mapping, source links, media/name approval, FAQ targeting, draft revisions, next-refresh publication and empty-list fallback. Explicitly document which page sections remain static and that RDS/Smart Pole products have no current public listing. Keep production storage/deployment limits and backup guidance.
- [x] Run final `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, then `npm run cms:verify-frontend` against that build. Record commands/results and browser evidence in the report. Run the prior `cms:verify` only when its original-draft baseline still applies, never after genuine editorial publication.
- [x] Complete one fresh whole-change code review under the executing-plans workflow, resolve material findings and rerun only affected checks. Review all changes against the approved spec, preserving pre-existing work. Summarize the result and remaining operating limits; do not push, merge or deploy without a user request.

## Self-review and handoff

Spec coverage: Task 1 owns privacy/schema compatibility; Task 2 owns all 20 draft
seeds and provenance; Task 3 owns public queries/DTOs/media/global lifecycles;
Task 4 owns route/component mappings and fallbacks; Task 5 owns real HTTP/browser
verification, review-data preservation and editorial delivery. All five Review
Focus conditions have explicit tests. No new route or automatic publication is
introduced. Shared property names and exact group keys are consistent throughout.

Execution remains direct implementation in this chat. Wait for the user's review
of this written plan before starting Task 1, then use `superpowers:executing-plans`.
