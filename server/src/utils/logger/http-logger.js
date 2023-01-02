import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import logger from './logger.js'
import configs from '../configs.js'

const httpLogger = morgan((tokens, req, res) => {
  const authHeader = req.headers.authorization
  const accessToken = authHeader !== undefined ? authHeader.split(' ')[1] : null
  let userId
  let role

  jwt.verify(accessToken, configs.jwt.secret, function (err, decoded) {
    if (err) {
      logger.error(err.message)
    } else {
      userId = decoded.userId
      role = decoded.role
    }
  })

  let msg
  if (process.env.NODE_ENV !== 'production') {
    msg = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      tokens['response-time'](req, res),
      'ms',
      userId,
      role,
    ].join(' ')
  } else {
    msg = [
      tokens['remote-addr'](req, res),
      tokens['remote-user'](req, res),
      userId,
      role,
      tokens.date(req, res, 'clf'),
      tokens.method(req, res),
      tokens.url(req, res),
      `HTTP/${tokens['http-version'](req, res)}`,
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      tokens.referrer(req, res),
      tokens['user-agent'](req, res),
    ].join('-')
  }

  if (process.env.NODE_ENV !== 'test') {
    logger.http(msg)
  }

  return null
})

export default httpLogger
