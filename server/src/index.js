import app from './app.js'
import http from 'http'
import configs from './utils/configs.js'
import logger from './utils/logger/logger.js'

const server = http.createServer(app)

server.listen(configs.port, () => {
  logger.info(`Server running on port ${configs.port}`)
})
