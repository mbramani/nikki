import path from 'path'
import { createLogger, format, transports } from 'winston'
import { formatDate } from '../functions/index.js'

const { combine, timestamp, colorize, json, printf } = format
const { Console, File } = transports

const devConsol = new Console({
  format: combine(
    colorize(),
    timestamp({ format: 'HH:mm:ss' }),
    printf((info) => `${info.level}: ${info.message} - ${info.timestamp}`)
  ),
})

const logger = createLogger({
  level: 'debug',
  format: combine(timestamp(), json()),
  handleExceptions: true,
  exitOnError: false,
  transports: [devConsol],
})

if (process.env.NODE_ENV === 'production') {
  logger
    .remove(devConsol)
    .add(new Console({ level: 'info' }))
    .add(
      new File({
        level: 'http',
        filename: path.resolve(process.cwd(), 'logs', `${formatDate()}.log`),
      })
    )
    .add(
      new File({
        level: 'error',
        filename: path.resolve(process.cwd(), 'logs', `${formatDate()}-errors.log`),
      })
    )
    .exceptions.handle(
      new transports.File({
        filename: path.resolve(process.cwd(), 'logs', `${formatDate()}-exceptions.log`),
      })
    )
}

export default logger
