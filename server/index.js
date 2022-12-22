import app from './src/app.js'
import http from 'http'
import configs from './src/utils/configs.js'
import logger from './src/utils/logger/index.js'

const server = http.createServer(app)

server.listen(configs.port, () => {
  logger.info(`Server running on port ${configs.port}`) // eslint-disable-line no-console
})
