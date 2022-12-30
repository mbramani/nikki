import { NotFoundError } from '../utils/errors/index.js'

function notFound(req, res, next) {
  const err = new NotFoundError('route does not exist')
  next(err)
}

export default notFound
