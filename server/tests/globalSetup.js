/* eslint-disable no-underscore-dangle */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

async function globalSetup() {
  const instance = await MongoMemoryServer.create()
  const uri = instance.getUri()
  global.__MONGOINSTANCE = instance
  process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf('/'))
  process.env.DB_NAME = 'nikki'
  process.env.JWT_SECRET = 'a'.repeat(64)
  process.env.JWT_LIFETIME = 60000
  process.env.REFRESH_TOKEN_LIFETIME = 600000
  // The following is to make sure the database is clean before an test starts
  mongoose.set('strictQuery', false)
  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
}

export default globalSetup
