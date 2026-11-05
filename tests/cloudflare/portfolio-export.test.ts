import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

// Run against a real static build, so broken route generation, filtering and
// navigation are caught together. The workspace preparation test runs separately.
const output = process.env.JITRAPADU_REVIEW_EXPORT
const categories = [
  ['telecom-tower-monopole', 'Teluk Muroh, Manjung, Perak'],
  ['rapid-deployment-system', 'Kajang, Selangor'],
  ['smart-pole-lamp-pole', 'Juru, Pulau Pinang'],
] as const
const introduction = 'Proven Projects Across Telecom, Smart Infrastructure and Custom Steel Solutions'

test('portfolio export provides distinct category pages with scoped projects and navigation', { skip: !output }, () => {
  for (const [slug, project] of categories) {
    const file = path.join(output!, 'portfolio', slug, 'index.html')
    assert.ok(existsSync(file), `Missing portfolio category page: ${slug}`)
    const html = readFileSync(file, 'utf8')
    const main = html.split('<main')[1].split('</main>')[0]
    assert.equal(main.includes(introduction), false, `${slug} repeats the overview introduction`)
    assert.equal((main.match(/aria-label="View project:/g) || []).length, 3)
    assert.ok(main.includes(project), `${slug} is missing its own projects`)
    for (const [otherSlug, otherProject] of categories) {
      assert.ok(html.includes(`/portfolio/${otherSlug}`), `Missing category link: ${otherSlug}`)
      if (otherSlug !== slug) assert.equal(main.includes(`aria-label="View project: ${otherProject}`), false)
    }
  }
  const overview = readFileSync(path.join(output!, 'portfolio/index.html'), 'utf8').split('<main')[1].split('</main>')[0]
  assert.ok(overview.includes(introduction))
  assert.equal((overview.match(/aria-label="View project:/g) || []).length, 9)
})
