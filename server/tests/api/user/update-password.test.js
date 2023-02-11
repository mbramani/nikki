import { getAccessToken, patchToUpdatePassword } from './userHelper.js'
import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'
import { User } from '../../../src/models/index.js'

const userInfo = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

const newPassword = '#testPASSWORD'

describe('PATCH /api/user/update-password', () => {
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

  it('should update user password', async () => {
    const res = await patchToUpdatePassword({ newPassword }, accessToken)

    const user = await User.findOne({ email: userInfo.email })
    const isPasswordMatch = await user.isPasswordMatch(newPassword)

    expect(res.status).toEqual(200)
    expect(res.body).toMatchObject({ msg: 'password update successfully' })
    expect(isPasswordMatch).toBe(true)
  })

  describe('should return a 400 status code', () => {
    it('if the request is missing a new password or new password is empty', async () => {
      const resForEmptyNewPassword = await patchToUpdatePassword(
        { newPassword: '' },
        accessToken
      )
      const resForMissingNewPassword = await patchToUpdatePassword(
        {},
        accessToken
      )

      expect(resForEmptyNewPassword.statusCode).toEqual(400)
      expect(resForMissingNewPassword.statusCode).toEqual(400)
      expect(resForEmptyNewPassword.body).toMatchObject({
        msg: 'please provide a new password',
      })
      expect(resForMissingNewPassword.body).toMatchObject({
        msg: 'please provide a new password',
      })
    })

    it('if new password is same as current password', async () => {
      const res = await patchToUpdatePassword(
        { newPassword: userInfo.password },
        accessToken
      )

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({
        msg: 'new password must be different from current password',
      })
    })
  })

  describe('should return a 401 status code', () => {
    it('if accessToken is missing', async () => {
      let undefinedAccessToken
      const res = await patchToUpdatePassword(
        { newPassword },
        undefinedAccessToken
      )

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'access token is a invalid' })
    })
  })
})
