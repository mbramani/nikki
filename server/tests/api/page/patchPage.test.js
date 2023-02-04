import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'
import {
  getAccessToken,
  postToPage,
  getToPage,
  patchToPage,
} from './pageHelper.js'

const pageInfo = {
  data: 'the page',
}

const pageInfoForPatch = {
  data: 'the page update by patch',
}

const dateInfo = { year: 2023, month: 1, day: 1 }

describe('PATCH /api/page/:year/:month/:day', () => {
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should return year, month, day, and data and update it to db', async () => {
    const accessToken = await getAccessToken()
    const resOfPost = await postToPage(dateInfo, accessToken, pageInfo)
    const resOfPatch = await patchToPage(
      dateInfo,
      accessToken,
      pageInfoForPatch
    )
    const resOfGet = await getToPage(dateInfo, accessToken)

    expect(resOfPatch.statusCode).toEqual(200)
    expect(resOfPatch.body.year).toEqual(resOfGet.body.year)
    expect(resOfPatch.body.month).toEqual(resOfGet.body.month)
    expect(resOfPatch.body.day).toEqual(resOfGet.body.day)
    expect(resOfPatch.body.data).toEqual(resOfGet.body.data)
    expect(resOfPatch.body.data).not.toEqual(resOfPost.body.data)
    expect(resOfPatch.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  it('should return a 400, if data is missing', async () => {
    const accessToken = await getAccessToken()
    const res = await patchToPage(accessToken, pageInfo)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'please provide a data' })
  })

  it('should return a 401, if accessToken is missing', async () => {
    let accessToken
    const res = await patchToPage(dateInfo, accessToken, pageInfo)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
  })

  it('should return a 404, if page not exists', async () => {
    const accessToken = await getAccessToken()
    const res = await patchToPage(dateInfo, accessToken, pageInfo)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({ msg: 'page not exists' })
  })
})
