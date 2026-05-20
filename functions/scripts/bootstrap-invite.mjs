#!/usr/bin/env node
import process from 'node:process'

function parseArgs(argv) {
  const out = {
    projectId: process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || '',
    email: process.env.BOOTSTRAP_ADMIN_EMAIL || 'marc77014@gmail.com',
    region: process.env.VITE_FIREBASE_FUNCTIONS_REGION || 'us-central1',
    automationKey: process.env.BOOTSTRAP_AUTOMATION_KEY || '',
  }
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--project' && argv[i + 1]) out.projectId = String(argv[++i]).trim()
    else if (arg === '--email' && argv[i + 1]) out.email = String(argv[++i]).trim()
    else if (arg === '--region' && argv[i + 1]) out.region = String(argv[++i]).trim()
    else if (arg === '--automation-key' && argv[i + 1]) out.automationKey = String(argv[++i]).trim()
  }
  return out
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

async function main() {
  const { projectId, email, region, automationKey } = parseArgs(process.argv)
  const normalized = normalizeEmail(email)
  if (!projectId) {
    throw new Error('A valid --project is required.')
  }
  if (!normalized || !normalized.includes('@')) {
    throw new Error('A valid --email is required.')
  }
  if (!automationKey) {
    throw new Error('A valid BOOTSTRAP_AUTOMATION_KEY is required.')
  }

  const endpoint = `https://${region}-${projectId}.cloudfunctions.net/seedInitialInvite`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        email: normalized,
        sendEmail: true,
        automationKey,
      },
    }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || payload?.error) {
    throw new Error(`Callable failed (${response.status}): ${JSON.stringify(payload)}`)
  }
  const result = payload?.result || {}
  console.log(`bootstrap-invite: ${result.message || 'sent invite automation attempted'}`)
}

main().catch((error) => {
  console.error('bootstrap-invite failed:', error)
  process.exit(1)
})
