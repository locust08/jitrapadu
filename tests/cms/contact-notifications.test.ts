import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { withTestPayload, withSecondPayload } from './fixtures.ts'
import { storeContact } from '../../src/cms/contact-store.ts'
import { notifyEnquiry, retryNotifications } from '../../src/cms/contact-notifications.ts'
import { createContactEmailConfig, buildContactMail, type ContactMail } from '../../src/cms/contact-email.ts'
const input = { fullName: '测试 <b>Person</b>', email: 'person@example.test', message: 'Project <script>literal text</script>', consent: true as const }

test('notification saves before send, fixes safe headers and skips sent retries', () => withTestPayload(async payload => {
  const { enquiryId } = await storeContact(payload, randomUUID(), input)
  const sent: ContactMail[] = []
  const transport = { async send(mail: ContactMail) { assert.ok(await payload.findByID({ collection: 'enquiries', id: enquiryId })); sent.push(mail) } }
  assert.equal(await notifyEnquiry(payload, enquiryId, transport), 'sent')
  assert.equal(sent.length, 1); assert.equal(sent[0].to, 'hello@jitrapadu.com'); assert.equal(sent[0].replyTo, input.email)
  assert.equal(sent[0].subject, 'New Jitrapadu website enquiry'); assert.ok(sent[0].text.includes(input.message)); assert.equal('html' in sent[0], false)
  assert.equal(await notifyEnquiry(payload, enquiryId, transport), 'skipped')
  assert.equal(sent.length, 1)
  const saved = await payload.findByID({ collection: 'enquiries', id: enquiryId })
  assert.equal(saved.notificationStatus, 'sent'); assert.equal(saved.notificationAttempts, 1)
  assert.equal(buildContactMail(saved, 'website@example.test').messageId, `<jitrapadu-enquiry-${enquiryId}@example.test>`)
  assert.equal(buildContactMail(saved, 'website@example.test').from, 'website@example.test')
}))

test('missing mail configuration is silent and failed transport preserves retryable enquiry', () => withTestPayload(async payload => {
  assert.equal(createContactEmailConfig({}).configured, false)
  assert.equal(createContactEmailConfig({ SMTP_HOST: 'localhost' }).configured, false)
  assert.equal(createContactEmailConfig({ SMTP_HOST: 'localhost', SMTP_PORT: 'bad', SMTP_FROM_ADDRESS: 'website@example.test' }).configured, false)
  assert.equal(createContactEmailConfig({ SMTP_HOST: 'localhost', SMTP_PORT: '587', SMTP_FROM_ADDRESS: 'website@example.test', SMTP_SECURE: 'no' }).configured, false)
  const disabled = await createContactEmailConfig({}).adapter({ payload })
  await assert.rejects(disabled.sendEmail({ to: 'test@example.test', subject: 'private', text: 'private' }))
  const { enquiryId } = await storeContact(payload, randomUUID(), input)
  assert.equal(await notifyEnquiry(payload, enquiryId, null), 'not-configured')
  assert.equal((await payload.findByID({ collection: 'enquiries', id: enquiryId })).notificationAttempts, 0)
  assert.equal(await notifyEnquiry(payload, enquiryId, { async send() { throw new Error('RAW_PRIVATE_TRANSPORT_ERROR') } }), 'failed')
  let record = await payload.findByID({ collection: 'enquiries', id: enquiryId })
  assert.equal(record.notificationError, 'transport'); assert.equal(JSON.stringify(record).includes('RAW_PRIVATE'), false)
  const report = await retryNotifications(payload, { async send() {} })
  assert.equal(report.sent, 1)
  record = await payload.findByID({ collection: 'enquiries', id: enquiryId }); assert.equal(record.notificationAttempts, 2)
}))

test('concurrent workers claim once, expired leases recover, stale completion cannot overwrite', () => withTestPayload(async (payload, paths) => withSecondPayload(payload, paths, async other => {
  const { enquiryId } = await storeContact(payload, randomUUID(), input)
  let sends = 0
  const transport = { async send() { sends++; await new Promise(r => setTimeout(r, 60)) } }
  const outcomes = await Promise.all([notifyEnquiry(payload, enquiryId, transport), notifyEnquiry(other, enquiryId, transport)])
  assert.deepEqual(outcomes.sort(), ['sent', 'skipped']); assert.equal(sends, 1)
  await payload.update({ collection: 'enquiries', id: enquiryId, data: { notificationStatus: 'sending', notificationClaim: 'old', notificationLeaseUntil: '2000-01-01T00:00:00Z' } })
  assert.equal(await notifyEnquiry(payload, enquiryId, transport), 'sent'); assert.equal(sends, 2)
  await payload.update({ collection: 'enquiries', id: enquiryId, data: { notificationStatus: 'pending' } })
  await notifyEnquiry(payload, enquiryId, { async send() { await other.update({ collection: 'enquiries', id: enquiryId, data: { notificationStatus: 'failed', notificationClaim: 'newer-worker' } }) } })
  const latest = await payload.findByID({ collection: 'enquiries', id: enquiryId })
  assert.equal(latest.notificationStatus, 'failed'); assert.equal(latest.notificationClaim, 'newer-worker')
})))

test('configured adapter sends only to a loopback SMTP capture', async () => {
  const { createServer } = await import('node:net')
  let captured = '', envelope = ''
  const server = createServer(socket => {
    socket.setEncoding('utf8'); socket.write('220 local-test ESMTP\r\n')
    let buffer = '', dataMode = false
    socket.on('data', chunk => {
      buffer += chunk
      while (buffer.includes('\r\n')) {
        const end = buffer.indexOf('\r\n'), line = buffer.slice(0, end); buffer = buffer.slice(end + 2)
        if (dataMode) { if (line === '.') { dataMode = false; socket.write('250 queued\r\n') } else captured += line + '\r\n'; continue }
        if (/^EHLO|^HELO/.test(line)) socket.write('250 local-test\r\n')
        else if (/^DATA/.test(line)) { dataMode = true; socket.write('354 send data\r\n') }
        else if (/^QUIT/.test(line)) socket.end('221 bye\r\n')
        else { envelope += line + '\n'; socket.write('250 ok\r\n') }
      }
    })
  })
  try {
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
    const address = server.address(); assert.ok(address && typeof address === 'object')
    const config = createContactEmailConfig({ SMTP_HOST: '127.0.0.1', SMTP_PORT: String(address.port), SMTP_SECURE: 'false', SMTP_FROM_ADDRESS: 'website@example.test' })
    assert.equal(config.configured, true)
    await withTestPayload(async payload => {
      const adapter = config.adapter({ payload })
      await adapter.sendEmail({ to: 'hello@jitrapadu.com', from: 'website@example.test', replyTo: 'person@example.test', subject: 'Local capture', text: 'Local only', messageId: '<local-test@example.test>' })
    })
    assert.match(envelope, /RCPT TO:<hello@jitrapadu.com>/)
    assert.match(captured, /Reply-To: person@example.test/)
    assert.match(captured, /Message-ID: <local-test@example.test>/)
  } finally { await new Promise<void>(resolve => server.close(() => resolve())) }
})
