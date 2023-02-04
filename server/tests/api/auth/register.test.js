import { postToRegister } from './authHelper.js'
import { User } from '../../../src/models/index.js'
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

  it('should create a new user and return name, email, access token and refresh token', async () => {
    const res = await postToRegister(userRegisterInfo)

    expect(res.statusCode).toEqual(201)
    expect(res.body.name).toEqual(userRegisterInfo.name)
    expect(res.body.email).toEqual(userRegisterInfo.email)
    expect(res.body.accessToken).toBeDefined()
    expect(res.body.refreshToken).toBeDefined()
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    )
  })

  it('should store user in db', async () => {
    await postToRegister(userRegisterInfo)

    const user = await User.findOne({ email: userRegisterInfo.email })

    expect(user).not.toBeNull()
  })
  describe('should return a 400 status code', () => {
    it('if the email is already in use', async () => {
      await postToRegister(userRegisterInfo)

      const res = await postToRegister(userRegisterInfo)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'email is already in use' })
    })

    it('if the request is missing a name or name is empty', async () => {
      const user = {
        email: userRegisterInfo.email,
        password: userRegisterInfo.password,
      }

      const resForEmptyName = await postToRegister({ name: '', ...user })
      const resForMissingName = await postToRegister({ ...user })

      expect(resForEmptyName.statusCode).toEqual(400)
      expect(resForMissingName.statusCode).toEqual(400)
      expect(resForEmptyName.body).toMatchObject({
        msg: 'please provide a name',
      })
      expect(resForMissingName.body).toMatchObject({
        msg: 'please provide a name',
      })
    })

    it('if the request is missing a email or email is empty', async () => {
      const user = {
        name: userRegisterInfo.name,
        password: userRegisterInfo.password,
      }

      const resForEmptyEmail = await postToRegister({ email: '', ...user })
      const resForMissingEmail = await postToRegister({ ...user })

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
      const user = {
        name: userRegisterInfo.name,
        email: userRegisterInfo.email,
      }
      const resForEmptyPassword = await postToRegister({
        password: '',
        ...user,
      })
      const resForMissingPassword = await postToRegister({ ...user })

      expect(resForEmptyPassword.statusCode).toEqual(400)
      expect(resForMissingPassword.statusCode).toEqual(400)
      expect(resForEmptyPassword.body).toMatchObject({
        msg: 'please provide a password',
      })
      expect(resForMissingPassword.body).toMatchObject({
        msg: 'please provide a password',
      })
    })

    it('if name is less than 3 characters', async () => {
      const user = {
        ...userRegisterInfo,
        name: 'a',
      }
      const res = await postToRegister(user)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({
        msg: 'name should have a minimum length of 3',
      })
    })

    it('if name is grater than 50 characters', async () => {
      const user = {
        ...userRegisterInfo,
        name: 'a'.repeat(55),
      }

      const res = await postToRegister(user)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({
        msg: 'name should have a maximum length of 50',
      })
    })

    it('if email does not match regex patter', async () => {
      const user = {
        ...userRegisterInfo,
        email: '@con.com',
      }
      const res = await postToRegister(user)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({ msg: 'please provide a valid email' })
    })

    it('if password is less 6 than characters', async () => {
      const user = {
        ...userRegisterInfo,
        password: 'a',
      }
      const res = await postToRegister(user)

      expect(res.statusCode).toEqual(400)
      expect(res.body).toMatchObject({
        msg: 'password should have a minimum length of 6 characters',
      })
    })
  })
})
