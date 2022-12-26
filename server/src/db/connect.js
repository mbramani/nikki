import mongoose from 'mongoose'

function connectDB(uri) {
  mongoose.set('strictQuery', true)

  return mongoose.connect(uri)
}
export default connectDB
