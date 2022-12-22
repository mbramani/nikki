import { createLogger, format, transports } from 'winston'
import 'winston-mongodb'
import configs from '../configs.js'

const { combine, timestamp, json } = format

const productionLogger = () =>
  createLogger({
    level: 'debug',
    format: combine(timestamp(), json()),
    handleExceptions: true,
    transports: [
      new transports.Console(),
      new transports.File({
        level: 'info',
        filename: 'info.log',
      }),
      new transports.MongoDB({
        level: 'error',
        db: configs.dg.mongodbUri,
      }),
    ],
  })

export default productionLogger
