import express from 'express'
import 'dotenv/config'
import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import httpLogger from './utils/logger/http-logger.js'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import logger from './utils/logger/logger.js'
import connectDB from './db/connect.js'
import configs from './utils/configs.js'
import authRouter from './routes/auth.js'

const app = express()

// Security packages
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())

// Middleware
app.use(httpLogger)

// Routes
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome to nikki-api' })
})

app.use('/api/auth', authRouter)
// Middleware
app.use(notFound)
app.use(errorHandler)

// MongoDb connection
if (process.env.NODE_ENV !== 'test') {
  try {
    await connectDB(configs.db.mongodbUri)
    logger.info('Connected to Db')
  } catch (err) {
    logger.error(err)
  }
}

export default app
