import { postToLogin, postToRegister, postToToken } from './authHelper.js'

import { User, Token } from '../../../src/models/index.js'
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

const userLoginInfo = {
  email: 'john@example.com',
  password: 'Test@123',
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

  it('should return a 401 status code if the refresh token is expired', async () => {
    const {
      body: { refreshToken },
    } = await postToLogin(userLoginInfo)

    const user = await User.findOne({ email: userLoginInfo.email })
    const filter = { userId: user._id }
    const update = {
      'refresh.expiresAt': new Date(Date.now() - 10000000000000),
    }
    await Token.findOneAndUpdate(filter, update)

    const res = await postToToken({ refreshToken })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'refresh token is a expired' })
  })

  it('should return a 403 status code if the refresh token is inActive', async () => {
    const {
      body: { refreshToken },
    } = await postToLogin(userLoginInfo)

    const user = await User.findOne({ email: userLoginInfo.email })
    const filter = { userId: user._id }
    const update = { 'refresh.isActive': false }
    await Token.findOneAndUpdate(filter, update, { new: true })

    const res = await postToToken({ refreshToken })

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({ msg: 'user is blocked' })
  })
})
