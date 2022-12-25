import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import httpLogger from './utils/logger/http-logger.js'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import 'express-async-errors'

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

// Middleware
app.use(notFound)
app.use(errorHandler)

export default app
