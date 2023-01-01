/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken'
import { User, RefreshToken } from '../../src/models/index.js'
import configs from '../../src/utils/configs.js'
import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../helper.js'

const userData = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

describe('User model', () => {
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should hash the password before saving', async () => {
    const user = await User.create(userData)

    expect(user.password).not.toBe(userData.password)
  })

  describe('isPasswordMatch method', () => {
    it('should return true if the password is correct or vice versa', async () => {
      const user = await User.create(userData)
      const correctPassword = await user.isPasswordMatch(userData.password)
      const wrongPassword = await user.isPasswordMatch('1234567')

      expect(correctPassword).toBe(true)
      expect(wrongPassword).toBe(false)
    })
  })

  describe('generateAccessToken method', () => {
    it('should generate a valid jwt access token', async () => {
      const user = await User.create(userData)
      const accessToken = await user.generateAccessToken()
      const payload = jwt.verify(accessToken, configs.jwt.secret)

      expect(payload.userId).toEqual(user._id.toString())
      expect(payload.role).toEqual(user.role)
    })

    it('should return access token with valid expiry time', async () => {
      const user = await User.create(userData)
      const accessToken = await user.generateAccessToken()
      const payload = jwt.verify(accessToken, configs.jwt.secret)

      const accessTokenExpiryDate = payload.exp * 1000
      const expectedExpiryDate = new Date(
        Date.now() + parseInt(configs.jwt.lifeTime, 10)
      ).getTime()
      const marginOfDelay = new Date(
        Date.now() + parseInt(configs.jwt.lifeTime, 10) - 1000
      ).getTime()

      expect(accessToken).not.toBeNull()
      expect(accessTokenExpiryDate).toBeLessThanOrEqual(expectedExpiryDate)
      expect(accessTokenExpiryDate).toBeGreaterThanOrEqual(marginOfDelay)
    })
  })

  describe('generateRefreshToken method', () => {
    it('should generate a valid refresh token and store it in db', async () => {
      const user = await User.create(userData)
      const refreshToken = await user.generateRefreshToken()
      const refreshTokenRecord = await RefreshToken.findOne({
        userId: user._id,
      })

      expect(refreshToken).toEqual(refreshTokenRecord.token)
      expect(refreshTokenRecord.isActive).toBe(true)
    })

    it('should return refresh token with valid expiry time', async () => {
      const user = await User.create(userData)
      const refreshToken = await user.generateRefreshToken()
      const refreshTokenRecord = await RefreshToken.findOne({
        userId: user._id,
      })

      const refreshTokenExpiryDate = new Date(
        refreshTokenRecord.expiresAt
      ).getTime()
      const expectedExpiryDate = new Date(
        Date.now() + parseInt(configs.refreshToken.lifeTime, 10)
      ).getTime()
      const marginOfDelay = new Date(
        Date.now() + parseInt(configs.refreshToken.lifeTime, 10) - 1000
      ).getTime()

      expect(refreshToken).not.toBeNull()
      expect(refreshTokenExpiryDate).toBeLessThanOrEqual(expectedExpiryDate)
      expect(refreshTokenExpiryDate).toBeGreaterThanOrEqual(marginOfDelay)
    })
  })

  describe('updateRefreshToken method', () => {
    it('should update refresh token in db', async () => {
      const user = await User.create(userData)
      const refreshToken = await user.generateRefreshToken()
      const refreshTokenRecordBeforeUpdate = await RefreshToken.findOne({
        userId: user._id,
      })

      const updateRefreshToken = await user.updateRefreshToken()
      const refreshTokenRecordAfterUpdate = await RefreshToken.findOne({
        userId: user._id,
      })

      expect(updateRefreshToken).not.toEqual(refreshToken)
      expect(refreshTokenRecordAfterUpdate._id).toEqual(
        refreshTokenRecordBeforeUpdate._id
      )
      expect(refreshTokenRecordAfterUpdate.expiresAt).not.toEqual(
        refreshTokenRecordBeforeUpdate.expiresAt
      )
    })

    it('should update refresh token in db with valid expireAt date', async () => {
      const user = await User.create(userData)
      await user.generateRefreshToken()
      const updateRefreshToken = await user.updateRefreshToken()
      const refreshTokenRecord = await RefreshToken.findOne({
        userId: user._id,
      })

      const refreshTokenExpiryDate = new Date(
        refreshTokenRecord.expiresAt
      ).getTime()
      const expectedExpiryDate = new Date(
        Date.now() + parseInt(configs.refreshToken.lifeTime, 10)
      ).getTime()
      const marginOfDelay = new Date(
        Date.now() + parseInt(configs.refreshToken.lifeTime, 10) - 1000
      ).getTime()

      expect(updateRefreshToken).not.toBeNull()
      expect(refreshTokenExpiryDate).toBeLessThanOrEqual(expectedExpiryDate)
      expect(refreshTokenExpiryDate).toBeGreaterThanOrEqual(marginOfDelay)
    })
  })
})
