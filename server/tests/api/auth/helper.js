import mongoose, { connect, disconnect } from 'mongoose'
import configs from '../../../src/utils/configs.js'
import { RefreshToken, User } from '../../../src/models/index.js'

mongoose.set('strictQuery', false)

const connectToDB = async () => {
  await connect(`${process.env.MONGODB_URI}/${configs.db.dbName}`)
}

const disconnectToDB = async () => {
  await disconnect(`${process.env.MONGODB_URI}/${configs.db.dbName}`)
}

const removeDataFromDatabase = async () => {
  await User.deleteMany({})
  await RefreshToken.deleteMany({})
}

export { connectToDB, disconnectToDB, removeDataFromDatabase }
