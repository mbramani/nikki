import { User, Page } from '../../src/models/index.js'
import { connectToDB, disconnectToDB, removeDataFromDatabase } from '../helper.js'
import { decryptData, encryptData } from '../../src/utils/functions/index.js'

const userData = {
  name: 'John',
  email: 'john@example.com',
  password: 'Test@123',
}

const pageInfoArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
      it('should find all pages by userId', async () => {
        const userRecord = await User.create(userData)

        let promiseArr = []
        pageInfoArr.forEach((ele) =>
          promiseArr.push(
            Page.create({
              userId: userRecord._id,
              year: 2023,
              month: 1,
              day: ele,
              data: encryptData(`This is page no ${ele}`),
            })
          )
        )
        promiseArr = await Promise.all(promiseArr)

        let pageArr = promiseArr
          .map((obj) => ({
            ...obj._doc,
            data: decryptData(obj.data),
          }))
          .sort((obj1, obj2) => obj1.day - obj2.day)

        let pages = await Page.findByUserId(userRecord._id.toString())
        pages = pages
          .map((obj) => ({
            ...obj._doc,
            data: decryptData(obj.data),
          }))
          .sort((obj1, obj2) => obj1.day - obj2.day)

        expect(pages).toMatchObject(pageArr)
      })
    })

    describe('findPage static', () => {
      it('should find page by year, month, day and userId', async () => {
        const userRecord = await User.create(userData)
        const page = await Page.create({
          userId: userRecord._id,
          year: 2023,
          month: 1,
          day: 1,
          data: encryptData(`This is page no 1`),
        })
        const pageRecord = await Page.findPage({
          userId: userRecord._id,
          year: 2023,
          month: 1,
          day: 1,
        })

        expect(pageRecord._doc).toEqual(page._doc)
      })
    })
  })
})
