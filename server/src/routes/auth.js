import { Router } from 'express'
import { register, login, token } from '../controllers/auth.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/token', token)

export default authRouter
