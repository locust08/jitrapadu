# Payload import implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** A local Payload admin containing original-site content as reviewable drafts and downloaded assets with provenance.

**Architecture:** Payload runs inside the existing Next.js app using its SQLite adapter. Separate frontend/admin layouts preserve styling. A repeatable Local API importer consumes a source manifest, deduplicates by stable keys and skips existing records so editor changes survive reruns.

**Tech Stack:** Next.js 16.4.2, compatible current Payload packages pinned to one version, TypeScript, SQLite, Node test runner with a TS runner as needed.

**Spec:** docs/superpowers/specs/2026-10-21-payload-import-design.md

## Global constraints

- All imported content stays draft. Keep existing public pages unchanged.
- No predictable admin credentials, public write endpoints, draft leaks or public unreviewed media.
- Local SQLite, uploads, secrets, original HTML and binary download bundles stay out of Git.
- Preserve original URLs, checksums, extraction dates and review conflicts.
- No News/Events/CSR fabrication, deployment or public frontend CMS conversion.

## Review focus

- Anonymous Local/REST API queries must not leak drafts or unapproved media; use access control explicitly, including Local API override behavior.
- Duplicate or interrupted imports must not overwrite reviewed edits or create duplicate records.
- Missing/corrupt assets must be recorded as failures, not reported as successful imports.
- Website Tailwind/global CSS must not leak into Payload admin or alter existing frontend routes.
- Import failures must produce truthful counts and nonzero exit status; source markup is untrusted data, never executable content.

### Task 1: Protected Payload admin

**Files:** `src/payload.config.ts`, `src/cms/access.ts`, `src/cms/collections.ts`, `src/cms/site-settings.ts`, `src/app/(payload)/**`, `src/app/(frontend)/**`, `next.config.ts`, `tsconfig.json`, `package.json`, `.gitignore`, `.env.example`, `tests/cms-access.test.ts`.

**Interfaces:** Export `isAdmin`, `authenticated`, `publishedOrAuthenticated` and a pending-media read policy for Payload access functions. Export configured collection/global schemas from the cms module. Generate Payload types and admin import map through supported tooling.

- [x] Write tests for anonymous draft/media denial, authenticated review and admin-only user management; run and confirm failure before implementing policies.
- [x] Install mutually compatible Payload/Next adapter/database/rich-text dependencies; isolate route layouts; configure local SQLite and secrets without logging them.
- [x] Implement Users, Media, Source Pages, Solutions, FAQs, Partners and Site Settings, matching the approved spec. Require stable unique import keys on imported collections and permit normal manual records without them.
- [x] Test admin bootstrap/login and frontend regression; run lint/typecheck/build and fix configuration incompatibilities.

### Task 2: Repeatable source import

**Files:** `scripts/cms/import-original.ts`, `scripts/cms/import-data.ts`, `tests/cms-import.test.ts`, existing `temp/original-site-import/**` (ignored extraction data).

**Interfaces:** `importOriginalSite(payload, sourceDirectory)` returns per-collection created/skipped/failed counts and a download reconciliation summary. Stable keys are prefixed `original:`. The CLI requires explicit execution and writes a JSON report outside public files.

- [x] Write tests that repeat imports skip existing keys and preserve human edits, failed asset reads remain failures, and each created content record is draft; run and confirm failure.
- [x] Validate the staged extraction data and downloads. Associate images/media with source pages and import checksums and review notes. Seed five source-page drafts, four FAQ drafts, original solution topics, partner assets and site settings without manufacturing facts.
- [x] Run importer against local SQLite. Rerun and verify no duplicate writes or overwrites. Save an import report with every rejected/failed item.
- [x] Use public-access queries to verify drafts/pending assets cannot be read anonymously. Verify draft counts using authenticated/trusted queries.

### Task 3: Review handoff and final verification

**Files:** `README-JITRAPADU.md`, `docs/cms-import-report.txt`, configuration and tests from Tasks 1–2 as needed.

- [x] Document local startup, first-user creation, import/rerun commands, review workflow, source conflicts, backup paths and production database/storage requirements.
- [x] Run meaningful access/import tests, lint, TypeScript and production build. Capture admin and existing frontend browser states. Do not expose or record credentials.
- [x] Reconcile actual source/download/import counts in the report and final response. State any unsupported assets and unresolved production setup explicitly.

## Self-review

All spec outcomes map to the three tasks. Tests cover public access, duplicate runs, editor preservation and missing assets; browser/build checks cover layout isolation and compatibility. Production hosting, live preview and public-page data conversion are intentionally outside this setup/import scope.
