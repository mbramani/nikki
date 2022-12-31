import { Router } from 'express'
import { register, login, token } from '../controllers/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/token', token)

export default router
