import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'
import { getAccessToken, postToPage, getToAllPage } from './pageHelper.js'

const pageInfoArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const dateInfo = { year: 2023, month: 1, day: 1 }

describe('GET /api/page/', () => {
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should return all user page', async () => {
    const accessToken = await getAccessToken()
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

  it('should return a 401 status code, if accessToken is missing', async () => {
    let accessToken
    const res = await getToAllPage(accessToken)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
  })
})
