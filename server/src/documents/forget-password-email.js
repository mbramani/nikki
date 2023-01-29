import configs from '../utils/configs.js'

export function forgetPasswordEmail(resetPasswordToken) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Password Reset Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        h1 {
          color: #333;
        }
        p {
          margin: 0 0 10px 0;
        }
        a {
          color: #0088cc;
        }
      </style>
    </head>
    <body>
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>You are receiving this email because you requested a password reset for your account. If you did not make this request, you can safely ignore this email.</p>
      <p>To reset your password, click on the following link:</p>
      <p><a href="${configs.url.website}/reset-password?token=${resetPasswordToken}">Reset my password</a></p>
      <p>This link will expire in 15 minutes.</p>
      <p>Thank you,</p>
      <p>The Nikki Team</p>
    </body>
  </html>

  `
}
