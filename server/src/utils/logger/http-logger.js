import logger from './logger.js'
import morgan from 'morgan'

const httpLogger = morgan((tokens, req, res) => {
  const msg =
    process.env.NODE_ENV !== 'production'
      ? [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
        ].join(' ')
      : [
          tokens['remote-addr'](req, res),
          tokens['remote-user'](req, res),
          tokens.date(req, res, 'clf'),
          tokens.method(req, res),
          tokens.url(req, res),
          `HTTP/${tokens['http-version'](req, res)}`,
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          tokens.referrer(req, res),
          tokens['user-agent'](req, res),
        ].join('-')

  if (process.env.NODE_ENV !== 'test') {
    logger.http(msg)
  }

  return null
})

export default httpLogger
