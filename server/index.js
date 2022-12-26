import app from './src/app.js'
import { createServer } from 'http'
import configs from './src/utils/configs.js'
import logger from './src/utils/logger/logger.js'
import connectDB from './src/db/connect.js'

const server = createServer(app)

try {
  server.listen(configs.port, () => {
    logger.info(`Server running on port ${configs.port}`)
  })

  await connectDB(configs.db.mongodbUri)
  logger.info('Connected to Db')
} catch (err) {
  logger.error(err)
}
