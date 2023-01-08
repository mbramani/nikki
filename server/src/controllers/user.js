/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { RefreshToken, User } from '../models/index.js'
import configs from '../utils/configs.js'
import {
  BadRequestError,
  CustomAPIError,
  ForbiddenError,
} from '../utils/errors/index.js'
import { sendResetEmail } from '../utils/functions/index.js'

async function forgotPassword(req, res) {
  const { email } = req.body
  const userEmail = email ? email.trim() : email

  if (!userEmail || userEmail === '') {
    throw new BadRequestError('please provide a email')
  }

  const user = await User.findOne({ email: userEmail })
  if (!user) {
    throw new BadRequestError('email is not found')
  }

  const refreshTokenRecord = await RefreshToken.findOne({ userId: user._id })
  if (!refreshTokenRecord.isActive) {
    throw new ForbiddenError('user is blocked')
  }

  const resetToken = user.generateJwtToken(configs.jwt.secret + user.password)

  await sendResetEmail({ email: userEmail, resetToken })

  res
    .status(StatusCodes.OK)
    .send({ msg: 'password reset email sent successfully' })
}

export { forgotPassword }
