const configs = {
  port: process.env.PORT,
  db: {
    dbName: process.env.DB_NAME,
    mongodbUri: process.env.MONGODB_URI,
  },
  jwt: {
    lifeTime: process.env.JWT_LIFETIME,
    secret: process.env.JWT_SECRET,
  },
}

export default configs
