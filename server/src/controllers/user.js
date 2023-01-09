import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { RefreshToken, User } from '../models/index.js'
import configs from '../utils/configs.js'
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
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

  const resetToken = user.generateJwtToken(configs.jwt.secret)

  await sendResetEmail({ email: userEmail, resetToken })

  res
    .status(StatusCodes.OK)
    .send({ msg: 'password reset email sent successfully' })
}

async function resetPassword(req, res) {
  const { resetToken, newPassword } = req.body

  const userNewPassword = newPassword ? newPassword.trim() : newPassword
  const userResetToken = resetToken ? resetToken.trim() : resetToken

  if (!userNewPassword || userNewPassword === '') {
    throw new BadRequestError('please provide a new password')
  }

  if (!userResetToken || userResetToken === '') {
    throw new BadRequestError('please provide a reset token')
  }

  let payload

  const jwtCBFn = (err, decode) => {
    if (!err) {
      payload = decode
      return
    }

    if (err.name === 'TokenExpiredError') {
      throw new UnauthenticatedError('reset token is a expired')
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'SyntaxError') {
      throw new UnauthenticatedError('reset token is a invalid')
    }
  }

  jwt.verify(userResetToken, configs.jwt.secret, jwtCBFn)

  const user = await User.findOne({ _id: payload.userId })

  const isPasswordMatch = await user.isPasswordMatch(userNewPassword)
  if (isPasswordMatch) {
    throw new BadRequestError(
      'new password must be different from current password'
    )
  }

  user.password = userNewPassword
  await user.save()

  res.status(StatusCodes.OK).send({ msg: 'password reset successfully' })
}

export { forgotPassword, resetPassword }
