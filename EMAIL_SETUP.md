# Gmail API password-reset emails on Render

The backend sends from MAIL_SENDER_EMAIL using Gmail API over HTTPS.
Nodemailer composes the message locally; it does not connect to an SMTP server.
Node 18+ is required for built-in fetch. No new packages are needed.

## Render settings

Set these under your Pronia web service > Environment:

- GMAIL_CLIENT_ID: your Google OAuth web client ID
- GMAIL_CLIENT_SECRET: that client's secret
- GMAIL_REFRESH_TOKEN: the refresh token obtained after publishing your Google app
- MAIL_SENDER_EMAIL: proniawebsite@gmail.com
- APP_URL: https://pronia.onrender.com

The refresh token must authorize the same Gmail account as MAIL_SENDER_EMAIL,
with https://www.googleapis.com/auth/gmail.send permission.
Keep CONNECTION_STRING, JWT_SECRET_KEY and BCRYPT_PEPPER unchanged.
RESEND_API_KEY, MAIL_FROM and MAIL_SENDER_PASS are no longer used by this sender.

## Deploy

1. Commit and push backend/utils/mailSender.js and this guide to the Git branch
   connected to Render. Include backend/controllers/usersController.js if the
   earlier change to await mailSender(email, url) is not deployed yet.
2. Save the Render environment settings and deploy the new commit. If auto-deploy
   is disabled, choose Manual Deploy > Deploy latest commit.
3. Open /forgot-password on the deployed website and enter an email that is
   registered in Pronia. Test with a separate recipient inbox.
4. Check that inbox and spam folder. The sender's Gmail Sent folder can also help
   confirm Gmail accepted the message. Acceptance does not guarantee inbox delivery.
5. Open the reset link within 15 minutes, set a new password, then log in with it.
   No Google authorization is needed by the recipient.

## Google authorization

Enable Gmail API in your Google Cloud project. Configure an External OAuth app
with the gmail.send scope. Create a Web application OAuth client and use your own
client credentials in OAuth Playground with offline access to authorize the sender.

Testing-mode Gmail refresh tokens expire after seven days. For ongoing use,
complete Google's publishing requirements and authorize again after moving the app
to In production. Publishing and Google verification are separate; follow any
verification requirements Google presents. Remove the Playground redirect URI
from the client when you have finished obtaining credentials for deployment.

Refresh tokens can still be revoked, expire after prolonged disuse, or become
invalid after account/password changes. Reauthorize the sender if needed.
Gmail usage and anti-abuse limits apply.

## Local setup

Put the same Gmail variables in backend/.env and restart the backend.
Set APP_URL=http://localhost:3000 if local resets should open the local site.
Never commit the .env file.

## Troubleshooting

- Not configured: add all four Gmail sender variables to the running environment.
- Gmail authorization failed: check client ID, secret and refresh token; confirm the
  token came from your own OAuth client and authorize again if it expired/revoked.
- Gmail rejected email: verify Gmail API is enabled, gmail.send was granted, the
  authenticated sender matches MAIL_SENDER_EMAIL and account limits are not exceeded.
- Email is not signed up: register that exact email on Pronia first.
- Wrong reset destination: correct APP_URL and request a new reset.
- A failed network/provider request now returns an error instead of false success.

## Verification

Run the isolated sender checks (no external emails or database access):

    cd backend
    node --test tests/mailSender.test.js

References:
- https://developers.google.com/workspace/gmail/api/guides/sending
- https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send
- https://developers.google.com/identity/protocols/oauth2
