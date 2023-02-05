import { Router } from 'express'
import { forgotPassword, getUser, resetPassword } from '../controllers/user.js'
import { authenticate } from '../middleware/index.js'

const userRouter = Router()

userRouter.get('/', authenticate, getUser)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password', resetPassword)

export default userRouter
