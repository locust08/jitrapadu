import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, access, rm } from 'node:fs/promises'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { prepareReviewWorkspace } from '../../scripts/cloudflare/build-review.ts'
import { emptyPublishedContent } from '../../src/cms/content-types.ts'

test('review export contains public routes and snapshot but excludes CMS, secrets and private media', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'jitrapadu-review-check-'))
  const repo = path.join(root, 'repo'), workspace = path.join(root, 'workspace')
  try {
    for (const dir of ['src/app/(frontend)', 'src/app/(payload)/admin', 'src/components', 'src/cms', 'public', 'node_modules', 'temp/cms/uploads']) await mkdir(path.join(repo, dir), { recursive: true })
    await writeFile(path.join(repo, 'src/app/(frontend)/layout.tsx'), "export const dynamic = 'force-dynamic';\nexport default function Layout() { return null }\n")
    await writeFile(path.join(repo, 'src/app/(frontend)/page.tsx'), 'export default function Page() { return null }')
    await writeFile(path.join(repo, 'src/app/(payload)/admin/page.tsx'), 'PRIVATE_ADMIN')
    await writeFile(path.join(repo, '.env'), 'PRIVATE_SECRET')
    await writeFile(path.join(repo, 'temp/cms/uploads/private.jpg'), 'PRIVATE_IMAGE')
    for (const file of ['src/cms/content-types.ts', 'src/cms/public-model.ts', 'src/payload-types.ts', 'postcss.config.mjs']) await writeFile(path.join(repo, file), '')
    await writeFile(path.join(repo, 'tsconfig.json'), JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'], '@payload-config': ['./src/payload.config.ts'] } } }))
    await writeFile(path.join(repo, 'package.json'), JSON.stringify({ name: 'review-fixture', type: 'module' }))
    const content = emptyPublishedContent(); content.siteSettings = { companyName: 'Approved company', socialLinks: [], directionsLinks: [] }
    await prepareReviewWorkspace({ repoRoot: repo, workspace, content })
    assert.equal((await readFile(path.join(workspace, 'src/app/layout.tsx'), 'utf8')).includes('force-dynamic'), false)
    assert.equal(JSON.parse(await readFile(path.join(workspace, 'src/cms/review-content.json'), 'utf8')).siteSettings.companyName, 'Approved company')
    for (const file of ['.env', 'src/payload.config.ts', 'src/payload-types.ts', 'src/app/(payload)', 'src/app/admin', 'temp/cms/uploads/private.jpg']) await assert.rejects(access(path.join(workspace, file)))
    assert.match(await readFile(path.join(workspace, 'next.config.mjs'), 'utf8'), /output: 'export'/)
  } finally { await rm(root, { recursive: true, force: true }) }
})
