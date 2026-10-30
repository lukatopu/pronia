import test from 'node:test';
import assert from 'node:assert/strict';
import mailSender from '../utils/mailSender.js';

test('Gmail HTTPS sender refreshes credentials, composes MIME and propagates failures', async (t) => {
  const originalFetch = globalThis.fetch;
  const keys = ['GMAIL_CLIENT_ID', 'GMAIL_CLIENT_SECRET', 'GMAIL_REFRESH_TOKEN', 'MAIL_SENDER_EMAIL'];
  const originalEnv = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  t.after(() => {
    globalThis.fetch = originalFetch;
    for (const key of keys) {
      if (originalEnv[key] === undefined) delete process.env[key];
      else process.env[key] = originalEnv[key];
    }
  });
  Object.assign(process.env, {
    GMAIL_CLIENT_ID: 'test-client', GMAIL_CLIENT_SECRET: 'test-secret',
    GMAIL_REFRESH_TOKEN: 'test-refresh', MAIL_SENDER_EMAIL: 'sender@example.com',
  });
  const requests = [];
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, json: async () => url.includes('oauth2')
      ? { access_token: 'fresh-token' } : { id: 'message-id' } };
  };
  const resetUrl = 'https://pronia.onrender.com/reset-password/test-token';
  assert.equal((await mailSender('visitor@example.com', resetUrl)).id, 'message-id');
  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, 'https://oauth2.googleapis.com/token');
  const params = new URLSearchParams(requests[0].options.body);
  assert.equal(params.get('grant_type'), 'refresh_token');
  assert.equal(params.get('refresh_token'), 'test-refresh');
  assert.equal(requests[1].url, 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send');
  assert.equal(requests[1].options.headers.Authorization, 'Bearer fresh-token');
  const raw = JSON.parse(requests[1].options.body).raw;
  assert.match(raw, /^[A-Za-z0-9_-]+$/);
  const mime = Buffer.from(raw, 'base64url').toString();
  assert.match(mime, /From: sender@example.com/);
  assert.match(mime, /To: visitor@example.com/);
  assert.match(mime, /Subject: \[Pronia\] Password Reset/);
  assert.ok(mime.includes(resetUrl));

  await t.test('refresh failure does not attempt delivery', async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      return { ok: false, status: 400, json: async () => ({ error: 'invalid_grant' }) };
    };
    await assert.rejects(() => mailSender('visitor@example.com', resetUrl), /authorization failed/);
    assert.equal(calls, 1);
  });
  await t.test('delivery rejection does not report success', async () => {
    globalThis.fetch = async url => url.includes('oauth2')
      ? { ok: true, json: async () => ({ access_token: 'fresh-token' }) }
      : { ok: false, status: 403, json: async () => ({ error: {} }) };
    await assert.rejects(() => mailSender('visitor@example.com', resetUrl), /Gmail rejected/);
  });
  await t.test('network failure and missing configuration reject', async () => {
    globalThis.fetch = async () => { throw new Error('network unavailable'); };
    await assert.rejects(() => mailSender('visitor@example.com', resetUrl), /network unavailable/);
    delete process.env.GMAIL_REFRESH_TOKEN;
    await assert.rejects(() => mailSender('visitor@example.com', resetUrl), /not configured/);
  });
});
