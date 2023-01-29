import { forgetPasswordEmail } from '../../documents/forget-password-email.js'
import transporter from '../nodemailer/transporter.js'

async function sendResetEmail({ email, resetPasswordToken }) {
  await transporter.sendMail({
    from: '"Nikki" <nikki.journal@outlook.com>',
    to: email,
    subject: 'Password Reset Request',
    html: forgetPasswordEmail(resetPasswordToken),
  })
}

export default sendResetEmail
