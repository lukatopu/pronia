# Password-reset email on Render

The backend now calls Resend over HTTPS using Node's built-in fetch (Node 18+).
No new dependency or frontend build is needed. Gmail SMTP settings are no longer
used by the password-reset sender.

## First test: your own inbox

1. Sign up at https://resend.com using the inbox where you want to receive the test.
2. Open API Keys, create a key named Pronia with sending permission, and copy it.
3. In Render, open your Pronia web service, then Environment. Add these variables:

   RESEND_API_KEY = your Resend API key
   MAIL_FROM = Pronia <onboarding@resend.dev>
   APP_URL = https://pronia.onrender.com

   Enter the values without surrounding quotation marks. Keep the existing
   CONNECTION_STRING, JWT_SECRET_KEY and BCRYPT_PEPPER.
4. Commit and push only backend/utils/mailSender.js and
   backend/controllers/usersController.js to the branch connected to Render.
   You can optionally commit this guide too. The mongodb-restore folder is unrelated.
5. Save the Render settings and deploy the commit containing these changes.
   If auto-deploy is disabled, choose Manual Deploy > Deploy latest commit.
6. Register on Pronia with the SAME recipient address used to sign up for Resend,
   if that website account does not already exist.
7. Log out and request a reset from /forgot-password with that registered address.
8. Check Resend's Emails/Logs dashboard for the accepted message, then your inbox
   and spam folder. Acceptance by Resend does not guarantee inbox delivery.
9. Open the reset link within 15 minutes, change the password and test login.

The onboarding sender can ONLY send to your own Resend account email address.
Other recipients will be rejected until you verify your own sender domain.
Do not replace MAIL_FROM with a Gmail address.

## Send resets to all website users

1. In Resend, open Domains > Add Domain and enter a domain or sending subdomain
   you own, for example mail.yourdomain.com.
2. At your domain's DNS provider, add the exact verification records Resend shows.
3. Wait until Resend reports the sending domain as verified.
4. Change Render's MAIL_FROM to an address on that verified domain, for example:

   Pronia <noreply@mail.yourdomain.com>

5. If the API key is restricted to a domain, ensure it permits this sending domain.
6. Save/redeploy and request a reset for another registered website user.

You cannot verify gmail.com or onrender.com because you do not control their DNS.
Without your own domain, the onboarding sender is suitable for the own-inbox test only.

## Local use

Add RESEND_API_KEY, MAIL_FROM and APP_URL to backend/.env and restart the backend.
Use APP_URL=http://localhost:3000 to have local reset links open the local website.
The same Resend sender restrictions apply locally.

## Troubleshooting

- Missing settings: add RESEND_API_KEY and MAIL_FROM to the running environment.
- Invalid API key: copy the complete active Resend key into Render.
- 403 / testing-recipient restriction: use your Resend account email for the test,
  or verify your own sender domain for other recipients.
- Unverified domain: finish DNS verification and match MAIL_FROM to that domain.
- Email is not signed up: register that exact email on Pronia first.
- Reset link opens the wrong site: correct APP_URL and request a new link.
- Provider rejection or a timeout now returns an error instead of false success.

References:
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://resend.com/docs/dashboard/domains/introduction
