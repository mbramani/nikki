/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes

function errorHandler(err, req, res, next) {
  let customError = {
    statusCode: err.statusCode || INTERNAL_SERVER_ERROR,
    msg: err.message || 'something went wrong try again later',
  }

  if (err.name === 'ValidationError') {
    const messageArr = Object.values(err.errors).map((item) => item.message)
    customError.msg = messageArr.join(', ')
    customError.statusCode = BAD_REQUEST
  }

  if (err.code && err.code === 11000) {
    const keys = Object.keys(err.keyValue)
    customError.msg = `${keys} is already in use`
    customError.statusCode = BAD_REQUEST
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandler
