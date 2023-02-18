import { StatusCodes } from 'http-status-codes'
import { Token, User } from '../models/index.js'
import { sendResetEmail } from '../utils/functions/index.js'
import { BadRequestError, ForbiddenError, UnauthenticatedError } from '../utils/errors/index.js'

async function getUser(req, res) {
  const { userId } = req.user

  const user = await User.findByUserId(userId).select({
    name: 1,
    email: 1,
    _id: 0,
  })

  res.status(StatusCodes.OK).json(user)
}

async function patchUser(req, res) {
  const { userId } = req.user
  const { name, email } = req.body

  if (!name && !email) {
    throw new BadRequestError('please provide a name or email')
  }

  const user = await User.findByUserId(userId)
  if (email === user.email) {
    throw new BadRequestError('new email must be different from current email')
  }

  if (name) {
    user.name = name
  }

  if (email) {
    user.email = email
  }

  await user.save()

  res.status(StatusCodes.OK).json({
    name: user.name,
    email: user.email,
  })
}

async function updatePassword(req, res) {
  const { newPassword } = req.body
  const { userId } = req.user

  const userNewPassword = newPassword?.trim()

  if (!userNewPassword || userNewPassword === '') {
    throw new BadRequestError('please provide a new password')
  }

  const user = await User.findByUserId(userId)

  const isPasswordMatch = await user.isPasswordMatch(userNewPassword)
  if (isPasswordMatch) {
    throw new BadRequestError('new password must be different from current password')
  }

  user.password = userNewPassword
  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'password update successfully' })
}

async function forgotPassword(req, res) {
  const { email } = req.body
  const userEmail = email?.trim()

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

  res.status(StatusCodes.OK).send({ msg: 'password reset email sent successfully' })
}

async function resetPassword(req, res) {
  const { resetToken, newPassword } = req.body

  const userNewPassword = newPassword?.trim()
  const userResetToken = resetToken?.trim()

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
    throw new BadRequestError('new password must be different from current password')
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

export { getUser, patchUser, updatePassword, forgotPassword, resetPassword }
