import nodemailer from 'nodemailer'

let mailConfig

if (process.env.NODE_ENV === 'production') {
  mailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  }
} else {
  mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.TEST_SMTP_USER,
      pass: process.env.TEST_SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }
}

const transporter = nodemailer.createTransport(mailConfig)

export default transporter
