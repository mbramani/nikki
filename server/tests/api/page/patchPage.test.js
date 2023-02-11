import { connectToDB, disconnectToDB, removeDataFromDatabase } from '../../helper.js'
import { getAccessToken, postToPage, getToPage, patchToPage } from './pageHelper.js'

const pageInfo = {
  data: 'the page',
}

const pageInfoForPatch = {
  data: 'the page update by patch',
}

const dateInfo = { year: 2023, month: 1, day: 1 }

describe('PATCH /api/page/:year/:month/:day', () => {
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

  it('should return year, month, day, and data and update it to db', async () => {
    const resOfPost = await postToPage(dateInfo, accessToken, pageInfo)
    const resOfPatch = await patchToPage(dateInfo, accessToken, pageInfoForPatch)
    const resOfGet = await getToPage(dateInfo, accessToken)

    expect(resOfPatch.statusCode).toEqual(200)
    expect(resOfPatch.body.year).toEqual(resOfGet.body.year)
    expect(resOfPatch.body.month).toEqual(resOfGet.body.month)
    expect(resOfPatch.body.day).toEqual(resOfGet.body.day)
    expect(resOfPatch.body.data).toEqual(resOfGet.body.data)
    expect(resOfPatch.body.data).not.toEqual(resOfPost.body.data)
    expect(resOfPatch.headers['content-type']).toEqual('application/json; charset=utf-8')
  })
  describe('should return a 400 status code', () => {
    it('if date is a invalid', async () => {
      const res = await patchToPage({ year: 2022, month: 12, day: 32 }, accessToken, pageInfo)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'date is a invalid' })
    })

    it('if data is missing', async () => {
      let pageData
      const res = await patchToPage(dateInfo, accessToken, pageData)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'please provide a data' })
    })
  })

  describe('should return a 401 status code', () => {
    it('if accessToken is missing', async () => {
      let undefinedAccessToken
      const res = await patchToPage(dateInfo, undefinedAccessToken, pageInfo)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
    })
  })

  describe('should return a 404 status code', () => {
    it('if page not exists', async () => {
      const res = await patchToPage(dateInfo, accessToken, pageInfo)

      expect(res.statusCode).toEqual(404)
      expect(res.body).toMatchObject({ msg: 'page not exists' })
    })
  })
})
