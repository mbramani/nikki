import { StatusCodes } from 'http-status-codes'
import { Token, User } from '../models/index.js'
import { sendResetEmail } from '../utils/functions/index.js'
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
} from '../utils/errors/index.js'

async function getUser(req, res) {
  const { userId } = req.user

  const user = await User.findByUserId(userId).select({
    name: 1,
    email: 1,
    _id: 0,
  })

  res.status(StatusCodes.OK).json(user)
}

async function forgotPassword(req, res) {
  const { email } = req.body
  const userEmail = email ? email.trim() : email

  if (!userEmail || userEmail === '') {
    throw new BadRequestError('please provide a email')
  }

  const user = await User.findByEmail(userEmail)
  if (!user) {
    throw new BadRequestError('email is not found')
  }

  const tokenRecord = await Token.findByUserId(user._id)
  if (!tokenRecord.refresh.isActive) {
    throw new ForbiddenError('user is blocked')
  }

  const resetPasswordToken = await user.generateResetPasswordToken()

  await sendResetEmail({ email: userEmail, resetPasswordToken })

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

  const tokenRecord = await Token.findByResetPasswordToken(userResetToken)
  if (!tokenRecord || !tokenRecord.resetPassword.token) {
    throw new UnauthenticatedError('reset token is a invalid')
  }

  if (new Date(`${tokenRecord.resetPassword.expiresAt}`) < new Date()) {
    throw new UnauthenticatedError('reset token is a expired')
  }

  const user = await User.findByUserId(tokenRecord.userId)

  const isPasswordMatch = await user.isPasswordMatch(userNewPassword)
  if (isPasswordMatch) {
    throw new BadRequestError(
      'new password must be different from current password'
    )
  }

  user.password = userNewPassword
  await user.save()

  tokenRecord.resetPassword = {
    token: null,
    expiresAt: null,
  }
  await tokenRecord.save()

  res.status(StatusCodes.OK).send({ msg: 'password reset successfully' })
}

export { getUser, forgotPassword, resetPassword }
