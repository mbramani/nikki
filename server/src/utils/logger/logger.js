import { createLogger, format, transports } from 'winston'
import configs from '../configs.js'
import 'winston-mongodb'

const { combine, timestamp, json } = format

let logger = createLogger({
  level: 'debug',
  format: combine(timestamp(), json()),
  handleExceptions: true,
  transports: [new transports.Console()],
})

if (process.env.NODE_ENV === 'production') {
  logger
    .add(
      new transports.File({
        level: 'info',
        filename: 'info.log',
      })
    )
    .add(
      new transports.MongoDB({
        level: 'error',
        db: configs.db.mongodbUri,
        options: { useUnifiedTopology: true },
      })
    )
}

export default logger
