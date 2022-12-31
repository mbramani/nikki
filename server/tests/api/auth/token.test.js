/* eslint-disable no-underscore-dangle */
import request from 'supertest'
import app from '../../../src/app.js'
import jwt from 'jsonwebtoken'
import RefreshToken from '../../../src/models/RefreshToken.js'
import User from '../../../src/models/User.js'
import configs from '../../../src/utils/configs.js'
import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from '../helper.js'

let userRegisterInfo = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

let userLoginInfo = {
  email: 'john@example.com',
  password: 'Test@123',
}

const postToRegister = async (dataToSend) => {
  const res = await request(app).post('/api/auth/register').send(dataToSend)
  return res
}

const postToLogin = async (dataToSend) => {
  const res = await request(app).post('/api/auth/login').send(dataToSend)
  return res
}

const postToToken = async (dataToSend) => {
  const res = await request(app)
    .post('/api/auth/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(dataToSend)
  return res
}

describe('POST /api/auth/token', () => {
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

  it('should send a new access token in the response', async () => {
    const res = await postToLogin(userLoginInfo)

    const { refreshToken } = res.body

    const resForToken = await postToToken({ refreshToken })
    const newAccessToken = resForToken.body.accessToken

    expect(resForToken.statusCode).toEqual(200)
    expect(newAccessToken).toBeDefined()
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  it('should return access token with valid expiry date', async () => {
    const res = await postToLogin(userLoginInfo)
    const { refreshToken } = res.body

    const resForToken = await postToToken({ refreshToken })
    const newAccessToken = resForToken.body.accessToken

    const payload = jwt.verify(newAccessToken, configs.jwt.secret)

    const accessTokenExpiryDate = payload.exp * 1000
    const expectedExpiryDate = new Date(
      Date.now() + parseInt(configs.jwt.lifeTime, 10)
    ).getTime()
    const marginOfDelay = new Date(
      Date.now() + parseInt(configs.jwt.lifeTime, 10) - 1000
    ).getTime()

    expect(newAccessToken).not.toBeNull()
    expect(accessTokenExpiryDate).toBeLessThanOrEqual(expectedExpiryDate)
    expect(accessTokenExpiryDate).toBeGreaterThanOrEqual(marginOfDelay)
  })

  it('should return a 400 status code if the refresh token is missing', async () => {
    const res = await postToToken({ refreshToken: '' })

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'please provide a refreshToken' })
  })

  it('should return a 401 status code if the refresh token is invalid', async () => {
    const refreshToken = 'a'.repeat(16)
    const res = await postToToken({ refreshToken })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'refresh token is a invalid' })
  })

  it('should return a 403 status code if the refresh token is inActive', async () => {
    const {
      body: { refreshToken },
    } = await postToLogin(userLoginInfo)

    const user = await User.findOne({ email: userLoginInfo.email })
    const filter = { userId: user._id }
    const update = { isActive: false }
    await RefreshToken.findOneAndUpdate(filter, update, { new: true })

    const res = await postToToken({ refreshToken })

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({ msg: 'user is blocked' })
  })
})
