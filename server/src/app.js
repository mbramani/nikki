import express from 'express'
import 'dotenv/config'
import 'express-async-errors'

// Security packages
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import bodyParser from 'body-parser'
import mongoSanitize from 'express-mongo-sanitize'

// Middleware
import httpLogger from './utils/logger/http-logger.js'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import logger from './utils/logger/logger.js'
import { authenticate } from './middleware/index.js'

// Database
import connectDB from './db/connect.js'

// Configs
import configs from './utils/configs.js'

// Routers
import { authRouter, userRouter, pageRouter } from './routes/index.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

// Security Middleware
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
// Middleware
app.use(httpLogger)

// Routes
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome to nikki-api' })
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/page', authenticate, pageRouter)

// Middleware
app.use(notFound)
app.use(errorHandler)

// MongoDb connection
if (process.env.NODE_ENV !== 'test') {
  try {
    await connectDB(configs.db.mongodbUri)
    logger.info('Connected to Db')
  } catch (err) {
    logger.error(err.message)
  }
}

export default app
