import jwt from 'jsonwebtoken'
import configs from '../configs.js'
function getUserId(req) {
  const header = req.headers.authorization

  if (typeof header !== 'string') return null

  const token = header.split(' ')[1]

  if (!token) return null

  try {
    const decoded = jwt.verify(token, configs.jwt.secret)
    return decoded.userId
  } catch (err) {
    return null
  }
}

export default getUserId
