const NOTION_VERSION = '2022-06-28'

function richText(value) {
  const text = String(value ?? '')
  const chunks = []
  for (let index = 0; index < text.length; index += 2000) {
    chunks.push({ type: 'text', text: { content: text.slice(index, index + 2000) } })
  }
  return chunks
}

function fail(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}

export async function saveLead(body, env) {
  const fullName = String(body?.fullName || '').trim()
  const workEmail = String(body?.workEmail || '').trim()
  const brandName = String(body?.brandName || '').trim()
  const payload = body?.payload
  if (!fullName || !workEmail || !brandName || !payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw fail(400, 'Full name, work email, and brand name are required.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) throw fail(400, 'Enter a valid work email.')
  const token = env.NOTION_TOKEN
  const databaseId = env.NOTION_LEADS_DATABASE_ID
  if (!token || !databaseId) throw fail(500, 'Lead storage is not configured.')

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        'Full name': { title: richText(fullName) },
        'Work email': { email: workEmail },
        'Brand / company name': { rich_text: richText(brandName) },
        JSON: { rich_text: richText(JSON.stringify(payload)) },
      },
    }),
  })
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}))
    console.error('Notion lead save failed', response.status, detail.message || detail.code || 'unknown')
    throw fail(502, 'Could not save your details. Please try again.')
  }
}
