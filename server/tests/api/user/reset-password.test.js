import request from 'supertest'
import { User } from '../../../src/models/index.js'
import app from '../../../src/app.js'
import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../../helper.js'
import configs from '../../../src/utils/configs.js'
import jwt from 'jsonwebtoken'

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
    const resetToken = user.generateJwtToken(
      configs.jwt.secret,
      'passwordResetToken'
    )

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
      const user = await User.findOne({ email: userRegisterInfo.email })
      const resetToken = user.generateJwtToken(
        configs.jwt.secret,
        'passwordResetToken'
      )

      const dataToSend = { resetToken, newPassword: 'testPassword' }
      const resForEmptyResetToken = await postToResetPassword({
        ...dataToSend,
        resetToken: '',
      })
      const resForMissingResetToken = await postToResetPassword({
        newPassword: dataToSend.newPassword,
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
      const resetToken = user.generateJwtToken(
        configs.jwt.secret,
        'passwordResetToken'
      )

      const dataToSend = { resetToken, newPassword: 'testPassword' }
      const resForEmptyNewPassword = await postToResetPassword({
        ...dataToSend,
        newPassword: '',
      })
      const resForMissingNewPassword = await postToResetPassword({
        resetToken: dataToSend.resetToken,
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
      const resetToken = user.generateJwtToken(
        configs.jwt.secret,
        'passwordResetToken'
      )

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
      const user = await User.findOne({ email: userRegisterInfo.email })
      const resetToken = user.generateJwtToken(
        configs.jwt.secret,
        'passwordResetToken'
      )
      const wrongSyntaxResetToken = resetToken
        .split('.')
        .map((element, index) => {
          if (index === 1) {
            return 'a'.repeat(64)
          }
          return element
        })
        .join('.')

      const dataToSend = {
        resetToken: 'a'.repeat(100),
        newPassword: userRegisterInfo.password,
      }

      const resForInvalidToken = await postToResetPassword(dataToSend)
      const resForWrongSyntaxToken = await postToResetPassword({
        ...dataToSend,
        resetToken: wrongSyntaxResetToken,
      })

      expect(resForInvalidToken.statusCode).toEqual(401)
      expect(resForWrongSyntaxToken.statusCode).toEqual(401)
      expect(resForInvalidToken.body).toMatchObject({
        msg: 'reset token is a invalid',
      })
      expect(resForWrongSyntaxToken.body).toMatchObject({
        msg: 'reset token is a invalid',
      })
    })
    it('if reset token is a access token', async () => {
      const user = await User.findOne({ email: userRegisterInfo.email })
      const resetToken = user.generateJwtToken(configs.jwt.secret)
      const dataToSend = {
        resetToken,
        newPassword: userRegisterInfo.password,
      }

      const res = await postToResetPassword(dataToSend)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'reset token is a invalid' })
    })

    it('if reset token is a expired', async () => {
      const dataToSend = {
        resetToken: jwt.sign({ userRegisterInfo }, configs.jwt.secret, {
          expiresIn: '1',
        }),
        newPassword: userRegisterInfo.password,
      }

      const res = await postToResetPassword(dataToSend)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({
        msg: 'reset token is a expired',
      })
    })
  })
})
