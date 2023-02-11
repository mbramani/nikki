import { User, Token } from '../../src/models/index.js'
import { connectToDB, disconnectToDB, removeDataFromDatabase } from '../helper.js'

const userData = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

describe('Token model', () => {
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  describe('statics', () => {
    describe('findByUserId static', () => {
      it('should find token record by userId', async () => {
        const userRecord = await User.create(userData)
        await userRecord.generateRefreshToken()
        const tokenRecord = await Token.findByUserId(userRecord._id.toString())

        expect(tokenRecord.userId.toString()).toEqual(userRecord._id.toString())
      })
    })

    describe('findByRefreshToken static', () => {
      it('should find token record by refresh token', async () => {
        const userRecord = await User.create(userData)
        const refreshToken = await userRecord.generateRefreshToken()
        const tokenRecord = await Token.findByRefreshToken(refreshToken)

        expect(tokenRecord.refresh.token).toEqual(refreshToken)
      })
    })

    describe('findByResetPasswordToken static', () => {
      it('should find token record by reset password token', async () => {
        const userRecord = await User.create(userData)
        await userRecord.generateRefreshToken()
        const resetPasswordToken = await userRecord.generateResetPasswordToken()

        const tokenRecord = await Token.findByResetPasswordToken(resetPasswordToken)

        expect(tokenRecord.resetPassword.token).toEqual(resetPasswordToken)
      })
    })
  })
})
