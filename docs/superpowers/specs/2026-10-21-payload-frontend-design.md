# Published Payload content on the Jitrapadu frontend

## Outcome and agreed scope

Connect the existing website sections to Payload so publishing reviewed content
changes the website on its next full request. Drafts, later draft revisions and
unapproved media remain private. Preserve the current design and interactions.
The user approved this approach on 21 October 2026, including static fallback
and a Products collection seeded as drafts from the client materials.

This extends the existing local SQLite/Payload implementation. It does not
publish the imported records, deploy the site, add product detail pages or build
the missing RDS, Smart Pole, News, CSR or Contact routes. General page copy,
factory statistics, workflow steps and portfolio items remain in the current
frontend; this is a connection for the existing reusable CMS content and product
listing, not a general-purpose page builder.

## Product authority and seed content

Use the client-provided company profile for technical reference, the website
copywriting document for descriptions/grouping, and reviewed client photos for
images. Neither source establishes final approval or a maintained SKU catalogue.
Payload becomes the operational publishing source after human review.

- Company profile: https://drive.google.com/file/d/1OtaaEO4EoDQt45aidooLjxbnmTPXSAXF/view
- Copywriting: https://docs.google.com/document/d/13D7GQ_s-uHCLK_wcU5uR8bcUc_-38DXl2OkP_e2dNuk/edit
- Photos: https://drive.google.com/drive/folders/1zV83pD-kEjy0L3b_8KQPNK5dAS66WzpR
- Detailed findings: `docs/audit-2026-10-21/product-content-sources.txt`.

Add a draft-enabled Products collection containing title, unique slug,
description, solution group, entry type (product, configuration or service),
optional image, numeric display order and provenance/review fields. The three
solution groups are Telecom Tower & Monopole, Rapid Deployment System and
Smart Pole & Lamp Pole. Products inherit the authenticated write and
published-only anonymous read rules of other content collections.

Seed the three explicitly headed Product Range sections in the copywriting
document: seven tower entries, six RDS entries and seven Smart Pole/Lamp Pole
entries. Retain their grouping and wording, flag overlapping configurations for
review, and classify Tower Strengthening and Modification as a service. These
are website listing entries, not invented SKUs. Do not derive extra products
from project history, infer availability, or invent technical specifications.
Record stable import keys and the copywriting source URL; technical-reference
and image-review notes remain private. Reruns skip existing records to preserve
editor changes and report created/skipped/failed counts. All seeds remain
drafts. Missing verified images are allowed and render without a broken image.
No additional Drive assets are downloaded by this change.

## Public data boundary

A server-only content adapter owns Payload queries and returns small typed
objects for frontend components. Client modules never import Payload/config,
receive credentials, or fetch drafts. Public requests do not forward a logged-in
reviewer's user, cookies or draft-mode state into content queries.

Collection queries explicitly use `draft: false`, `overrideAccess: false`,
anonymous identity and `_status = published`. Read relationship IDs at depth
zero and resolve public images separately through Media access control with an
explicit approved-status check. Return only display fields; never serialize
whole Payload documents or review metadata into page props.

Site Settings remains protected on its raw global endpoint. A narrowly scoped
server helper reads its persisted published document with `draft: false`, checks
`_status = published`, and projects only company/contact/link fields. This is
the only elevated public-read exception; it must never request latest drafts
or return review metadata. A draft-only global yields no public override.
Integration tests must verify the installed Payload version's global behavior,
including a published version followed by a newer draft.

Review notes, import keys, extraction metadata, source blocks, checksums and
media source-reference bundles receive authenticated field-read protection
where their collections otherwise permit public reads. Source Pages become
review-only at the collection boundary: publishing an archival source record
must not expose it through the public API or attach it to a website route.
Reviewers retain authenticated access to drafts and version history.

## Mapping to the existing website

| CMS content | Public destination |
| --- | --- |
| Published Solutions with one of the three supported slugs | Matching existing homepage solution card: title, summary and optional approved card image |
| Published `telecom-tower-monopole` Solution | Existing tower page title and introduction body, rendered as plain-text paragraphs |
| Published tower-group Products | Tower page Product Range, ordered by display order then stable ID |
| Published tower-targeted FAQs | Tower FAQ accordion, ordered by display order then stable ID |
| Published, name-verified Partners with approved image logos | Homepage partner section |
| Published Site Settings | Shared company/contact information and matching email/telephone enquiry links on all four existing routes |

Add optional summary and card-image fields to Solutions so homepage summaries
need not be generated by truncating long bodies or choosing an arbitrary media
relationship. Add an explicit FAQ solution-group target and display order;
legacy imported FAQs default to unassigned so RDS/Smart Pole questions do not
appear on the tower page merely because someone publishes them. Add partner
display order. Existing import commands remain compatible with optional fields.

Solution slugs are the fixed mapping keys. Unsupported legacy topics, including
Cell on Wheels and Sea Freight Delivery, do not create public cards or routes.
Existing RDS/Smart Pole homepage anchors remain valid. Product records in those
groups are reviewable now but have no public listing until those pages exist.
The admin descriptions must explain these destinations and limits.

Preserve the existing component structure, responsive CSS, accordions, motion,
header links and partner accessibility. Pass public data through server page
wrappers and a small typed shared provider or explicit component props; keep
the server adapter outside the client import graph. Validate link schemes:
email/telephone links are constructed from contact values, and configurable
web links permit only HTTP(S). Render body text as escaped text, never raw HTML.

## Fallback and publication lifecycle

Fallback is the existing checked-in frontend content, never a CMS draft.
For a solution slot or Site Settings field with no published value, retain the
existing value. For products, FAQs and partners, use the eligible published
list when nonempty; otherwise use that section's existing static list. Do not
merge draft or ineligible records into either list. Once a published list is
available, do not append static entries that editors omitted.

Saving a later draft leaves the last published content visible. Publishing
replaces it. Unpublishing removes that CMS override: a remaining nonempty
published list is displayed, otherwise static fallback returns. This fallback
behavior is deliberate; unpublishing every record is not a way to hide an
entire existing section. A separate section-visibility feature is outside scope.
Unapproved media never supplies a URL, even when linked from published content.
Product images may be omitted; ineligible partners are excluded altogether.

Render the four frontend routes at request time, without persistent content
caching or a rebuild requirement. Publication is visible after a full refresh
or new request; already-open tabs are not updated in real time. On CMS query
failure, log a concise server-side error without document bodies or secrets and
use the static fallback. Do not turn access errors into elevated draft reads.

## Verification and acceptance

1. Before any publication, all four public routes retain their existing content
   and layout. Draft product seeds do not alter the public website.
2. In an isolated test database, publish distinctive fixtures and verify their
   actual public HTML and API behavior. A later draft must not replace the
   published text; publishing it must do so without rebuilding. Unpublishing
   removes its CMS value and follows the documented fallback behavior.
3. Repeat the public-read checks with reviewer cookies present: public HTML and
   serialized props must still exclude draft text and private review fields.
   Authenticated admin reads can still see drafts and versions.
4. Test Site Settings draft-only, published, subsequent draft, and unpublished
   states against actual Payload operations. Its raw anonymous endpoint stays
   protected. Test all public collection APIs for private field omission.
5. Pending/rejected media and their file URLs remain unavailable anonymously.
   Publishing content must not approve its related media. Revoking image approval
   removes it from newly rendered content. Partners also require name verification.
6. Confirm FAQ targeting and product ordering, empty-list fallback, unsupported
   solution filtering, escaped text and unsafe-link rejection. Test seed reruns
   without overwriting edited records or publishing anything.
7. Keep lifecycle fixtures and temporary accounts out of the review database;
   preserve all existing imported drafts and pending media. Update prior draft-
   import verification only where the new review-only Source Pages rule requires
   it; do not redefine successful verification as publishing real content.
8. Run meaningful automated tests, lint, typecheck and production build. Browser
   checks cover homepage/tower published content, draft isolation, all four routes
   and mobile layout. Record remaining limitations and the editorial workflow.

## Delivery and operating limits

Update the README with exact collection-to-section mappings, product seed and
verification commands, publication/fallback behavior, media approval and FAQ
targeting. No automatic publishing, new administrator credentials, public draft
preview endpoint or deployment is included. Local SQLite and uploads still need
the previously documented production database/storage/backup decisions.
