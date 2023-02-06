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

describe('POST /api/page/:year/:month/:day', () => {
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

  it('should return year, month, day, and data and store it to db', async () => {
    const resOfPost = await postToPage(dateInfo, accessToken, pageInfo)
    const resOfGet = await getToPage(dateInfo, accessToken)

    expect(resOfPost.statusCode).toEqual(201)
    expect(resOfPost.body.year).toEqual(resOfGet.body.year)
    expect(resOfPost.body.month).toEqual(resOfGet.body.month)
    expect(resOfPost.body.day).toEqual(resOfGet.body.day)
    expect(resOfPost.body.data).toEqual(resOfGet.body.data)
    expect(resOfPost.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  it('should return a 400 status code, if page already exists', async () => {
    await postToPage(dateInfo, accessToken, pageInfo)
    const res = await postToPage(dateInfo, accessToken, pageInfo)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'page already exists' })
  })

  it('should return a 400 status code, if date is a invalid', async () => {
    const res = await postToPage(
      { year: 2022, month: 12, day: 32 },
      accessToken,
      pageInfo
    )

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'date is a invalid' })
  })

  it('should return a 400 status code, if data is missing', async () => {
    let pageData
    const res = await postToPage(dateInfo, accessToken, pageData)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'please provide a data' })
  })

  it('should return a 401 status code, if accessToken is missing', async () => {
    let undefinedAccessToken
    const res = await postToPage(dateInfo, undefinedAccessToken, pageInfo)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
  })
})
