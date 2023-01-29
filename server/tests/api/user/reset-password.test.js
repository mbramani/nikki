import request from 'supertest'
import { User, Token } from '../../../src/models/index.js'
import app from '../../../src/app.js'
import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'

const userRegisterInfo = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

const postToRegister = async (dataToSend) => {
  const res = await request(app).post('/api/auth/register').send(dataToSend)
  return res
}

const postToResetPassword = async (dataToSend) => {
  const res = await request(app)
    .post('/api/user/reset-password')
    .send(dataToSend)
  return res
}

describe('POST /api/user/reset-password', () => {
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

  it('should reset the password and return a success message', async () => {
    const user = await User.findOne({ email: userRegisterInfo.email })
    const resetToken = await user.generateResetPasswordToken()

    const res = await postToResetPassword({
      resetToken,
      newPassword: 'testPassword',
    })

    expect(res.status).toEqual(200)
    expect(res.body).toMatchObject({
      msg: 'password reset successfully',
    })
  })

  describe('should return a 400 status code', () => {
    it('if the request is missing a reset token or reset token is empty', async () => {
      const resForEmptyResetToken = await postToResetPassword({
        newPassword: 'testPassword',
        resetToken: '',
      })
      const resForMissingResetToken = await postToResetPassword({
        newPassword: 'testPassword',
      })

      expect(resForEmptyResetToken.statusCode).toEqual(400)
      expect(resForMissingResetToken.statusCode).toEqual(400)
      expect(resForEmptyResetToken.body).toMatchObject({
        msg: 'please provide a reset token',
      })
      expect(resForMissingResetToken.body).toMatchObject({
        msg: 'please provide a reset token',
      })
    })

    it('if the request is missing a new password or new password is empty', async () => {
      const user = await User.findOne({ email: userRegisterInfo.email })
      const resetToken = await user.generateResetPasswordToken()

      const resForEmptyNewPassword = await postToResetPassword({
        resetToken,
        newPassword: '',
      })
      const resForMissingNewPassword = await postToResetPassword({
        resetToken,
      })

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
      const user = await User.findOne({ email: userRegisterInfo.email })
      const resetToken = await user.generateResetPasswordToken()

      const dataToSend = { resetToken, newPassword: userRegisterInfo.password }
      const res = await postToResetPassword(dataToSend)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({
        msg: 'new password must be different from current password',
      })
    })
  })

  describe('should return a 401 status code', () => {
    it('if reset token is a invalid', async () => {
      const dataToSend = {
        resetToken: 'a'.repeat(100),
        newPassword: userRegisterInfo.password,
      }

      const res = await postToResetPassword(dataToSend)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({
        msg: 'reset token is a invalid',
      })
    })

    it('if reset token is a expired', async () => {
      const user = await User.findOne({ email: userRegisterInfo.email })
      const resetToken = await user.generateResetPasswordToken()

      const filter = { userId: user._id }
      const update = {
        'resetPassword.expiresAt': new Date(Date.now() - 10000000000000),
      }
      await Token.findOneAndUpdate(filter, update, { new: true })

      const res = await postToResetPassword({
        resetToken,
        newPassword: 'somePassword',
      })

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({
        msg: 'reset token is a expired',
      })
    })
  })
})
