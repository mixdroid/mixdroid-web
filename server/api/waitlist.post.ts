interface WaitlistEntry {
  email: string
  createdAt: string
}

async function addToBrevo(email: string): Promise<{ duplicate: boolean }> {
  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_LIST_ID ?? 0)

  if (!apiKey || !listId) {
    console.warn('[waitlist] BREVO_API_KEY or BREVO_LIST_ID not set.')
    return { duplicate: false }
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
      attributes: {
        SOURCE: 'mixdroid-waitlist',
      },
    }),
  })

  // 204 = created, 400 with code "duplicate_parameter" = already exists
  if (res.status === 204 || res.status === 201) {
    return { duplicate: false }
  }

  if (res.status === 400) {
    const data = await res.json().catch(() => ({}))
    if (data?.code === 'duplicate_parameter') {
      return { duplicate: true }
    }
    console.error('[waitlist] Brevo 400:', JSON.stringify(data))
    throw new Error(`Brevo error: ${data?.message ?? 'Bad request'}`)
  }

  const body = await res.text().catch(() => '(no body)')
  console.error(`[waitlist] Brevo unexpected ${res.status}: ${body}`)
  throw new Error(`Brevo error ${res.status}`)
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

  try {
    const { duplicate } = await addToBrevo(email)
    return { ok: true, duplicate }
  } catch (err) {
    console.error('[waitlist] Failed to save contact:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not save your email. Please try again.',
    })
  }
})