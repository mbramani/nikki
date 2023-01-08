import { Router } from 'express'
import { forgotPassword } from '../controllers/user.js'

const user = Router()

user.post('/forgot-password', forgotPassword)

export default user
