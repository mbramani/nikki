import morgan from 'morgan'
import logger from './logger.js'
import { getUserId } from '../functions/index.js'

const httpLogger = morgan((tokens, req, res) => {
  const userId = getUserId(req)
  let msg

  const prodMsgArr = [
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    `HTTP/${tokens['http-version'](req, res)}`,
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    tokens.referrer(req, res),
    tokens['user-agent'](req, res),
  ]

  const devMsgArr = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    tokens['response-time'](req, res),
    'ms',
  ]

  const authHeader = req.headers.authorization

  if (typeof authHeader !== 'string') {
    if (process.env.NODE_ENV === 'production') {
      msg = prodMsgArr.join('#!#')
    }
    if (process.env.NODE_ENV === 'development') {
      msg = devMsgArr.join(' ')
    }
  }

  if (typeof authHeader === 'string') {
    if (process.env.NODE_ENV === 'production') {
      msg = [userId, ...prodMsgArr].join('#!#')
    }
    if (process.env.NODE_ENV === 'development') {
      msg = [...devMsgArr, userId].join(' ')
    }
  }

  if (process.env.NODE_ENV !== 'test') {
    logger.http(msg)
  }
  return null
})

export default httpLogger
