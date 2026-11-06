export const BOOKING_URL = 'https://calendar.app.google/U4ZaMKyM1Sb51cgr8'

export const sampleFieldNames = {
  'request-full-name': 'fullName',
  'request-work-email': 'workEmail',
  'request-brand-name': 'brandName',
  'request-dtc-url': 'dtcUrl',
  'request-amazon-url': 'amazonUrl',
  'request-brand-url': 'brandUrl',
  'request-recipient-name': 'recipientName',
  'request-country': 'country',
  'request-street-address': 'streetAddress',
  'request-apartment': 'apartment',
  'request-city': 'city',
  'request-state': 'state',
  'request-postal-code': 'postalCode',
  'request-delivery-phone': 'deliveryPhone',
}

function formEntries(form) {
  const data = new FormData(form)
  const payload = {}
  for (const [key, value] of data.entries()) {
    if (payload[key] === undefined) payload[key] = value
    else if (Array.isArray(payload[key])) payload[key].push(value)
    else payload[key] = [payload[key], value]
  }
  return payload
}

export async function submitLeadAndBook({ form, source }) {
  const fields = formEntries(form)
  const fullName = String(fields.fullName || '').trim()
  const workEmail = String(fields.workEmail || '').trim()
  const brandName = String(fields.brandName || '').trim()
  const payload = {
    source,
    page: window.location.pathname,
    submittedAt: new Date().toISOString(),
    ...fields,
    fullName,
    workEmail,
    brandName,
  }
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, workEmail, brandName, payload }),
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Could not save your details. Please try again.')
  }
  window.location.assign(BOOKING_URL)
}
