import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import 'dotenv/config'
import httpLogger from './utils/logger/httpLogger.js'

const app = express()

// Security packages
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())

app.use(httpLogger)
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome to nikki-api' })
})
export default app
