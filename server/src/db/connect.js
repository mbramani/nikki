import mongoose from 'mongoose'

function connectDB(uri) {
  mongoose.set('strictQuery', true)
  mongoose.set('autoIndex', false)
  return mongoose.connect(uri)
}
export default connectDB
