import { fileURLToPath } from 'node:url'
import path from 'node:path'
import type { Payload } from 'payload'
import { retryNotifications } from '../../src/cms/contact-notifications'
import { contactTransport } from '../../src/cms/contact-email'
export function retryLimit(args: string[]): number {
  if (args.length > 1 || (args.length === 1 && !/^--limit=[1-9]\d*$/.test(args[0]))) throw new Error('Usage: --limit=1..500')
  const limit = args.length ? Number(args[0].slice(8)) : 100
  if (limit > 500) throw new Error('Usage: --limit=1..500')
  return limit
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let payload: Payload | undefined
  // Stop claiming new work on interruption; an in-flight send is bounded by SMTP timeouts.
  const controller = { stopped: false }
  const stop = () => { controller.stopped = true }
  process.once('SIGTERM', stop); process.once('SIGINT', stop)
  try {
    const limit = retryLimit(process.argv.slice(2))
    const { getPayload } = await import('payload'), { default: config } = await import('../../src/payload.config')
    payload = await getPayload({ config })
    if (!controller.stopped) {
      const report = await retryNotifications(payload, contactTransport(payload, process.env), { limit, shouldStop: () => controller.stopped })
      console.log(JSON.stringify(report))
      if (report.failed || report.notConfigured || controller.stopped) process.exitCode = 1
    }
  } catch { console.error('Notification retry failed; check configuration and private inbox state.'); process.exitCode = 1 }
  finally { if (payload) { const client = payload.db.drizzle.$client; await payload.destroy(); client.close() } }
  process.exit(process.exitCode || 0)
}
