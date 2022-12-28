import { StatusCodes } from 'http-status-codes'
import { User } from '../models/index.js'

async function register(req, res) {
  const { name, email, password } = req.body
  const registerInfo = { name, email, password }

  const user = await User.create(registerInfo)
  const accessToken = await user.generateAccessToken()
  const refreshToken = await user.generateRefreshToken()

  res.status(StatusCodes.CREATED).json({ accessToken, refreshToken })
}

export { register }
