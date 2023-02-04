import request from 'supertest'
import app from '../../../src/app.js'
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

  it('should login a user and return name, email, access token and refresh token', async () => {
    const res = await postToLogin(userLoginInfo)

    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual(userRegisterInfo.name)
    expect(res.body.email).toEqual(userLoginInfo.email)
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
    const update = { 'refresh.isActive': false }

    await Token.findOneAndUpdate(filter, update, { new: true })

    const res = await postToLogin(userLoginInfo)

    expect(res.statusCode).toEqual(403)
    expect(res.body).toMatchObject({ msg: 'user is blocked' })
  })

  describe('should return a 400 status code', () => {
    it('if the request is missing a email or email is empty', async () => {
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

    it('if the request is missing a password or password is empty', async () => {
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
  })

  describe('should return a 401 status code', () => {
    it('if the email is not registered', async () => {
      const user = {
        ...userLoginInfo,
        email: 'some@do.com',
      }
      const res = await postToLogin(user)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'invalid credentials' })
    })

    it('if the password is wrong', async () => {
      const user = {
        ...userLoginInfo,
        password: 'wrongPassword',
      }
      const res = await postToLogin(user)

      expect(res.statusCode).toEqual(401)
      expect(res.body).toMatchObject({ msg: 'invalid credentials' })
    })
  })
})
