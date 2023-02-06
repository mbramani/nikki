import { Router } from 'express'
import { forgotPassword, getUser, resetPassword } from '../controllers/user.js'
import { authenticate, rateLimiter } from '../middleware/index.js'

const userRouter = Router()

const fifteenMinutes = 15 * 60 * 1000

userRouter.get('/', authenticate, rateLimiter(fifteenMinutes, 120), getUser)
userRouter.post(
  '/forgot-password',
  rateLimiter(fifteenMinutes, 2),
  forgotPassword
)
userRouter.post(
  '/reset-password',
  rateLimiter(fifteenMinutes, 10),
  resetPassword
)

export default userRouter
