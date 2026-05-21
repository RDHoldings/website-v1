import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  normalizeEmail,
  inviteIdFromEmail,
  buildInviteLink,
  resolveInviteSiteBaseUrl,
} from './inviteUtil.js'

describe('inviteUtil', () => {
  it('normalizeEmail lowercases and trims', () => {
    assert.equal(normalizeEmail('  Foo@Bar.COM '), 'foo@bar.com')
  })

  it('inviteIdFromEmail sanitizes', () => {
    assert.equal(inviteIdFromEmail('marc77014@gmail.com'), 'marc77014_gmail_com')
  })

  it('buildInviteLink uses configurable base', () => {
    const url = buildInviteLink('https://rdholdings.github.io/website-v1', 'abc123')
    assert.equal(url, 'https://rdholdings.github.io/website-v1/access?invite=abc123')
  })

  it('resolveInviteSiteBaseUrl prefers SITE_BASE_URL', () => {
    const prev = process.env.SITE_BASE_URL
    process.env.SITE_BASE_URL = 'https://staging.example.com'
    try {
      assert.equal(resolveInviteSiteBaseUrl(), 'https://staging.example.com')
    } finally {
      if (prev === undefined) delete process.env.SITE_BASE_URL
      else process.env.SITE_BASE_URL = prev
    }
  })
})
