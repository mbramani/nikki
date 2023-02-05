import { Router } from 'express'
import { encrypt, validateDate } from '../middleware/index.js'
import {
  deletePage,
  getAllPage,
  getPage,
  patchPage,
  postPage,
} from '../controllers/page.js'

const pageRouter = Router()

pageRouter.get('/', getAllPage)
pageRouter.get('/:year/:month/:day', validateDate, getPage)
pageRouter.post('/:year/:month/:day', encrypt, validateDate, postPage)
pageRouter.patch('/:year/:month/:day', encrypt, validateDate, patchPage)
pageRouter.delete('/:year/:month/:day', validateDate, deletePage)

export default pageRouter
