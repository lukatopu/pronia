import nodemailer from 'nodemailer';

const mailSender = async (to, url) => {
 const clientId = process.env.GMAIL_CLIENT_ID;
 const clientSecret = process.env.GMAIL_CLIENT_SECRET;
 const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
 const from = process.env.MAIL_SENDER_EMAIL;
 if (!clientId || !clientSecret || !refreshToken || !from) {
  throw new Error('Password-reset email is not configured. Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN and MAIL_SENDER_EMAIL.');
 }
 const safeUrl = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;');

 const mailOptions = {
  from,
  to: [to],
  subject: "[Pronia] Password Reset",
  text: `Reset your Pronia password: ${url}\nThis link expires in 15 minutes. If you did not request this, ignore this email.`,
  html: `
        <div style="width: 100%; background-color: rgb(250, 250, 250); text-align: center">
            <br>
            <h1 style="font-size:26px;color:#199890">Pronia</h1>
            <br>
            <br>
            <div style="font-size: 16px; margin: 0 auto; width: 50%; color: black; background-color: white; padding: 40px; ">
                <div style="margin-bottom: 20px;">Someone requested to reset the password for the following account:</div>
                <div style="margin-bottom: 20px;">If this was a mistake, just ignore this email and nothing will happen.</div>
                <div style="margin-bottom: 30px;">To reset your password, click the button below.</div>
        
                <a href="${safeUrl}" style="text-align: center; font-size: 15px; text-align: center; background-color: #199890; padding: 10px 24px; text-decoration: none; border-radius: 3px; color:white">Reset Password</a>
                <p>This link expires in 15 minutes.</p>
            </div>
            <br>
            <br>
            <p>© ${new Date().getFullYear()}Pronia</p>
            <p>All rights reserved.</p>
            <br>
            <br>
        </div>
        `
 }




 const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  signal: AbortSignal.timeout(15000),
  body: new URLSearchParams({
   client_id: clientId,
   client_secret: clientSecret,
   refresh_token: refreshToken,
   grant_type: 'refresh_token',
  }).toString(),
 });
 const token = await tokenResponse.json();
 if (!tokenResponse.ok || !token.access_token) {
  throw new Error(`Gmail authorization failed (${tokenResponse.status}). Check the Gmail OAuth credentials and refresh token.`);
 }

 // Nodemailer only builds the MIME message here; delivery uses HTTPS, not SMTP.
 const composer = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'windows' });
 const message = await composer.sendMail(mailOptions);
 const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
  method: 'POST',
  headers: {
   Authorization: `Bearer ${token.access_token}`,
   'Content-Type': 'application/json',
  },
  signal: AbortSignal.timeout(15000),
  body: JSON.stringify({ raw: message.message.toString('base64url') }),
 });
 const result = await response.json();
 if (!response.ok || !result.id) {
  throw new Error(`Gmail rejected the email (${response.status}). Check the sender account, gmail.send permission and Gmail sending limits.`);
 }
 return result;
}

export default mailSender
