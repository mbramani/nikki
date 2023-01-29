import { isDateValid } from '../utils/functions/index.js'
import { BadRequestError } from '../utils/errors/index.js'

function validateDate(req, res, next) {
  const { year, month, day } = req.params
  if (!isDateValid({ year, month, day })) {
    throw new BadRequestError('date is a invalid')
  }
  next()
}

export default validateDate
