import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../utils/errors/index.js'
import configs from '../utils/configs.js'

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('authentication invalid')
  }

  const accessToken = authHeader.split(' ')[1]

  jwt.verify(accessToken, configs.jwt.secret, function (err, decoded) {
    if (err) {
      next(err)
    } else {
      req.user = { userId: decoded.userId, role: decoded.role }
    }
  })

  next()
}

export default authenticate
