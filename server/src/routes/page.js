import { Router } from 'express'
import { encrypt, validateDate } from '../middleware/index.js'
import {
  deletePage,
  getAllPage,
  getPage,
  patchPage,
  postPage,
} from '../controllers/page.js'
import { rateLimiter } from '../middleware/index.js'

const pageRouter = Router()

const fifteenMinutes = 15 * 60 * 1000
pageRouter.use(rateLimiter(fifteenMinutes, 250))

pageRouter.get('/', getAllPage)
pageRouter.get('/:year/:month/:day', validateDate, getPage)
pageRouter.post('/:year/:month/:day', encrypt, validateDate, postPage)
pageRouter.patch('/:year/:month/:day', encrypt, validateDate, patchPage)
pageRouter.delete('/:year/:month/:day', validateDate, deletePage)

export default pageRouter
