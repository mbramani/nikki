import { postToRegister } from '../auth/authHelper.js'
import { postToForgotPassword } from './userHelper.js'
import { User, Token } from '../../../src/models/index.js'
import { connectToDB, disconnectToDB, removeDataFromDatabase } from '../../helper.js'

const userRegisterInfo = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

describe('POST /api/user/forgot-password', () => {
  beforeAll(async () => {
    connectToDB()
  })

  beforeEach(async () => {
    await postToRegister(userRegisterInfo)
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should send a password reset email', async () => {
    const res = await postToForgotPassword({ email: userRegisterInfo.email })

    expect(res.status).toEqual(200)
    expect(res.body).toMatchObject({
      msg: 'password reset email sent successfully',
    })
  })

  it('should return 403 and not send email user if user refresh token is not active', async () => {
    const user = await User.findOne({ email: userRegisterInfo.email })
    const filter = { userId: user._id }
    const update = { 'refresh.isActive': false }

    await Token.findOneAndUpdate(filter, update, { new: true })

    const res = await postToForgotPassword({ email: userRegisterInfo.email })

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({ msg: 'user is blocked' })
  })

  describe('should return a 400 status code', () => {
    it('if the request is missing a email or email is empty', async () => {
      const resForEmptyEmail = await postToForgotPassword({ email: '' })
      const resForMissingEmail = await postToForgotPassword({})

      expect(resForEmptyEmail.statusCode).toEqual(400)
      expect(resForMissingEmail.statusCode).toEqual(400)
      expect(resForEmptyEmail.body).toMatchObject({
        msg: 'please provide a email',
      })
      expect(resForMissingEmail.body).toMatchObject({
        msg: 'please provide a email',
      })
    })

    it('if the email is not registered', async () => {
      const res = await postToForgotPassword({ email: 'fff@test.com' })

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'email is not found' })
    })
  })
})
