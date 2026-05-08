import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

interface WaitlistEntry {
  email: string
  createdAt: string
}

// Add your Brevo list ID here (find it in Brevo → Contacts → Lists)
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID ?? 0)

async function addToBrevo(email: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.warn('[waitlist] BREVO_API_KEY not set — skipping Brevo sync.')
    return
  }

  if (!BREVO_LIST_ID) {
    console.warn('[waitlist] BREVO_LIST_ID not set — skipping Brevo sync.')
    return
  }

  // Try to create the contact (Brevo returns 204 on success, 400 if duplicate)
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify({
      email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true, // adds to the list even if the contact already exists
      attributes: {
        SOURCE: 'mixdroid-waitlist',
      },
    }),
  })

  if (!res.ok && res.status !== 204) {
    const body = await res.text().catch(() => '(no body)')
    // Log but don't throw — local JSON save should still succeed
    console.error(`[waitlist] Brevo API error ${res.status}: ${body}`)
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event)
  const email = body.email?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please provide a valid email address.',
    })
  }

  // ── Local JSON persistence ──────────────────────────────────────────────
  const directory = resolve(process.cwd(), 'server/data')
  const filePath = resolve(directory, 'waitlist.json')

  await mkdir(directory, { recursive: true })

  let entries: WaitlistEntry[] = []

  try {
    const existing = await readFile(filePath, 'utf8')
    entries = JSON.parse(existing) as WaitlistEntry[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }

  const isDuplicate = entries.some((entry) => entry.email === email)

  if (!isDuplicate) {
    entries.push({ email, createdAt: new Date().toISOString() })
    await writeFile(filePath, JSON.stringify(entries, null, 2) + '\n', 'utf8')
  }

  // ── Brevo sync (non-blocking — failure won't break the response) ────────
  // updateEnabled: true means Brevo handles duplicates gracefully too
  await addToBrevo(email).catch((err) => {
    console.error('[waitlist] Unexpected Brevo error:', err)
  })

  return {
    ok: true,
    duplicate: isDuplicate,
  }
})