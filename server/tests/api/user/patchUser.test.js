import { getAccessToken, patchToUser } from './userHelper.js'
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

const updateUserInfo = {
  name: 'Dave',
  email: 'dave@example.com',
}

describe('PATCH /api/user/', () => {
  let accessToken
  beforeAll(async () => {
    connectToDB()
  })
  beforeEach(async () => {
    accessToken = await getAccessToken(userInfo)
  })
  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should update user name and email', async () => {
    const resOfPatch = await patchToUser(updateUserInfo, accessToken)

    expect(resOfPatch.status).toEqual(200)
    expect(resOfPatch.body).toMatchObject(updateUserInfo)
  })

  it('should update user name if only name is provided', async () => {
    const resOfPatch = await patchToUser(
      { name: updateUserInfo.name },
      accessToken
    )

    expect(resOfPatch.status).toEqual(200)
    expect(resOfPatch.body).toMatchObject({
      name: updateUserInfo.name,
      email: userInfo.email,
    })
  })

  it('should update user email if only email is provided', async () => {
    const resOfPatch = await patchToUser(
      { email: updateUserInfo.email },
      accessToken
    )

    expect(resOfPatch.status).toEqual(200)
    expect(resOfPatch.body).toMatchObject({
      name: userInfo.name,
      email: updateUserInfo.email,
    })
  })

  describe('should return a 400 status code', () => {
    it('if name and email both are missing', async () => {
      const res = await patchToUser({}, accessToken)

      expect(res.status).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'please provide a name or email' })
    })

    it('if new email is same as current email', async () => {
      const res = await patchToUser({ email: 'john@example.com' }, accessToken)

      expect(res.status).toEqual(400)
      expect(res.body).toMatchObject({
        msg: 'new email must be different from current email',
      })
    })
  })

  describe('should return a 401 status code', () => {
    it('if accessToken is missing', async () => {
      let undefinedAccessToken
      const res = await patchToUser(updateUserInfo, undefinedAccessToken)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
    })
  })
})
