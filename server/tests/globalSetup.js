/* eslint-disable no-underscore-dangle */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import configs from '../src/utils/configs.js'

async function globalSetup() {
  const instance = await MongoMemoryServer.create()
  const uri = instance.getUri()
  global.__MONGOINSTANCE = instance
  process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf('/'))

  // The following is to make sure the database is clean before an test starts
  mongoose.set('strictQuery', false)
  await mongoose.connect(`${process.env.MONGODB_URI}/${configs.db.dbName}`)
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
}

export default globalSetup
