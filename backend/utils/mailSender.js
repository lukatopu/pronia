const mailSender = async (to, url) => {
 const apiKey = process.env.RESEND_API_KEY;
 const from = process.env.MAIL_FROM;
 if (!apiKey || !from) {
  throw new Error('Password-reset email is not configured. Set RESEND_API_KEY and MAIL_FROM.');
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




 const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
   Authorization: `Bearer ${apiKey}`,
   'Content-Type': 'application/json',
  },
  signal: AbortSignal.timeout(15000),
  body: JSON.stringify(mailOptions),
 });
 const result = await response.json();
 if (!response.ok || !result.id) {
  throw new Error(`Email service rejected the request: ${result.message || response.status}`);
 }
 return result;
}

export default mailSender
