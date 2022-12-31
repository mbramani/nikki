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

describe('POST /api/auth/login', () => {
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

  it('should login a user and return access token and refresh token', async () => {
    const res = await postToLogin(userLoginInfo)

    expect(res.statusCode).toEqual(200)
    expect(res.body.accessToken).toBeDefined()
    expect(res.body.refreshToken).toBeDefined()
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  it('should return 403 and not login user if user refresh token is not active', async () => {
    await postToLogin(userLoginInfo)

    const user = await User.findOne({ email: userLoginInfo.email })
    const filter = { userId: user._id }
    const update = { isActive: false }

    await RefreshToken.findOneAndUpdate(filter, update, { new: true })

    const res = await postToLogin(userLoginInfo)

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({ msg: 'user is blocked' })
  })

  it('should not create new refresh token object in db, but update previous object with refreshToken and expireAt field', async () => {
    const user = await User.findOne({ email: userRegisterInfo.email })
    const refreshTokenBeforeLogin = await RefreshToken.findOne({
      userId: user._id,
    })

    await postToLogin(userLoginInfo)
    const refreshTokenAfterLogin = await RefreshToken.findOne({
      userId: user._id,
    })

    expect(refreshTokenBeforeLogin._id).toEqual(refreshTokenAfterLogin._id)
    expect(refreshTokenBeforeLogin.token).not.toEqual(
      refreshTokenAfterLogin.token
    )
    expect(refreshTokenBeforeLogin.expiresAt).not.toEqual(
      refreshTokenAfterLogin.expiresAt
    )
  })

  it('should update refresh token in db with valid expireAt date', async () => {
    await postToLogin(userLoginInfo)

    const user = await User.findOne({ email: userLoginInfo.email })
    const refreshToken = await RefreshToken.findOne({ userId: user._id })

    const refreshTokenExpiryDate = new Date(refreshToken.expiresAt).getTime()
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

  it('should return access token with valid expiry date', async () => {
    const res = await postToLogin(userLoginInfo)
    const { accessToken } = res.body
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

  it('should return a 400 status code if the request is missing a email or email is empty', async () => {
    const userPassword = {
      password: userLoginInfo.password,
    }

    const resForEmptyEmail = await postToLogin({ email: '', ...userPassword })
    const resForMissingEmail = await postToLogin({ ...userPassword })

    expect(resForEmptyEmail.statusCode).toEqual(400)
    expect(resForMissingEmail.statusCode).toEqual(400)
    expect(resForEmptyEmail.body).toMatchObject({
      msg: 'please provide a email',
    })
    expect(resForMissingEmail.body).toMatchObject({
      msg: 'please provide a email',
    })
  })

  it('should return a 400 status code if the request is missing a password or password is empty', async () => {
    const userEmail = {
      email: userLoginInfo.email,
    }

    const resForEmptyPassword = await postToLogin({
      ...userEmail,
      password: '',
    })
    const resForMissingPassword = await postToLogin({ ...userEmail })

    expect(resForEmptyPassword.statusCode).toEqual(400)
    expect(resForMissingPassword.statusCode).toEqual(400)
    expect(resForEmptyPassword.body).toMatchObject({
      msg: 'please provide a password',
    })
    expect(resForMissingPassword.body).toMatchObject({
      msg: 'please provide a password',
    })
  })

  it('should return a 401 status code if the email is not registered', async () => {
    const user = {
      ...userLoginInfo,
      email: 'some@do.com',
    }
    const res = await postToLogin(user)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'invalid credentials' })
  })

  it('should return a 401 status code if the password is wrong', async () => {
    const user = {
      ...userLoginInfo,
      password: 'wrongPassword',
    }
    const res = await postToLogin(user)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject({ msg: 'invalid credentials' })
  })
})
