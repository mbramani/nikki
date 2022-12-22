import productionLogger from './productionLogger.js'
import developmentLogger from './developmentLogger.js'

let logger = null

if (process.env.NODE_ENV === 'development') {
  logger = developmentLogger()
}

if (process.env.NODE_ENV === 'production') {
  logger = productionLogger()
}

export default logger
