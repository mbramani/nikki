import { StatusCodes } from 'http-status-codes'
import { Token, User } from '../models/index.js'
import { BadRequestError, ForbiddenError, UnauthenticatedError } from '../utils/errors/index.js'

async function register(req, res) {
  const { name, email, password } = req.body

  const registerInfo = {
    name,
    email,
    password,
  }

  const user = await User.create(registerInfo)
  const accessToken = user.generateJwtToken()
  const refreshToken = await user.generateRefreshToken()

  res.status(StatusCodes.CREATED).json({
    name: user.name,
    email: user.email,
    accessToken,
    refreshToken,
  })
}

async function login(req, res) {
  const { email, password } = req.body

  // Removing white spaces and if field is undefine it set to default value
  const loginInfo = {
    email: email ? email.trim() : email,
    password: password ? password.trim() : password,
  }

  if (!loginInfo.email || loginInfo.email === '') {
    throw new BadRequestError('please provide a email')
  }

  if (!loginInfo.password || loginInfo.password === '') {
    throw new BadRequestError('please provide a password')
  }

  const user = await User.findByEmail(loginInfo.email)
  if (!user) {
    throw new UnauthenticatedError('invalid credentials')
  }

  if (!(await user.isPasswordMatch(loginInfo.password))) {
    throw new UnauthenticatedError('invalid credentials')
  }

  const tokenRecord = await Token.findByUserId(user._id)
  if (!tokenRecord || !tokenRecord.refresh.isActive) {
    throw new ForbiddenError('user is blocked')
  }

  const accessToken = user.generateJwtToken()
  const refreshToken = await user.updateRefreshToken()

  res.status(StatusCodes.OK).json({
    name: user.name,
    email: user.email,
    accessToken,
    refreshToken,
  })
}

async function token(req, res) {
  const { refreshToken } = req.body
  if (!refreshToken) {
    throw new BadRequestError('please provide a refreshToken')
  }

  const tokenRecord = await Token.findByRefreshToken(refreshToken)

  if (!tokenRecord) {
    throw new UnauthenticatedError('refresh token is a invalid')
  }
  if (!tokenRecord.refresh.isActive) {
    throw new ForbiddenError('user is blocked')
  }
  if (new Date(`${tokenRecord.refresh.expiresAt}`).getTime() < Date.now()) {
    throw new UnauthenticatedError('refresh token is a expired')
  }

  const user = await User.findByUserId(tokenRecord.userId)
  const accessToken = user.generateJwtToken()

  res.status(StatusCodes.OK).json({ accessToken })
}

export { register, login, token }
