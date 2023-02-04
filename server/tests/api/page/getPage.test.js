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
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should return year, month, day, and data', async () => {
    const accessToken = await getAccessToken()
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

  it('should return a 401 status code, if accessToken is missing', async () => {
    const accessToken = await getAccessToken()
    await postToPage(dateInfo, accessToken, pageInfo)
    const res = await getToPage(dateInfo)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
  })

  it('should return a 404 status code, if page not found', async () => {
    const accessToken = await getAccessToken()
    await postToPage(dateInfo, accessToken, pageInfo)
    const res = await getToPage(
      { ...dateInfo, day: dateInfo.day + 1 },
      accessToken
    )

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({ msg: 'page not found' })
  })
})
