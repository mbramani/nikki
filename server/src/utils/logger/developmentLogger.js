import { createLogger, format, transports } from 'winston'
const { combine, timestamp, json } = format

const developmentLogger = () =>
  createLogger({
    level: 'debug',
    format: combine(timestamp(), json()),
    handleExceptions: true,
    transports: [new transports.Console()],
  })

export default developmentLogger
