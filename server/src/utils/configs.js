import { MongoMemoryServer } from 'mongodb-memory-server'

let mongodbUri

if (process.env.NODE_ENV !== 'production') {
  const mongoServer = await MongoMemoryServer.create()
  mongodbUri = mongoServer.getUri()
} else {
  mongodbUri = process.env.MONGODB_URI
}

const configs = {
  port: process.env.PORT,
  db: {
    mongodbUri: mongodbUri,
  },
}

export default configs
