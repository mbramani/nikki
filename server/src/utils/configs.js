const configs = {
  url: {
    website: process.env.WEBSITE,
    server: process.env.SERVER,
  },
  port: process.env.PORT,
  db: {
    dbName: process.env.DB_NAME,
    mongodbUri: process.env.MONGODB_URI,
  },
  jwt: {
    lifeTime: process.env.JWT_LIFETIME,
    secret: process.env.JWT_SECRET,
  },
  refreshToken: {
    lifeTime: process.env.REFRESH_TOKEN_LIFETIME,
  },
}

export default configs
