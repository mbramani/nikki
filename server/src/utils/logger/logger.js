import { createLogger, format, transports } from 'winston'
import configs from '../configs.js'
import 'winston-mongodb'

const { combine, timestamp, colorize, json, simple } = format
const { Console, File, MongoDB } = transports

const devConsol = new Console({
  level: 'debug',
  format: combine(timestamp({ format: 'HH:mm:ss:ms' }), colorize(), simple()),
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
        level: 'info',
        filename: './logs/info.log',
      })
    )
    .add(
      new File({
        level: 'http',
        filename: './logs/combine.log',
      })
    )
    .add(
      new File({
        level: 'error',
        filename: './logs/error.log',
      })
    )
    .add(
      new MongoDB({
        level: 'error',
        db: configs.db.mongodbUri,
        options: { useUnifiedTopology: true },
      })
    )
    .exceptions.handle(
      new transports.File({ filename: './logs/exceptions.log' })
    )
}

export default logger
