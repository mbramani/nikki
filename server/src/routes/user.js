import { Router } from 'express'
import {
  forgotPassword,
  getUser,
  patchUser,
  resetPassword,
  updatePassword,
} from '../controllers/user.js'
import { authenticate, rateLimiter } from '../middleware/index.js'

const userRouter = Router()

const fifteenMinutes = 15 * 60 * 1000

userRouter.get('/', authenticate, rateLimiter(fifteenMinutes, 120), getUser)
userRouter.patch('/', authenticate, rateLimiter(fifteenMinutes, 10), patchUser)
userRouter.patch(
  '/update-password',
  authenticate,
  rateLimiter(fifteenMinutes, 10),
  updatePassword
)
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
