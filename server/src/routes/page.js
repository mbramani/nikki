import { Router } from 'express'
import { authenticate, validateDate } from '../middleware/index.js'
import {
  deletePage,
  getAllPage,
  getPage,
  patchPage,
  postPage,
} from '../controllers/page.js'

const pageRouter = Router()

const middlewareArr = [authenticate, validateDate]

pageRouter.get('/', authenticate, getAllPage)
pageRouter.get('/:year/:month/:day', middlewareArr, getPage)
pageRouter.post('/:year/:month/:day', middlewareArr, postPage)
pageRouter.patch('/:year/:month/:day', middlewareArr, patchPage)
pageRouter.delete('/:year/:month/:day', middlewareArr, deletePage)

export default pageRouter
