const configs = {
  port: process.env.PORT,
  db: {
    dbName: process.env.DB_NAME,
    mongodbUri: process.env.MONGODB_URI,
  },
}

export default configs
