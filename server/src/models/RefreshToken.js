import { Schema, model, Types } from 'mongoose'

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
})

export default model('RefreshToken', refreshTokenSchema)
