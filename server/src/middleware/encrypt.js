import BadRequestError from '../utils/errors/bad-request.js'
import { encryptData } from '../utils/functions/index.js'

// eslint-disable-next-line no-unused-vars
function encrypt(req, res, next) {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'data')) {
    throw new BadRequestError('please provide a data')
  }
  req.body.data = encryptData(req.body.data)

  next()
}

export default encrypt
