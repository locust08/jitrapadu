import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { randomBytes, randomUUID } from 'node:crypto'
import { createServer } from 'node:net'
import { writeFile, mkdir } from 'node:fs/promises'
import { withTestPayload } from '../../tests/cms/fixtures'
import { seedPosts } from './seed-posts'
const abort = new AbortController()
let exitCode = 0
const stop = () => { exitCode = 143; abort.abort(new Error('Verification interrupted')) }
process.once('SIGTERM', stop); process.once('SIGINT', stop)
try {
  await withTestPayload(async (payload, paths) => {
    const probe = createServer(); await new Promise<void>(r => probe.listen(0, 'localhost', r))
    const address = probe.address(); assert.ok(address && typeof address === 'object')
    const port = address.port; await new Promise<void>(r => probe.close(() => r()))
    const origin = `http://localhost:${port}`, password = randomBytes(32).toString('hex')
    await payload.create({ collection: 'users', data: { email: 'backend-admin@example.invalid', password, role: 'admin' } })
    await payload.create({ collection: 'users', data: { email: 'backend-editor@example.invalid', password, role: 'editor' } })
    await seedPosts(payload)
    const logs: string[] = []
    const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', 'localhost', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NODE_ENV: 'production', PAYLOAD_SECRET: payload.config.secret, DATABASE_URI: `file:${paths.database}`, PAYLOAD_UPLOAD_DIR: paths.uploads, NEXT_PUBLIC_SERVER_URL: origin, CONTACT_ALLOWED_ORIGINS: origin, SMTP_HOST: '', SMTP_FROM_ADDRESS: '', PORT: String(port) } })
    server.stdout.on('data', d => logs.push(String(d))); server.stderr.on('data', d => logs.push(String(d)))
    const fetchAPI = (route: string, init: RequestInit = {}) => fetch(origin + route, { ...init, signal: abort.signal })
    let adminToken = '', editorToken = ''
    const api = async (route: string, method = 'GET', data?: unknown, token = adminToken) => {
      const response = await fetchAPI(route, { method, headers: { ...(data ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `JWT ${token}` } : {}) }, body: data ? JSON.stringify(data) : undefined })
      assert.ok(response.ok, `${method} ${route}: ${response.status}`); return response.json()
    }
    const input = { fullName: 'PRIVATE_CONTACT_SENTINEL', email: 'private-backend@example.test', message: 'PRIVATE_MESSAGE_SENTINEL', consent: true }
    const contact = (data: unknown = input, key: string = randomUUID(), headers: Record<string, string> = {}) => fetchAPI('/api/contact', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': key, ...headers }, body: JSON.stringify(data) })
    try {
      const deadline = Date.now() + 120000
      while (true) {
        abort.signal.throwIfAborted()
        try { if ((await fetchAPI('/api/content/posts')).ok) break } catch {}
        if (server.exitCode !== null || Date.now() > deadline) throw new Error('Disposable server failed to start')
        await new Promise(r => setTimeout(r, 250))
      }
      adminToken = (await api('/api/users/login', 'POST', { email: 'backend-admin@example.invalid', password }, '')).token
      editorToken = (await api('/api/users/login', 'POST', { email: 'backend-editor@example.invalid', password }, '')).token
      assert.equal((await api('/api/content/posts')).totalDocs, 0)
      const drafts = await payload.find({ collection: 'posts', draft: true, limit: 10 })
      const news = drafts.docs.find(p => p.category === 'news')!, event = drafts.docs.find(p => p.category === 'event')!
      await api(`/api/posts/${news.id}`, 'PATCH', { title: 'PUBLIC_NEWS', reviewNotes: 'PRIVATE_EDITORIAL_SENTINEL', _status: 'published' })
      const premature = await fetchAPI(`/api/posts/${event.id}`, { method: 'PATCH', headers: { Authorization: `JWT ${adminToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ _status: 'published' }) }); assert.equal(premature.status, 400)
      await api(`/api/posts/${event.id}`, 'PATCH', { eventStart: '2026-11-01T00:00:00Z', eventLocation: 'Confirmed fixture only', _status: 'published' })
      const list = await api('/api/content/posts?category=news,event&limit=1'); assert.equal(list.totalDocs, 2); assert.equal(list.totalPages, 2)
      const before = await api(`/api/content/posts/${news.slug}`)
      await api(`/api/posts/${news.id}?draft=true`, 'PATCH', { title: 'PRIVATE_DRAFT_SENTINEL', _status: 'draft' })
      for (const cookie of ['', `payload-token=${adminToken}`]) {
        const response = await fetchAPI(`/api/content/posts/${news.slug}?draft=true`, { headers: { Cookie: cookie } })
        assert.equal(response.status, 200); assert.equal(response.headers.get('Cache-Control'), 'no-store')
        assert.equal((await response.json()).title, 'PUBLIC_NEWS')
      }
      assert.equal(JSON.stringify(before).includes('PRIVATE_EDITORIAL_SENTINEL'), false)
      assert.equal((await fetchAPI('/api/content/posts?category=unknown')).status, 400)
      assert.equal((await fetchAPI('/api/content/posts/no-such-post')).status, 404)
      await api(`/api/posts/${news.id}`, 'PATCH', { _status: 'draft' })
      assert.equal((await fetchAPI(`/api/content/posts/${news.slug}`)).status, 404)
      const key = randomUUID()
      assert.equal((await contact(input, key)).status, 202)
      assert.equal((await contact(input, key)).status, 202)
      assert.equal((await contact({ ...input, message: 'Different message' }, key)).status, 409)
      assert.equal((await contact({ ...input, website: 'bot' })).status, 202)
      assert.equal((await contact(input, randomUUID(), { Origin: 'https://evil.test', 'X-Forwarded-Host': `localhost:${port}` })).status, 403)
      assert.equal((await contact(input, 'bad')).status, 400)
      assert.equal((await contact({ ...input, consent: false })).status, 422)
      assert.equal((await contact(input, randomUUID(), { 'Content-Type': 'text/plain' })).status, 415)
      const stream = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode('x'.repeat(17000))); c.close() } })
      const oversized = await fetchAPI('/api/contact', { method: 'POST', body: stream, duplex: 'half', headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID() } } as RequestInit)
      assert.equal(oversized.status, 413)
      const race = await Promise.all(Array.from({ length: 6 }, () => contact({ ...input, email: 'race-backend@example.test' })))
      assert.equal(race.filter(r => r.status === 202).length, 5)
      assert.equal(race.filter(r => r.status === 429).length, 1)
      assert.ok(Number(race.find(r => r.status === 429)!.headers.get('Retry-After')) > 0)
      const records = await payload.find({ collection: 'enquiries', limit: 100 }); assert.equal(records.totalDocs, 6)
      assert.ok(records.docs.every(e => e.notificationStatus === 'not-configured'))
      for (const token of ['', editorToken]) {
        for (const route of ['/api/enquiries', '/api/contact-rate-events', '/api/posts/versions']) {
          if (route === '/api/posts/versions' && token) continue
          const r = await fetchAPI(route, { headers: token ? { Authorization: `JWT ${token}` } : {} }); assert.ok([401, 403, 404].includes(r.status), `${route}: ${r.status}`)
        }
        const direct = await fetchAPI('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `JWT ${token}` } : {}) }, body: JSON.stringify(input) }); assert.ok([401, 403].includes(direct.status))
      }
      for (const secret of [input.email, input.fullName, input.message]) assert.equal(logs.join('').includes(secret), false, 'PII in server logs')
      console.log(JSON.stringify({ verified: true, drafts: 'private with reviewer cookies', contact: 'durable, private and limited', enquiries: records.totalDocs, realEmail: false, isolated: true }))
      if (process.argv.includes('--interactive')) {
        const file = process.argv.find(a => a.startsWith('--status-file='))?.slice(14)
        if (file) await writeFile(file, JSON.stringify({ root: paths.root, pid: server.pid, origin }), { flag: 'wx', mode: 0o600 })
        await new Promise<void>((resolve, reject) => { const finish = () => resolve(); process.stdin.resume(); process.stdin.once('data', finish); abort.signal.addEventListener('abort', () => { process.stdin.removeListener('data', finish); reject(abort.signal.reason) }, { once: true }); if (abort.signal.aborted) reject(abort.signal.reason) }); process.stdin.pause()
      }
    } catch (error) {
      if (!exitCode) { await mkdir('temp', { recursive: true }); await writeFile('temp/cms-backend-verification.log', logs.join('')); }
      throw error
    } finally {
      server.kill('SIGTERM')
      await new Promise<void>(resolve => { if (server.exitCode !== null) return resolve(); server.once('exit', () => resolve()); setTimeout(() => { server.kill('SIGKILL'); resolve() }, 5000).unref() })
    }
  })
} catch (error) { if (!exitCode) throw error }
finally { process.removeListener('SIGTERM', stop); process.removeListener('SIGINT', stop) }
process.exit(exitCode)
