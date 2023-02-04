import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'
import {
  getAccessToken,
  postToPage,
  getToPage,
  deleteToPage,
} from './pageHelper.js'

const pageInfo = {
  data: 'the page',
}

const dateInfo = { year: 2023, month: 1, day: 1 }

describe('DELETE /api/page/:year/:month/:day', () => {
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should delete page from db', async () => {
    const accessToken = await getAccessToken()
    await postToPage(dateInfo, accessToken, pageInfo)
    const resOfDelete = await deleteToPage(dateInfo, accessToken)
    const resOfGet = await getToPage(dateInfo, accessToken)

    expect(resOfDelete.statusCode).toEqual(200)
    expect(resOfDelete.body).toMatchObject({ msg: 'page deleted successfully' })
    expect(resOfGet.body).toMatchObject({ msg: 'page not found' })
    expect(resOfDelete.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  it('should return a 401 status code, if accessToken is missing', async () => {
    let accessToken
    const res = await deleteToPage(dateInfo, accessToken, pageInfo)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
  })

  it('should return a 404 status code, if page not exists', async () => {
    const accessToken = await getAccessToken()
    const res = await deleteToPage(dateInfo, accessToken, pageInfo)

    expect(res.statusCode).toEqual(404)
    expect(res.body).toMatchObject({ msg: 'page not exists' })
  })
})
