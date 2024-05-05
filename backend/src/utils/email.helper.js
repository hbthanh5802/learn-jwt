const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID = process.env.MAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const REDIRECT_URL = process.env.MAIL_REDIRECT_URL;
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail({ email, subject, content }) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'hbthanh5802@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: 'ThanK 😗 <hbthanh5802@gmail.com>',
      to: email,
      subject: subject,
      html: `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
        <title>Browser</title>
      </head>

      <body style="font-family: Arial, sans-serif;">

          <header style="background-color: #3498db; padding: 20px; text-align: center; color: white;">
              <h1>${subject}</h1>
          </header>

          <section style="padding: 20px;">
              <h2>Hello,</h2>
              <p>You have requested a verification code. Please use the following instruction blow to confirm your identity:</p>

              <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold;">
                  ${content}
              </div>

              <p>If you didn't request this code, please ignore this email.</p>

              <p>Best regards,<br><strong>ThanK</strong></p>
          </section>

          <footer style="background-color: #f1f1f1; padding: 10px; text-align: center;">
              <p>© 2024 ThanK. All rights reserved.</p>
          </footer>

      </body>

      </html>
      `,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log('Error to send email', error);
    throw error;
  }
}

module.exports = { sendEmail };
