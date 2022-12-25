/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'

function errorHandler(err, req, res, next) {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandler
