/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'

function notFound(req, res, next) {
  res.status(StatusCodes.NOT_FOUND).send({ msg: 'Route does not exist' })
}

export default notFound
