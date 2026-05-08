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
    }),
  })

  // Brevo returns 201 on create, 204 on update (updateEnabled)
  if (res.status === 201 || res.status === 204) {
    return { duplicate: false }
  }

  const data = await res.json().catch(() => ({}))
  console.error(`[waitlist] Brevo ${res.status}:`, JSON.stringify(data))

  // duplicate_parameter means contact exists but updateEnabled handled it
  if (res.status === 400 && data?.code === 'duplicate_parameter') {
    return { duplicate: true }
  }

  throw new Error(`Brevo ${res.status}: ${data?.message ?? 'unknown error'}`)
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