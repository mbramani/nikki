import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import 'dotenv/config'
const app = express()

// Security packages
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())

app.get('/', (req, res) => {
  res.send({ msg: 'Welcome to nikki-api' })
})
export default app
