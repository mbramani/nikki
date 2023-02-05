import { StatusCodes } from 'http-status-codes'
import { Page } from '../models/index.js'
import { decryptData } from '../utils/functions/index.js'
import { BadRequestError, NotFoundError } from '../utils/errors/index.js'

async function getAllPage(req, res) {
  const { userId } = req.user

  const totalPage = await Page.countDocuments({ userId })
  const pageRecord = await Page.findByUserId(userId).select({
    year: 1,
    month: 1,
    day: 1,
    data: 1,
    _id: 0,
  })

  const pages = pageRecord.map((obj) => ({
    ...obj._doc,
    data: decryptData(obj.data),
  }))

  res.status(StatusCodes.OK).json({ totalPage, pages })
}

async function getPage(req, res) {
  const { year, month, day } = req.params
  const { userId } = req.user

  const pageRecord = await Page.findPage({ userId, year, month, day }).select({
    year: 1,
    month: 1,
    day: 1,
    data: 1,
    _id: 0,
  })

  if (!pageRecord) {
    throw new NotFoundError('page not found')
  }

  res.status(StatusCodes.OK).json({
    year: pageRecord.year,
    month: pageRecord.month,
    day: pageRecord.day,
    data: decryptData(pageRecord.data),
  })
}

async function postPage(req, res) {
  const { year, month, day } = req.params
  const { data } = req.body
  const { userId } = req.user

  const isPageExists = await Page.findPage({ userId, year, month, day })

  if (isPageExists) {
    throw new BadRequestError('page already exists')
  }

  const pageRecord = await Page.create({ userId, year, month, day, data })

  res.status(StatusCodes.CREATED).json({
    year: pageRecord.year,
    month: pageRecord.month,
    day: pageRecord.day,
    data: decryptData(pageRecord.data),
  })
}

async function patchPage(req, res) {
  const { year, month, day } = req.params
  const { data } = req.body
  const { userId } = req.user

  const filter = { userId, year, month, day }
  const update = { data }
  const pageRecord = await Page.findOneAndUpdate(filter, update, {
    new: true,
  }).select({ year: 1, month: 1, day: 1, data: 1, _id: 0 })

  if (!pageRecord) {
    throw new NotFoundError('page not exists')
  }

  res.status(StatusCodes.OK).json({
    year: pageRecord.year,
    month: pageRecord.month,
    day: pageRecord.day,
    data: decryptData(pageRecord.data),
  })
}

async function deletePage(req, res) {
  const { year, month, day } = req.params
  const { userId } = req.user

  const pageRecord = await Page.findOneAndDelete({ userId, year, month, day })
  if (!pageRecord) {
    throw new NotFoundError('page not exists')
  }

  res.status(StatusCodes.OK).json({ msg: 'page deleted successfully' })
}

export { getAllPage, getPage, postPage, patchPage, deletePage }
