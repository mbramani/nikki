import { Router } from 'express'
import { register, login, token } from '../controllers/auth.js'
import { rateLimiter } from '../middleware/index.js'
const authRouter = Router()

const fifteenMinutes = 15 * 60 * 1000
authRouter.use(rateLimiter(fifteenMinutes, 60))

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/token', token)

export default authRouter
