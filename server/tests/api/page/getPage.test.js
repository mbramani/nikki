import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'
import { getAccessToken, postToPage, getToPage } from './pageHelper.js'

const pageInfo = {
  data: 'the page',
}

const dateInfo = { year: 2023, month: 1, day: 1 }

describe('GET /api/page/:year/:month/:day', () => {
  let accessToken

  beforeAll(async () => {
    connectToDB()
  })

  beforeEach(async () => {
    accessToken = await getAccessToken()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should return year, month, day, and data', async () => {
    await postToPage(dateInfo, accessToken, pageInfo)
    const res = await getToPage(dateInfo, accessToken)

    expect(res.statusCode).toEqual(200)
    expect(res.body.year).toEqual(dateInfo.year)
    expect(res.body.month).toEqual(dateInfo.month)
    expect(res.body.day).toEqual(dateInfo.day)
    expect(res.body.data).toEqual(pageInfo.data)
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  describe('should return a 400 status code', () => {
    it('if date is a invalid', async () => {
      const res = await getToPage(
        { year: 2022, month: 12, day: 32 },
        accessToken
      )

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'date is a invalid' })
    })
  })

  describe('should return a 401 status code', () => {
    it('if accessToken is missing', async () => {
      await postToPage(dateInfo, accessToken, pageInfo)
      const res = await getToPage(dateInfo)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
    })
  })

  describe('should return a 404 status code', () => {
    it('if page not found', async () => {
      await postToPage(dateInfo, accessToken, pageInfo)
      const res = await getToPage(
        { ...dateInfo, day: dateInfo.day + 1 },
        accessToken
      )

      expect(res.statusCode).toEqual(404)
      expect(res.body).toMatchObject({ msg: 'page not found' })
    })
  })
})
