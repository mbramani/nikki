import { connectToDB, disconnectToDB, removeDataFromDatabase } from '../../helper.js'
import { getAccessToken, postToPage, getToAllPage } from './pageHelper.js'

const pageInfoArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const dateInfo = { year: 2023, month: 1, day: 1 }

describe('GET /api/page/', () => {
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

  it('should return all user page', async () => {
    let promiseArr = []
    pageInfoArr.forEach((ele) => {
      let promise = postToPage({ ...dateInfo, day: ele }, accessToken, {
        data: `page no is a ${ele}`,
      })

      promiseArr.push(promise)
    })

    await Promise.all(promiseArr)

    const res = await getToAllPage(accessToken)

    expect(res.statusCode).toEqual(200)
    expect(res.body.totalPage).toEqual(10)
    expect(Array.isArray(res.body.pages)).toBe(true)
  })

  describe('should return a 401 status code', () => {
    it('if accessToken is missing', async () => {
      const res = await getToAllPage()

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
    })
  })
})
