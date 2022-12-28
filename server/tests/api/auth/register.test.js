/* eslint-disable no-underscore-dangle */
import request from 'supertest'
import app from '../../../src/app.js'
import RefreshToken from '../../../src/models/RefreshToken.js'
import User from '../../../src/models/User.js'
import {
  connectToDB,
  disconnectToDB,
  removeDataFromDatabase,
} from './helper.js'

let userRegisterInfo = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

const PostToRegister = async (dataToSend) => {
  const data = await request(app).post('/api/auth/register').send(dataToSend)
  return data
}

describe('POST /api/auth/register', () => {
  beforeAll(async () => {
    connectToDB()
  })

  afterEach(async () => {
    await removeDataFromDatabase()
  })

  afterAll(async () => {
    disconnectToDB()
  })

  it('should create a new user and return accessToken and refreshToken', async () => {
    const res = await PostToRegister(userRegisterInfo)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('refreshToken')
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  it('should store user in db', async () => {
    await PostToRegister(userRegisterInfo)

    const user = await User.findOne({ email: userRegisterInfo.email })

    expect(user).not.toBeNull()
  })

  it('should store refreshToken in db', async () => {
    await PostToRegister(userRegisterInfo)

    const user = await User.findOne({ email: userRegisterInfo.email })
    const refreshToken = await RefreshToken.findOne({ userId: user._id })

    expect(refreshToken).not.toBeNull()
  })

  it('should return a 400 status code if the email is already in use', async () => {
    await PostToRegister(userRegisterInfo)

    const res = await PostToRegister(userRegisterInfo)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'Email is already in use' })
  })

  it('should return a 400 status code if the request is missing required data', async () => {
    const user = {
      email: userRegisterInfo.email,
      password: userRegisterInfo.password,
    }
    const res = await PostToRegister(user)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'Please provide a name' })
  })

  it('should return a 400 status code if name is less than 3 characters', async () => {
    const user = {
      name: 'a',
      email: userRegisterInfo.email,
      password: userRegisterInfo.password,
    }
    const res = await PostToRegister(user)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
      msg: 'Name should have a minimum length of 3',
    })
  })

  it('should return a 400 status code if name is grater than 50 characters', async () => {
    const user = {
      name: 'a'.repeat(55),
      email: userRegisterInfo.email,
      password: userRegisterInfo.password,
    }
    const res = await PostToRegister(user)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
      msg: 'Name should have a maximum length of 50',
    })
  })

  it('should return a 400 status code if email does not match regex patter', async () => {
    const user = {
      name: userRegisterInfo.name,
      email: '@con.com',
      password: userRegisterInfo.password,
    }
    const res = await PostToRegister(user)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ msg: 'Please provide a valid email' })
  })

  it('should return a 400 status code if password is less 6 than characters', async () => {
    const user = {
      name: userRegisterInfo.name,
      email: userRegisterInfo.email,
      password: 'a',
    }
    const res = await PostToRegister(user)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({
      msg: 'Password should have a minimum length of 6 characters',
    })
  })
})
