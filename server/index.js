import app from './src/app.js'
import { createServer } from 'http'
import configs from './src/utils/configs.js'
import logger from './src/utils/logger/logger.js'

const server = createServer(app)

server.listen(configs.port, () => {
  logger.info(`Server running on port ${configs.port}`)
})
