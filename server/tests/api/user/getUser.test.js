import { getAccessToken, getToUser } from './userHelper.js'
import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'

const userInfo = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

describe('GET /api/user/', () => {
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should return user details', async () => {
    const accessToken = await getAccessToken(userInfo)
    const res = await getToUser(accessToken)

    expect(res.status).toEqual(200)
    expect(res.body).toMatchObject({
      name: 'John',
      email: 'john@example.com',
    })
  })

  it('should return a 401 status code, if accessToken is missing', async () => {
    let accessToken
    const res = await getToUser(accessToken)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
  })
})
