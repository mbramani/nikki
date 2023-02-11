import { connectToDB, disconnectToDB, removeDataFromDatabase } from '../../helper.js'
import { getAccessToken, postToPage, getToPage, deleteToPage } from './pageHelper.js'

const dateInfo = { year: 2023, month: 1, day: 1 }
const pageInfo = {
  data: 'the page',
}
describe('DELETE /api/page/:year/:month/:day', () => {
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

  it('should delete page from db', async () => {
    await postToPage(dateInfo, accessToken, pageInfo)
    const resOfDelete = await deleteToPage(dateInfo, accessToken)
    const resOfGet = await getToPage(dateInfo, accessToken)

    expect(resOfDelete.statusCode).toEqual(200)
    expect(resOfDelete.body).toMatchObject({ msg: 'page deleted successfully' })
    expect(resOfGet.body).toMatchObject({ msg: 'page not found' })
    expect(resOfDelete.headers['content-type']).toEqual('application/json; charset=utf-8')
  })

  describe('should return a 400 status code', () => {
    it('sif date is a invalid', async () => {
      const res = await deleteToPage({ year: 2022, month: 12, day: 32 }, accessToken)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'date is a invalid' })
    })
  })

  describe('should return a 401 status code', () => {
    it('if accessToken is missing', async () => {
      let undefinedAccessToken
      const res = await deleteToPage(dateInfo, undefinedAccessToken)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
    })
  })

  describe('should return a 404 status code', () => {
    it('if page not exists', async () => {
      const res = await deleteToPage(dateInfo, accessToken)

      expect(res.statusCode).toEqual(404)
      expect(res.body).toMatchObject({ msg: 'page not exists' })
    })
  })
})
