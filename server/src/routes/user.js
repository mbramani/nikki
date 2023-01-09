import { Router } from 'express'
import { forgotPassword, resetPassword } from '../controllers/user.js'

const userRouter = Router()

userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password', resetPassword)

export default userRouter
