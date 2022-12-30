import { StatusCodes } from 'http-status-codes'
import { RefreshToken, User } from '../models/index.js'
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
} from '../utils/errors/index.js'

async function register(req, res) {
  const { name, email, password } = req.body

  // Removing white spaces and if field is undefine it set to default value
  const registerInfo = {
    name: name ? name.trim() : name,
    email: email ? email.trim() : email,
    password: password ? password.trim() : password,
  }

  const user = await User.create(registerInfo)
  const accessToken = await user.generateAccessToken()
  const refreshToken = await user.generateRefreshToken()

  res.status(StatusCodes.CREATED).json({ accessToken, refreshToken })
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

  const user = await User.findOne({ email: loginInfo.email })
  if (!user) {
    throw new UnauthenticatedError('invalid credentials')
  }

  const isPasswordMatch = await user.isPasswordMatch(loginInfo.password)
  if (!isPasswordMatch) {
    throw new UnauthenticatedError('invalid credentials')
  }

  // eslint-disable-next-line no-underscore-dangle
  const previousRefreshToken = await RefreshToken.findOne({ userId: user._id })
  if (!previousRefreshToken.isActive) {
    throw new ForbiddenError('user is blocked')
  }

  const accessToken = await user.generateAccessToken()
  const refreshToken = await user.updateRefreshToken()

  res.status(StatusCodes.OK).json({ accessToken, refreshToken })
}
export { register, login }
